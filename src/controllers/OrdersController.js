const knex = require('../database/knex');

const async = require('async');

const AppError = require('../utils/AppError');

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id;

    async.mapSeries(request.body, function iterator(data, callback) { 
      
      console.log(data);

      return callback(null, data);      
      
    }, async function(error, reqDishes) {

      try {

        
        //const reqDishes = results;
        
        if(reqDishes.length === 0) {
          throw new AppError('Ao menos um prato e sua quantidade devem ser passados para a realização do pedido.')
        }
        
        const reqDishesIDs = reqDishes.map(({ dish_id }) => dish_id);

        const reqQuantities = reqDishes.map(({ quantity }) => quantity);
        
        //console.log('reqDishes', reqDishes,'=', reqDishesIDs, 'AND', reqQuantities);

        const existDishes = await knex('dishes').whereIn('id', reqDishesIDs);
  
        const existDishesIDs = existDishes.map(({ id }) => id); 
  
        const noneExistDishes = reqDishesIDs.filter(dish => !existDishesIDs.includes(dish));
        
        // console.log( existDishesIDs, `->`, reqDishes, `=`, noneExistDishes);
        
        if(noneExistDishes.length > 0) {
          throw new AppError(`O(s) prato(s) de ID(s): ${noneExistDishes.join(', ')}, não estão cadastrados`);
        }

        const [newOrder] = await knex('orders').insert({ user_id })
          .returning(['id']); 
          
        //console.log(newOrder, '->', newOrder.id); 
        
        for(let i = 0; i < reqDishes.length; i++) {

          /* console.log('Para inserir ->', {

            order_id: newOrder.id,
            dish_id: reqDishesIDs[i],
            quantity: reqQuantities[i]
          }) */
          await knex('dishes_orders').insert(
            {  
              order_id: newOrder.id,
              dish_id: reqDishesIDs[i],
              quantity: reqQuantities[i]
            }
          )
        }

        await knex('orders_statuses').insert({
          order_id: newOrder.id,
          status_id: 1
        })

        return response.status(201).json('Pedido cadastrado com sucesso.');

      } catch (error) {

        //console.log(error);

        return response.status(400).json(error);
      
      }

    });
    
  }

  async show(request, response) {

    const { id } = request.params; 

    const [orderUserAndDate] = await knex('orders').where({ id });

    const orderDishes = await knex('dishes_orders')
      .select([
        'dish_id',
        'quantity',
        'price',
        'orders.created_at as order_request'
      ])
      .where({ order_id: id })
      .innerJoin('dishes', 'dishes.id', 'dishes_orders.dish_id')
      .innerJoin('orders', 'orders.id', 'dishes_orders.order_id')
      .orderBy('dish_id');
      
      const orderTotal = await knex('dishes_orders')
      .select([
        (knex.raw('SUM ( dishes_orders.quantity * dishes.price ) AS Total'))
      ])
      .where({ order_id: id })
      .innerJoin('dishes', 'dishes.id', 'dishes_orders.dish_id')
      .innerJoin('orders', 'orders.id', 'dishes_orders.order_id')

    return response.json({
      ...orderUserAndDate, orderDishes, orderTotal
    });
  }

  // AQUI!!!

  async update(request, response) {

    const { id } = request.params;

    async.mapSeries(request.body, function iterator(data, callback) { 

      return callback(null, data);
      
    }, async function(error, newReqDishes) {

      try {
        const orderToUpdate = await knex('dishes_orders').where({ order_id: id })

        if (orderToUpdate.length === 0) {
          throw new AppError('O prato a ser atualizado não foi encontrado.'); 
        }

        if(!newReqDishes || newReqDishes.length === 0) {
          throw new AppError('Pelo menos uma alteração deve ser feita');
        }

        const newReqDishesIDs = newReqDishes.map(({ dish_id }) => dish_id);

        const newReqQuantities = newReqDishes.map(({ quantity }) => quantity);

        const existDishes = await knex('dishes').whereIn('id', newReqDishesIDs);

        const existDishesIDs = existDishes.map(({ id }) => id); 

        const noneExistDishes = newReqDishesIDs.filter(dish => !existDishesIDs.includes(dish));

        console.log(orderToUpdate, 'X', newReqDishes,'/', existDishesIDs, '->', noneExistDishes);

        if(noneExistDishes.length > 0) {
          throw new AppError(`O(s) prato(s): ${noneExistDishes.join(', ')}, não estão cadastrados.`)
        }

        await knex('dishes_orders').where({ order_id: id }).delete();

        for(let i = 0; i < newReqDishes.length; i++) {

          await knex('dishes_orders').insert(
            {  
              order_id: id,
              dish_id: newReqDishesIDs[i],
              quantity: newReqQuantities[i]
            }
          )
        }

        await knex('orders').where({ id }).update({
          updated_at: knex.fn.now()
        })

        return response.status(201).json('Pedido atualizado com sucesso')

      } catch (error) {
        //console.log(error);

        return response.status(400).json(error);
      }
    }); 
  }

  async index(request, response) {
    
  }

  async delete(request, response) {
    
    const { id } = request.params;

    await knex('orders').where({ id }).delete();
    
    return response.json({
      message: 'Pedido excluído com sucesso.'
    })
  }
}
module.exports = OrdersController;
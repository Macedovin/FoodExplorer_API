const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class All_ordersController {
  async index(request, response) {
    
    const ordersDetails = await knex('orders_statuses')
      .select([
        'orders.id as order_id',
        'user_id',
        'users.name as user_name',
        'orders.created_at as order_date',
        'status_id',
        'statuses.value as status',
      ])
      .innerJoin('orders', 'orders.id', 'orders_statuses.order_id')
      .innerJoin('statuses', 'statuses.id', 'orders_statuses.status_id')
      .leftJoin('users', 'users.id', 'orders.user_id')
      .orderBy([
        { column: 'status_id', order: 'asc' },
        { column: 'order_id', order: 'desc' }
      ]); 

    const ordersDishes = await knex('dishes_orders')
    .select([
      'order_id',
      'dish_id',
      'quantity',
      'price',
    ])
    .innerJoin('dishes', 'dishes.id', 'dishes_orders.dish_id')
    .innerJoin('orders', 'orders.id', 'dishes_orders.order_id')
    .orderBy('dish_id');
      
    const ordersWithDishes = ordersDetails.map(order => {

      const dishesOfEachOrder = ordersDishes.filter(dish => dish.order_id === order.order_id);
      
      return {
        ...order,
        dishes: dishesOfEachOrder
      }
    });

      
    return response.json(ordersWithDishes);
  }

  async update(request, response) {
    const { id } = request.params;

    const { new_status } = request.body;

    if(!new_status) {
      throw new AppError('Um novo valor de status deve ser inserido para atualizar.')
    }

    const existStatus = await knex('statuses').where({ id: new_status }).first();

    if(!existStatus) {
      throw new AppError('Status não cadastrado.')
    }

    const orderToUpdate = await knex('orders_statuses')
      .select([
        'order_id',
        'status_id'
      ])
      .where({ order_id: id });

    if(!orderToUpdate | orderToUpdate.length === 0) {
      throw new AppError('Pedido não encontrado.');
    }
    
    await knex('orders_statuses')
      .where({ order_id: id })
      .update({ status_id: new_status });

    await knex('orders')
    .where({ id })
    .update({ updated_at: knex.fn.now() });

    return response.status(201).json({
      message: 'Pedido atualizado com sucesso.'
    });
  }
}

module.exports = All_ordersController;
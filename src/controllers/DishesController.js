const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;

    if (!name || !description || !price || !category_id || !ingredients) {
      throw new AppError('O preenchimento de todos os campos é obrigatório.');
    }

    const checkDishName = await knex('dishes').where({ name }).first();

/*     if (checkDishName) {
      throw new AppError('Nome de prato já cadastrado.');
    }  */

    // Condições dos ingredientes

    const alreadyExistIngredientsDB = await knex('ingredients')
      .select(['id', 'name'])
      .whereIn('name', ingredients);

    const existIngredientsName = alreadyExistIngredientsDB.map(({ name }) => name);
    
    const ingredientsOfThisDishToInsert = ingredients.filter(ingredient => !existIngredientsName.includes(ingredient));

    //console.log(alreadyExistIngredientsDB, existIngredientsName, existIngredientsID, ingredientsOfThisDishToInsert);
    
    if (ingredientsOfThisDishToInsert.length > 0) {
     
      const newIngredients = ingredientsOfThisDishToInsert.map(name => {
        return { name }
      }); 
      
      const newIngredientsID = await knex('ingredients').insert(newIngredients)
      .returning(['id']);
     
      console.log('Aqui!', newIngredientsID);
    }

    const newIngredients = await knex('ingredients')
    .select(['id', 'name'])
    .whereIn('name', ingredients);

    const newIngredientsID = newIngredients.map(({ id }) => id);
    //const allIngredientsToInsert = await knex 
    
    const [newDish] = await knex('dishes').insert({
      name,
      description,
      price,
      category_id
    })
    .returning(['id']);  

    console.log(ingredients, newIngredientsID.length, newDish.id);

    for(let i = 0; i < newIngredientsID.length; i++){

      await knex('dishes_ingredients').insert({
        dish_id: newDish.id,
        ingredient_id: newIngredientsID[i]
      })
      
    };

      /*       return {
              dish_id: newDish.id,

            } */
    

/*       */
      /*       const dishIngredientsToInsert = newDatabaseIngredients.map(({ id }) => id)

      await knex('dishes_ingredients').insert([
        {
          dish_id: newDish.id,
          ingredient_id: dishIngredientsToInsert.id
        }
      ]) 

    }

    //console.log(existIngredientsName, existIngredientsID, ingredientsOfThisDish);
    */

    // Inserir o prato


    
    return response.status(201).json({
      message: 'Prato cadastrado com sucesso.'
    });
  }

  async show(request, response) {
    const { id }= request.params;

    const foodDetails = await knex('dishes').where({ id }).first();

    return response.json(foodDetails);
  }

  // async index(request, response) {}

  async update(request, response) {
    const { new_name, new_description, new_price, new_categoryId } = request.body;
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();
    
    return response.json({
      message: 'Prato excluído com sucesso.'
    })
  }
}

module.exports = DishesController;
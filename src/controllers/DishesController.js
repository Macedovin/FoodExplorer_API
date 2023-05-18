const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class DishesController {
  async create(request, response) {
    const { name, description, price, category_id, ingredients } = request.body;

    if (!name || !description || !price || !category_id || !ingredients) {
      throw new AppError('O preenchimento de todos os campos é obrigatório.');
    }

    if (ingredients.length === 0) {
      throw new AppError('Pelo menos um ingrediente deve estar associado a um novo prato.')
    } 

    const checkDishNameExist = await knex('dishes').where({ name }).first();

    if (checkDishNameExist) {
      throw new AppError('Nome de prato já cadastrado.');
    } 

    const priceIsNumber = isNaN(price);

    if (priceIsNumber) {
      throw new AppError('O preço do prato deve ser um número.');
    }

    const existsCategory = await knex('dish_categories').where({ id: category_id }).first();

    if(!existsCategory) {
      throw new AppError('Categoria de prato ainda não cadastrada.')
    }

    const alreadyExistIngredientsDB = await knex('ingredients')
      .select(['id', 'name'])
      .whereIn('name', ingredients);

    const existIngredientsName = alreadyExistIngredientsDB.map(({ name }) => name);
    
    const ingredientsOfThisDishToInsert = ingredients.filter(ingredient => !existIngredientsName.includes(ingredient));
    
    if (ingredientsOfThisDishToInsert.length > 0) {
     
      const newIngredients = ingredientsOfThisDishToInsert.map(name => {
        return { name }
      }); 
      
      await knex('ingredients').insert(newIngredients)
      .returning(['id']);
     
    }

    const allNewIngredients = await knex('ingredients')
    .select(['id', 'name'])
    .whereIn('name', ingredients);

    const allNewIngredientsID = allNewIngredients.map(({ id }) => id);

    const [newDish] = await knex('dishes').insert({
      name,
      description,
      price: price.toFixed(2),
      category_id
    })
    .returning(['id']);  

    for(let i = 0; i < allNewIngredientsID.length; i++){

      await knex('dishes_ingredients').insert({
        dish_id: newDish.id,
        ingredient_id: allNewIngredientsID[i]
      });
      
    };
    
    return response.status(201).json({
      message: 'Prato cadastrado com sucesso.'
    });
  }

  async update(request, response) {
    const { new_name, new_description, new_price, new_category_id, new_ingredients} = request.body;

    const { id } = request.params;

    const dishInfos = await knex('dishes').where({ id }).first();

    let updated_dishData = { ...dishInfos }

    let updateIsBeingSucceeded;

    if (new_name) {
      updated_dishData.name = new_name;

      updateIsBeingSucceeded = true;
    }

    if (new_description) {
      updated_dishData.description = new_description;

      updateIsBeingSucceeded = true;
    }

    if (new_price) {
      const priceIsNumber = isNaN(new_price);

      if (priceIsNumber) {
        throw new AppError('O preço do prato deve ser um número.');
      }

      updated_dishData.price = new_price;

      updateIsBeingSucceeded = true;
    }

    if (new_category_id) {
      const existsCategory = await knex('dish_categories').where({ id: new_category_id }).first();

      if (!existsCategory) {
        throw new AppError('Categoria de prato ainda não cadastrada.');
      }

      updated_dishData.category_id = new_category_id;

      updateIsBeingSucceeded = true;
    }

    if (new_ingredients) {
      const ingredientsAlreadyRegistered = await knex('ingredients')
      .select([
        'name'
      ])  
      .whereIn('name', new_ingredients);
      
      const ingredientsAlreadyRegisteredNames = ingredientsAlreadyRegistered.map(({ name }) => name);

      const newIngredientsForIngredientsTable = new_ingredients.filter(ingredient => !ingredientsAlreadyRegisteredNames.includes(ingredient));

      const newIngredientsForIngredientsTableNames = newIngredientsForIngredientsTable.map(ingredient => {
        
        return { 
          name: ingredient
        } 
      });

      if(newIngredientsForIngredientsTable.length > 0) {
        
        await knex(`ingredients`).insert(newIngredientsForIngredientsTableNames);
        
      } 

      await knex('dishes_ingredients').where({ dish_id: id }).delete();
      
      const allNewIngredients = await knex('ingredients')
        .select([
          'id'
        ])  
        .whereIn('name', new_ingredients);

      const allNewIngredientsID = allNewIngredients.map(({ id }) => id);

      for(let i = 0; i < allNewIngredientsID.length; i++){

        await knex('dishes_ingredients').insert({
          dish_id: id,
          ingredient_id: allNewIngredientsID[i]
        });
        
      }

      updateIsBeingSucceeded = true;
    }
    
    if (updateIsBeingSucceeded) {
      await knex('dishes')
        .where({ id })
        .update({
          name: updated_dishData.name,
          description: updated_dishData.description,
          price: updated_dishData.price,
          category_id: updated_dishData.category_id,
          updated_at: knex.fn.now()
        });

      return response.status(201).json({
        dishInfos,
        message: 'Prato atualizado com sucesso.'
      });
      
    } else {

      throw new AppError('Pelo menos um novo dado deve ser inserido para que seja efetuada a atualização');

    }
  }

  async show(request, response) {
    const { id }= request.params;

    const [dishDetails] = await knex('dishes').where({ id })
      
    const dishIngredients = await knex('dishes_ingredients')
      .select([
        'ingredients.id',
        'ingredients.name',
      ])
      .where({ dish_id: id })
      .innerJoin('ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id'); 

    return response.json({
      ...dishDetails,
      dishIngredients
    });
    
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
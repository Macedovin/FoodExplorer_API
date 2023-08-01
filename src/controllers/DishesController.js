const knex = require('../database/knex');

const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/DiskStorage');
 
class DishesController {
  async create(request, response) {

    const data = request.body.data;
    
    const { name , description, price, category_id, ingredients } = JSON.parse(data);

    const picture = request.file;  
    
    if (!name || !description || !price || !category_id) {
      throw new AppError('O preenchimento de todos os campos é obrigatório.');
    }        
    
    const checkDishNameExist = await knex('dishes').where({ name }).first();
    
    if (checkDishNameExist) {
      throw new AppError('Nome de prato já cadastrado.');
    } 
    
    const priceIsNotPositiveNumber = isNaN(price) || price <= 0;

    if (priceIsNotPositiveNumber) {
      
      throw new AppError('O preço do prato deve ser um número decimal maior do que zero.');

    }
    
    const existsCategory = await knex('dish_categories').where({ id: category_id }).first();
    
    if(!existsCategory) {
      throw new AppError('Categoria de prato ainda não cadastrada.')
    }
    
    if (ingredients.length === 0) {
      throw new AppError('Pelo menos um ingrediente deve estar associado a um novo prato.')
    } 

    const alreadyExistIngredientsDB = await knex('ingredients')
      .select(['id', 'name'])
      .whereIn('name', ingredients);

    const alreadyExistIngredientsName = alreadyExistIngredientsDB.map(({ name }) => name);
    
    const ingredientsOfThisDishToInsert = ingredients.filter(ingredient => !alreadyExistIngredientsName.includes(ingredient));
    
    if (ingredientsOfThisDishToInsert.length > 0) {
     
      const newIngredientsTableIngredients = ingredientsOfThisDishToInsert.map(name => {
        return { name }
      }); 
      
      await knex('ingredients').insert(newIngredientsTableIngredients)
      .returning(['id']);
     
    }

    const allNewIngredients = await knex('ingredients')
    .select(['id', 'name'])
    .whereIn('name', ingredients);

    const allNewIngredientsID = allNewIngredients.map(({ id }) => id);
    
    let newDish = {};

    if(!picture) {

      [newDish] = await knex('dishes').insert({
        name,
        description,
        price,
        category_id
      })
      .returning(['id', 'name', 'description', 'price', 'picture', 'category_id', 'created_at']);
      
      for(let i = 0; i < allNewIngredientsID.length; i++){

        await knex('dishes_ingredients').insert({
          dish_id: newDish.id,
          ingredient_id: allNewIngredientsID[i]
        });
        
      }
    } 
    
    if(picture) {
      
      const pictureFileName = request.file.filename; 

      const diskStorage = new DiskStorage();
      
      const filename = await diskStorage.savePictureFile(pictureFileName);
      
      [newDish] = await knex('dishes').insert({
        name,
        description,
        price,
        category_id,
        picture: filename
      })
      .returning(['id', 'name', 'description', 'price', 'picture', 'category_id', 'created_at']);
      
      for(let i = 0; i < allNewIngredientsID.length; i++){

        await knex('dishes_ingredients').insert({
          dish_id: newDish.id,
          ingredient_id: allNewIngredientsID[i]
        });
        
      }
    } 

    return response.status(201).json([
      {
        ...newDish,
      },
      {
        message: 'Prato cadastrado com sucesso.'
      }
    ]);    
  }

  async index (request, response) {
    const { search } = request.query;

    let dishes;
        
    if (search) {
      
      dishes = await knex('dishes_ingredients')
      .select([
        'dishes.*'
      ])
        .innerJoin('dishes', 'dishes.id', 'dishes_ingredients.dish_id')
        .innerJoin('ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
        .whereLike('dishes.name', `%${search}%`)
        .orWhereLike('ingredients.name', `%${search}%`) 
        .groupBy('dishes.name')
        .orderBy('dishes.name', 'asc'); 

    } else {
  
      dishes = await knex('dishes')
      .select()
      .orderBy([
        {column: 'category_id', nulls: 'last'}
      ]); 
    }

    const dishCategories = await knex('dish_categories')
    .select([
      'dish_categories.id as category_id',
      'dish_categories.name as category_name',
    ])
    .innerJoin('dishes', 'dishes.category_id', 'dish_categories.id') 
    .groupBy('dish_categories.name')
    .orderBy('dish_categories.id');      
      
    const dishesIds = dishes.map(({ id }) => id);
    
    const dishIngredients = await knex('dishes_ingredients')
      .select([
        'dishes.id as dish_id',
        'ingredients.*'
      ])
        .innerJoin('ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
        .innerJoin('dishes', 'dishes.id', 'dishes_ingredients.dish_id')
        .whereIn('dish_id', dishesIds)
        .orderBy('dishes.id'); 

      const dishesWithIngredients = dishes.map(dish => {
        const ingredientsOfDish = dishIngredients.filter(ingredient => ingredient.dish_id === dish.id);
  
        return {
          ...dish,
          ingredients: ingredientsOfDish,
        }
      });

      const dishesInCategories = dishCategories.map(category => {
        
        const dishesOfCategory = dishesWithIngredients.filter(dish => dish.category_id === category.category_id);

        return {
          ...category,
          dishes: dishesOfCategory,
        }
      });

    return response.json(dishesInCategories);
  }

  async show(request, response) {
    const { id }= request.params;

    const [dishDetails] = await knex('dishes')
      .select([
        'dishes.category_id',
        'dish_categories.name as category_name',
        'dishes.id as dish_id',
        'dishes.name as dish_name',
        'dishes.picture',
        'dishes.price',
        'dishes.description'
      ])
      .innerJoin('dish_categories', 'dish_categories.id', 'dishes.category_id') 
      .where({ dish_id: id })

      
    const dishIngredients = await knex('dishes_ingredients')
      .select([
        'ingredients.id',
        'ingredients.name',
      ])
      .where({ dish_id: id })
      .innerJoin('ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
      .orderBy('ingredients.name'); 

      if (!dishDetails) {
        throw new AppError('Prato não cadastrado.');
      }

    return response.json({
      ...dishDetails,
      dishIngredients
    });
    
  }

  async update(request, response) {
    const data = request.body.data;
    
    const { new_name, new_description, new_price, new_category_id, new_ingredients} = JSON.parse(data);

    const { id } = request.params;

    const picture = request.file; 

    const dishInfos = await knex('dishes').where({ id }).first();

    if (!dishInfos) {
      throw new AppError('Prato não cadastrado.')
    }

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
      const priceIsNotPositiveNumber = isNaN(new_price) || new_price <= 0;
    
      if (priceIsNotPositiveNumber) {
        throw new AppError('O preço do prato deve ser um número decimal maior que zero.');
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

    if (picture) {
      const newPictureFileName = request.file.filename;

      const diskStorage = new DiskStorage();
      
      if(dishInfos.picture) {
        await diskStorage.deletePictureFile(dishInfos.picture);
      }; 

      const fileName = await diskStorage.savePictureFile(newPictureFileName);

      updated_dishData.picture = fileName;

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
          picture: updated_dishData.picture,
          updated_at: knex.fn.now()
        });

        const newDishIngredients = await knex('dishes_ingredients')
        .select([
          'ingredients.id',
          'ingredients.name',
        ])
        .where({ dish_id: id })
        .innerJoin('ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
        .orderBy('ingredients.name');  

        const updatedDish = updated_dishData;        

        return response.status(201).json([
          {
            updatedDish,
            newDishIngredients
          },
          {
            message: 'Prato cadastrado com sucesso.'
          }
        ]);
      
    } else {

      throw new AppError('Pelo menos um novo dado deve ser inserido para que seja efetuada a atualização');

    }
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();
    
    return response.json({
      message: 'Prato excluído com sucesso.'
    });
  }
}

module.exports = DishesController;
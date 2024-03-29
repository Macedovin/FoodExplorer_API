const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class Dish_categoriesController {
  async create(request, response) {
    const { name } = request.body;

    if (!name) {
      throw new AppError('O nome da categoria é obrigatório.');
    }

    const categoryAlreadyExist = await knex('dish_categories').where({ name }).first();

    if (categoryAlreadyExist) {
      throw new AppError('Categoria já cadastrada.');
    }
    const [category] = await knex('dish_categories').insert({ name })
    .returning(['id', 'name']);

    return response.status(201).json({
      category,
      message: 'Categoria cadastrada com sucesso.' 
    });

  }

  async index(request, response) {
    const foodCategories = await knex.select()
      .table('dish_categories')
      .groupBy('id');

    return response.json(foodCategories);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('dish_categories').where({ id }).delete();

    return response.json({
      message: 'Categoria excluída com sucesso.'
    });
  }
}

module.exports = Dish_categoriesController;
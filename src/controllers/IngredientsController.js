const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class IngredientsController {
  async create(request, response) {
    const { name } = request.body;

    if(!name) {
      throw new AppError('O nome do ingrediente é obrigatório.');
    }

    const ingredientAlreadyExists = await knex('ingredients').where({ name }).first();

    if (ingredientAlreadyExists) {
      throw new AppError('Este ingrediente já foi cadastrado.');
    }

    await knex('ingredients').insert({ name });

    return response.status(201).json({
      message: 'Ingrediente cadastrado com sucesso.'
    })
  } 

  async delete(request, response) {
    const { id } = request.params;

    await knex('ingredients').where({ id }).delete();

    return response.json({
      message: 'Ingrediente excluído com sucesso.'
    })
  }
}

module.exports = IngredientsController;
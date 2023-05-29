const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class StatusesController {
  async create(request, response) {
    const { value } = request.body;

    if (!value) {
      throw new AppError('O valor do status é obrigatório.')
    }
    
    const existsStatus = await knex('statuses').where({ value }).first();

    if(existsStatus) {
      throw new AppError('Um status com este nome já existe.');
    }

    await knex('statuses').insert({ value }); 

    return response.status(201).json({
      message: 'Status cadastrado com sucesso.'
    });
  }

  async index(request, response) {
    const statuses = await knex
      .select()
      .table('statuses');

    return response.json(statuses);
  }
}

module.exports = StatusesController;
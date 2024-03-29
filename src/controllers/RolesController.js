const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class RolesController {
  async create(request, response) {
    const { name, description } = request.body;

    if (!name || !description) {
      throw new AppError('Nome e descrição são obrigatórios.');
    }    

    const existRole = await knex('roles').where({ name }).first();

    if (existRole) {
      throw new AppError('Esta persona já existe.');
    } 

    await knex('roles').insert({
      name,
      description
    });

    return response.status(201).json({
      message: 'Persona cadastrada com sucesso.'
    });
  }

  async index(request, response) {
    const applicationRoles = await knex('roles')
      .select([
        'roles.id',
        'roles.name'
      ])
      .orderBy('roles.id');

    return response.json(applicationRoles);
  }
}

module.exports = RolesController;
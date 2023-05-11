const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class RolesController {
  async create(request, response) {
    const { name, description } = request.body;

    const existRole = await knex('roles').where({ name }).first();

    if (existRole) {
      throw new AppError('Esta persona já existe.');
    } 

    const [role] = await knex('roles').insert({
      name,
      description
    })
    .returning(['id', 'name', 'description']);

    await knex ('users_roles').insert({
      role_id: role.id
    });

    return response.status(201).json({
      role,
      message: 'Persona cadastrada com sucesso.'
    });
  }
}

module.exports = RolesController;
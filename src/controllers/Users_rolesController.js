const knex = require('../database/knex');

class Users_roles {

  async index(request, response) {
    const user_id = request.params;
    
    const appUsers = await knex.select()
      .table('users')
      .orderBy('id');

    return response.json(appUsers);
  } 
}

module.exports = Users_roles;
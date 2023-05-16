const knex = require('../database/knex');

const AppError = require('../utils/AppError');

const ensureUserRoles = (role) => {
  return async (request, response, next) => {
    const user_id = request.user.id;

    const userRoles = await knex('roles')
      .select([
        'name'
      ])
      .whereIn('id',      
        knex('users_roles').select('role_id').where({ user_id })
      );

    const userRolesName = userRoles.map(role => role.name);
      
    const matchedRoles = userRolesName.some(r => role.includes(r));

    console.log(userRoles, userRolesName, matchedRoles);

    if(matchedRoles){

      return next();
    } else {

      throw new AppError('Usuário não autorizado.', 401);
    }

  }
}

module.exports = ensureUserRoles;
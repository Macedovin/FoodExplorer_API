const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class Users_roles {

  async index(request, response) {
    const usersWithRoles = await knex('users_roles')
      .select([
        'user_id',
        'users.name as user_name',
        'users.email',
        'users.created_at',
        'role_id',
        'roles.name as role_name'
      ])
      .innerJoin('users', 'users.id', 'users_roles.user_id')
      .innerJoin('roles', 'roles.id', 'users_roles.role_id')
      .max('role_id')
      .groupBy('user_id')
      .orderBy([
        { column: 'role_id', order: 'desc' },
        { column: 'user_id' } 
      ]);
    
    return response.json(usersWithRoles);
  } 
  
  async update(request, response) {
    const { new_userRole } = request.body;

    const { id } = request.params;

    if(new_userRole.length > 1) {
      throw new AppError('Insira somente uma nova persona por vez para acada usuário.')
    }

    const existRole = await knex('roles')
    .select(['id'])  
    .whereIn('name', new_userRole)
    .returning(['id'])

    if (existRole.length === 0) {
      throw new AppError('Persona não cadastrada no Banco de Dados.');
    }

    const validRolesToInsert = existRole.map(({ id }) => id);

    const userWithRoles = await knex('users_roles')
    .select([
      'user_id',
      'role_id',
      'roles.name as role_name'
    ])
    .where({ user_id: id })
    .innerJoin('users', 'users.id', 'users_roles.user_id')
    .innerJoin('roles', 'roles.id', 'users_roles.role_id')

    if(!userWithRoles) {
      throw new AppError('Usuário não cadastrado.');
    }
    
    const userWithRolesID = userWithRoles.map(user => user.user_id);

    const rolesOfThisUser = userWithRoles.map(role => role.role_id);
    
    const userAlreadyHasThisRoles = rolesOfThisUser.some(r => validRolesToInsert.includes(r));
    
    if(userAlreadyHasThisRoles) { 
      throw new AppError('Usuário já possui esta persona atribuída a ele.');
    } 
    
    await knex('users_roles').insert({
      role_id: validRolesToInsert[0],
      user_id: userWithRolesID[0]
    });    

    return response.json({
      message: 'Nova persona atribuída ao usuário com sucesso.'
    });
  }

}

module.exports = Users_roles;
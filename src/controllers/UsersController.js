const { hash, compare } = require('bcryptjs');

const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class UsersController {
  async create(request, response) {
    const { name, email, password, roles } = request.body;

    const emailInUse = await knex('users').where({ email }).first();

    if (emailInUse) {
      throw new AppError('Este email já esta em uso.');
    }

    const hashedPassword = await hash(password, 8);
    
    const [userCreated] = await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })
    .returning(['id', 'name', 'email', 'created_at']);
        
    await knex ('users_roles').insert({
      user_id: userCreated.id
    });
      
    return response.status(201).json({
      userCreated,
      message: 'Usuário cadastrado com sucesso'
    });
  }
  
  async update(request, response) {
    
    const { new_name, new_email, new_password, current_password } = request.body;

    const { id } = request.params;

    const userInfos = await knex('users').where({ id }).first();

    let updated_data = { ...userInfos };

    if (!userInfos) {
      throw new AppError('Usuário não encontrado');
    }

    if (new_name) {
      updated_data.name = new_name;
    }

    if (new_email) {

      const emailAlreadyExists = await knex('users').where({ email: new_email }).first();
      
      if (emailAlreadyExists && emailAlreadyExists.id !== userInfos.id) {
        throw new AppError('Este email já esta em uso. Tente outro.');
      }

      updated_data.email = new_email;
    }

    if (new_password && !current_password) {      
      throw new AppError('Você precisa informar a senha antiga para definir uma nova senha.');
    }

    if (new_password && current_password) {

      const oldPasswordCheck = await compare(current_password, userInfos.password);

      if (!oldPasswordCheck) {
        throw new AppError('A senha antiga não confere.');
      }

      const newHashedPassword = await hash(new_password, 8);

      updated_data.password = newHashedPassword;
    }

    const [updatedUser] = await knex('users')
      .where({ id })
      .update({
        name: updated_data.name,
        email: updated_data.email,
        password: updated_data.password,
        updated_at: knex.fn.now()
      })
      .returning(['name', 'email', 'avatar', 'updated_at']);

    return response.status(201).json({
      updatedUser,
      message: 'Os dados foram atualizados com sucesso.'
    })
  }

  async index(request, response) {
    const { id } = request.params;
    
    const appUsers = await knex.select()
      .table('users');

    return response.json({
      appUsers,
      message: 'Requisição bem sucedida.'
    })
  } 
}

module.exports = UsersController;
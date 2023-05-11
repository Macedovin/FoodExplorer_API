const { compare } = require('bcryptjs');

const { sign } = require('jsonwebtoken');

const knex = require('../database/knex');

const AppError = require('../utils/AppError');

const authConfig = require('../configs/auth');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    if(!email || !password) {
      throw new AppError('Todos os dados devem ser preenchidos para prosseguir.');
    }   

    const checkedUser = await knex('users').where({ email }).first();
    
    if (!checkedUser) {
      throw new AppError('Email e/ ou senha incorretos.', 401);
    }

    const passwordMatched = await compare(password, checkedUser.password);

    if (!passwordMatched) {
      throw new AppError('Email e/ ou senha incorretos.', 401);
    }

    const { secret, expiresIn  } = authConfig.jwt;

    const token = sign(
      {},
      secret,
      {
        subject: String(checkedUser.id),
        expiresIn
      }
    )

    return response.json({ 
      id: checkedUser.id,
      name: checkedUser.name,
      email: checkedUser.email,
      avatar: checkedUser.avatar,
      token 
    });
  }
}

module.exports = SessionsController;
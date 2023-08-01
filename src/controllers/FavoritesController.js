const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;

    const { dish_id } = request.params;

    if(!dish_id) {
      throw new AppError('Informe o prato a ser favoritado.');
    }

    const user = await knex('users').where({ id: user_id }).first(); 

    const dishToFavoriteExists = await knex('dishes').where({ id: dish_id }).first();

    if(!user || !dishToFavoriteExists) {
      throw new AppError('Usuário e/ ou prato não encontrado.');
    }  

    const dishToFavorite = await knex('favorites').where({ user_id, dish_id }).first();

    if(dishToFavorite) {
      throw new AppError('Prato já favoritado.');
    }

    const [favorited] = await knex('favorites').insert({
      user_id,
      dish_id
    });

  return response.status(201).json([
    {
      favorited
    },
    {
      message: 'Prato favoritado com sucesso.'      
    }    
  ]);
}

  async index(request, response) {
    const user_id = request.user.id;

    const userFavorites = await knex('favorites')
      .select([
        'favorites.id as favorite_id',
        'user_id',
        'dishes.id as dish_id',
        'dishes.name',
        'dishes.picture',
      ])
      .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')
      .where({ user_id });

    return response.json(userFavorites);
  }

  async delete(request, response) {

    const user_id = request.user.id;
    const { dish_id } = request.params;
    
    const favoriteToDelete = await knex('favorites').where({ user_id, dish_id }).first();

    if(!favoriteToDelete) {
      throw new AppError('Prato não encontrado e/ ou prato não favoritado.');
    }

    await knex('favorites').where({ id: favoriteToDelete.id }).delete();

    return response.json({
      message: 'Favorito excluído com sucesso.'
    });
  } 
};

module.exports = FavoritesController;
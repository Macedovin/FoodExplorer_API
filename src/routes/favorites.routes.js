const { Router } = require('express');

const favoritesRoutes = Router();

const FavoritesController = require('../controllers/FavoritesController');

const favoritesController = new FavoritesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

favoritesRoutes.use(ensureAuthenticated);

favoritesRoutes.post('/:dish_id', favoritesController.create)

favoritesRoutes.get('/', favoritesController.index);

favoritesRoutes.delete('/:dish_id', favoritesController.delete); 

module.exports = favoritesRoutes;
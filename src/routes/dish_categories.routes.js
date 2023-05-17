const { Router } = require('express');

const dish_categoriesRoutes = Router();

const Dish_categoriesController = require('../controllers/Dish_categoriesController');

const dish_categoriesController = new Dish_categoriesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

dish_categoriesRoutes.use(ensureAuthenticated);

dish_categoriesRoutes.post('/', ensureUserRoles(['ROLE_ADMIN']),  dish_categoriesController.create);

dish_categoriesRoutes.get('/:id', ensureUserRoles(['ROLE_ADMIN']), dish_categoriesController.index);

module.exports = dish_categoriesRoutes;
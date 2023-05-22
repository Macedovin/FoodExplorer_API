const { Router } = require('express');

const dish_categoriesRoutes = Router();

const Dish_categoriesController = require('../controllers/Dish_categoriesController');

const dish_categoriesController = new Dish_categoriesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

dish_categoriesRoutes.use(ensureAuthenticated);

dish_categoriesRoutes.use(ensureUserRoles(['ROLE_ADMIN']));

dish_categoriesRoutes.post('/', dish_categoriesController.create);

dish_categoriesRoutes.get('/', dish_categoriesController.index);

dish_categoriesRoutes.delete('/:id', dish_categoriesController.delete);

module.exports = dish_categoriesRoutes;
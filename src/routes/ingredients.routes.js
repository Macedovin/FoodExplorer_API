const { Router } = require('express');

const ingredientsRoutes = Router();

const IngredientsController = require('../controllers/IngredientsController');

const ingredientsController = new IngredientsController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.use(ensureUserRoles(['ROLE_ADMIN']));

ingredientsRoutes.post('/', ingredientsController.create);

ingredientsRoutes.delete('/:id', ingredientsController.delete);

module.exports = ingredientsRoutes;
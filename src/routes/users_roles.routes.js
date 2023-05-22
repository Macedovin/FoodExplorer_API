const { Router } = require('express');

const users_rolesRoutes = Router();

const Users_rolesController = require('../controllers/Users_rolesController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

const users_rolesController = new Users_rolesController();

users_rolesRoutes.use(ensureAuthenticated);

users_rolesRoutes.use(ensureUserRoles(['ROLE_ADMIN']));

users_rolesRoutes.get('/', users_rolesController.index);

users_rolesRoutes.patch('/:id', users_rolesController.update);

module.exports = users_rolesRoutes;
const { Router } = require('express');

const users_rolesRoutes = Router();

const Users_rolesController = require('../controllers/Users_rolesController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

const users_rolesController = new Users_rolesController();

users_rolesRoutes.use(ensureAuthenticated);

users_rolesRoutes.get('/', ensureUserRoles(['ROLE_ADMIN']), users_rolesController.index);

module.exports = users_rolesRoutes;
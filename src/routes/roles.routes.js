const { Router } = require('express');

const rolesRoutes = Router();

const RolesController = require('../controllers/RolesController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

const rolesController = new RolesController();

rolesRoutes.post('/', rolesController.create);

rolesRoutes.get('/', ensureAuthenticated, ensureUserRoles(['ROLE_ADMIN']), rolesController.index);

module.exports = rolesRoutes;
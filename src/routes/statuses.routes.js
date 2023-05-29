const { Router } = require('express');

const statusesRoutes = Router();

const StatusesController = require('../controllers/StatusesController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

const statusesController = new StatusesController();

statusesRoutes.use(ensureAuthenticated);

statusesRoutes.use(ensureUserRoles(['ROLE_ADMIN']));

statusesRoutes.post('/', statusesController.create);

statusesRoutes.get('/', statusesController.index);


module.exports = statusesRoutes;
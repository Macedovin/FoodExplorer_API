
const { Router } = require('express');

const all_ordersRoutes = new Router();

const All_ordersController = require('../controllers/All_ordersController');
 
const all_ordersController =  new All_ordersController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

all_ordersRoutes.use(ensureAuthenticated);

all_ordersRoutes.use(ensureUserRoles(['ROLE_ADMIN']));

all_ordersRoutes.get('/', all_ordersController.index);

all_ordersRoutes.patch('/:id', all_ordersController.update);

module.exports = all_ordersRoutes;
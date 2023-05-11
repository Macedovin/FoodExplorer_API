const { Router } = require('express');

const rolesRoutes = Router();

const RolesController = require('../controllers/RolesController');

const rolesController = new RolesController(); 

rolesRoutes.post('/', rolesController.create);

module.exports = rolesRoutes;
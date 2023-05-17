const { Router } = require('express');

const dishesRoutes = Router();

const DishesController = require('../controllers/DishesController');

const dishesController =  new DishesController();

dishesRoutes.post('/', dishesController.create);

dishesRoutes.get('/:id', dishesController.show);

dishesRoutes.delete('/:id', dishesController.delete);

module.exports = dishesRoutes;
const { Router } = require('express');

const dishesRoutes = Router();

const DishesController = require('../controllers/DishesController');

const dishesController =  new DishesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const ensureUserRoles = require('../middlewares/ensureUserRoles');

const multer = require('multer');

const uploadConfig = require('../configs/upload');

const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post('/', ensureUserRoles(['ROLE_ADMIN']),  upload.single('picture'), dishesController.create);

dishesRoutes.put('/:id', ensureUserRoles(['ROLE_ADMIN']), upload.single('picture'),dishesController.update)

dishesRoutes.get('/:id', dishesController.show);

dishesRoutes.get('/', dishesController.index);

dishesRoutes.delete('/:id', ensureUserRoles(['ROLE_ADMIN']), dishesController.delete);

module.exports = dishesRoutes;
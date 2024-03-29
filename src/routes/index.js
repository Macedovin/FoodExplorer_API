const { Router } = require('express');

const usersRoutes = require('./users.routes');

const sessionsRoutes = require('./sessions.routes.js');

const rolesRoutes = require('./roles.routes');

const users_rolesRoutes = require('./users_roles.routes');

const dish_categoriesRoutes = require('./dish_categories.routes');

const dishesRoutes = require('./dishes.routes');

const ingredientsRoutes = require('./ingredients.routes');

const favoritesRoutes = require('./favorites.routes');

const ordersRoutes = require('./orders.routes');

const all_ordersRoutes = require('./all_orders.routes');

const statusesRoutes = require('./statuses.routes');

const routes = Router();

routes.use("/users", usersRoutes);

routes.use('/sessions', sessionsRoutes);

routes.use('/roles', rolesRoutes);

routes.use('/users_roles', users_rolesRoutes);

routes.use('/dish_categories', dish_categoriesRoutes);

routes.use('/dishes', dishesRoutes);

routes.use('/ingredients', ingredientsRoutes);

routes.use('/favorites', favoritesRoutes);

routes.use('/orders', ordersRoutes);

routes.use('/all_orders', all_ordersRoutes);

routes.use('/statuses', statusesRoutes);

module.exports = routes;
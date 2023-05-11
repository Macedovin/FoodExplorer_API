const { Router } = require('express');

const userRoutes = require('./user.routes');

const sessionsRoutes = require('./sessions.routes.js');

const rolesRoutes = require('./roles.routes');

const routes = Router();

routes.use("/users", userRoutes);

routes.use('/sessions', sessionsRoutes);

routes.use('/roles', rolesRoutes);

module.exports = routes;
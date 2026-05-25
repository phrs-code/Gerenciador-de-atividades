const { Router } = require('express');

const routes = Router();

const usersControllers = require('../controllers/users.controllers')

routes.get('/users', usersControllers.list);

routes.post('/users', usersControllers.create);

routes.get('/users/:id', usersControllers.getById);

routes.put('/users/:id', usersControllers.update);

routes.delete('/users/:id', usersControllers.remove);

module.exports = routes;
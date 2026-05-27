const { Router } = require('express');

const routes = Router();

const tasksControllers = require('../controllers/tasks.controllers')
const { verifyAuthenticate } = require('../middlewares/verifyAuthentication')

routes.get('/tasks', tasksControllers.list);

routes.post('/tasks', verifyAuthenticate, tasksControllers.create);

routes.get('/tasks/:id', tasksControllers.getById);

routes.put('/tasks/:id', tasksControllers.update);

routes.delete('/tasks/:id', tasksControllers.remove);

module.exports = routes;
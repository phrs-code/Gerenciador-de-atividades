const { Router } = require('express');

const routes = Router();

const tasksControllers = require('../controllers/tasks.controllers')
const { verifyAuthenticate } = require('../middlewares/verifyAuthentication')

routes.get('/tasks',verifyAuthenticate, tasksControllers.list);

routes.post('/tasks', verifyAuthenticate, tasksControllers.create);

routes.get('/tasks/:id',verifyAuthenticate, tasksControllers.getById);

routes.put('/tasks/:id',verifyAuthenticate, tasksControllers.update);

routes.delete('/tasks/:id',verifyAuthenticate, tasksControllers.remove);

module.exports = routes;
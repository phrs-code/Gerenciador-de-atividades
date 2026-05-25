const express = require('express');
const userRoutes = require('./routes/users.routes')
const tasksRoutes = require('./routes/tasks.routes')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(tasksRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});


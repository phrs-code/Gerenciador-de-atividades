const express = require('express');

require('./config/database');

const { PORT } = require('./config/env')
const userRoutes = require('./routes/users.routes')
const tasksRoutes = require('./routes/tasks.routes')
const authenticateRoutes = require('./routes/authenticate.routes')
//require('dotenv').config()


const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(tasksRoutes);
app.use(authenticateRoutes);

//const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});


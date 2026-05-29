const uuid = require('uuid');

let tasks = [];

const list = (req, res) => {
    return res.status(200).json(tasks);
};

const getById = (req, res) => {
    const { id } = req.params;

    const task = tasks.find(t => t.id === id);

    if(!task) {
        return response.status(404).json({
            error: "@tasks/getById",
            message: `Task ${id} não encontrada`
        });
    };

    return res.status(200).json(task);
};

const create = (req, res) => {
    const { title, description, priority, status, user } = req.body;

    const id = uuid.v4();

    const task = {
        id,
        title,
        description,
        priority,
        status,
        user,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tasks.push(task);

    return res.status(201).json(task);
};

const update = (req, res) => {
    const { id } = req.params;

    const { title, description, priority, status, user } = req.body;

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex < 0) {
        return res.status(404).json({
            error: "Task não encontrado.",
            message: `Task ${id} não encontrada.`
        });
    };

    const { createdAt } = tasks[taskIndex]

    const taskUpdated = {
        id,
        title,
        description,
        priority,
        status,
        user,
        createdAt,
        updatedAt: new Date()
    }

    tasks[taskIndex] = taskUpdated;

    return res.status(200).json(taskUpdated);
};

const remove = (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex < 0) {
        res.end("Task não encontrada.");
    };

    tasks.splice(taskIndex, 1);

    return res.status(200).end("Task deletada com sucesso.")
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove
}
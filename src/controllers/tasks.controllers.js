let tasks = [];

const list = (req, res) => {
    return res.status(200).json(tasks);
};

const getById = (req, res) => {
    const { id } = req.params;

    const task = tasks.find(t => t.id === Number(id));

    return res.status(200).json(task);
};

const create = (req, res) => {
    const { id, title, description, priority, status } = req.body;

    const task = {
        id,
        title,
        description,
        priority,
        status
    };

    tasks.push(task);

    return res.status(201).json(task);
};

const update = (req, res) => {
    const { id } = req.params;

    const { title, description, priority, status } = req.body;

    const taskIndex = tasks.findIndex((t) => t.id === Number(id));

    if (taskIndex < 0) {
        return res.status(404).json({ error: "Task não encontrado." });
    }

    const taskUpdated = {
        id: Number(id),
        title,
        description,
        priority,
        status
    }

    tasks[taskIndex] = taskUpdated;

    return res.status(200).json(taskUpdated);
};

const remove = (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((t) => t.id === Number(id));

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
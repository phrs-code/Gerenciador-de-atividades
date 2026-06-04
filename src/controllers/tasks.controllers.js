const taskModel = require("../model/task.model")

const list = async(req, res) => {
    try {
        // Retorna apenas as tasks pertencentes a este usuário
        const tasks = await taskModel.find({ userId: req.userId });
        return res.json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar tasks' });
    }
};

const getById = async(req, res) => {

    const { id } = req.params;

    try {
        
        const task = await taskModel.findOneAndDelete({ _id: id, userId: req.userId })

        if (!task){
            throw new Error();
        };

        return res.json(task);

    } catch (error) {
        
        return res.status(400).json({
            error: "@task/getById",
            message: error.message || "Task not found"
        });
    }
};

const create = async(req, res) => {

    const { titulo, descricao, prioridade, status, categoria } = req.body;

    try {
        
        const task = await taskModel.create({
        titulo,
        descricao,
        prioridade,
        status,
        categoria,
        userId: req.userId,
    });

    return res.status(201).json(task);

    } catch (error) {
        
        return res.status(400).json({
            error: "@tasks/create",
            message: error.message || "Failed to create task"
        });
    }
};

const update = async(req, res) => {

    const { id } = req.params;
    const { titulo, descricao, prioridade, status, categoria } = req.body;

    try {
        // CORRIGIDO: findOneAndUpdate usando o filtro de dono da task
        const taskUpdated = await taskModel.findOneAndUpdate(
            { _id: id, userId: req.userId }, 
            { titulo, descricao, prioridade, status, categoria }, // payload de atualização
            { new: true }
        );

        if (!taskUpdated) {
            throw new Error("Task not found or does not belong to you");
        }

        return res.json(taskUpdated);
    } catch (error) {
        return res.status(400).json({
            error: "@tasks/update",
            message: error.message || "Failed to update task"
        });
    }
};

const remove = async(req, res) => {

    const { id } = req.params;

    try {
        
        const taskRemoved = await taskModel.findOneAndDelete({ _id: id, userId: req.userId });

        if (!taskRemoved) {
            throw new Error();
        }

        return res.status(204).send();

    } catch (error) {

        return res.status(400).json({
            error: "@task/delete",
            message: error.message || "Failed to delete task"
        });
    }
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove
}
const taskModel = require("../model/task.model")

const list = async(req, res) => {
    try {

        const task = await taskModel.find();
        return res.json(task);

    } catch (error) {

        return res.status(400).json({
            error: "@task/list",
            message: error.message || "Failed to list task"
        })
    }
};

const getById = async(req, res) => {

    const { id } = req.params;

    try {
        
        const task = await taskModel.findById(id);

        if (!task){
            throw new error();
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

    const { title, description, priority, status, user } = req.body;

    try {
        
        const task = await taskModel.create({
        title,
        description,
        priority,
        status,
        user,
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
    const { title, description, priority, status, user } = req.body;

    try {

     const taskUpdated = await taskModel.findByIdAndUpdate(id, {
        title,
        description,
        priority,
        status,
        user      
    }, {
        new: true
    });

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
        
        const taskRemoved = await taskModel.findByIdAndDelete(id);

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
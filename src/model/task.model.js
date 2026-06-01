const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);
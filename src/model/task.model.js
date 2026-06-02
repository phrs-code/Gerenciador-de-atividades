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
        enum: ['baixa', 'média', 'alta'],
        default: 'média',
        required: true
    },
    status: {
        type: String,
        enum: ['não iniciado', 'em andamento', 'concluído'],
        default: 'não iniciado',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['não iniciado', 'em andamento', 'concluído'],
        default: 'não iniciado',
        required: true
    },
    prioridade: {
        type: String,
        enum: ['baixa', 'média', 'alta'],
        default: 'média',
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
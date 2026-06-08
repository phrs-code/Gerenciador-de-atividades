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
        enum: ['pendente', 'andamento', 'concluida'],
        default: 'pendente',
        required: true
    },
    prioridade: {
        type: String,
        enum: ['baixa', 'media', 'alta'],
        default: 'media',
        required: true
    },
    id:{
       type: Number 
    },
    categoria: {
        type: String,
        required: true
    },
    // n esquecer de removeeeeeer
    responsavel: {
        type: String        
    },
    papel_responsavel:{
        type: String
    },
    publico_alvo: {
        type: String,
    },
    estimativa_horas: {
        type: Number
    },
    horas_gastas: {
        type: Number
    },
    data_criacao: {
        type: Date
    },
    data_conclusao: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);
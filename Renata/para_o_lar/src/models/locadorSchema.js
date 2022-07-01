const mongoose = require('mongoose');

const locadorSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    apartamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"apartamento"
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('locador', locadorSchema);
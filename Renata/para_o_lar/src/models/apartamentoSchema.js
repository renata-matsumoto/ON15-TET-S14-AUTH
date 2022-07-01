const mongoose = require('mongoose');

const apartamentoSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    
    locador:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"locador"
    },
    
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('apartamento', apartamentoSchema);
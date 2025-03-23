const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    rawId:{
        type: Number,
        required: true
    },

    title:{type: String},

    platform:{type: String},

    coverImageUrl:{type: String},

    status:{
        type: String,
        enum:['jugado', 'jugando', 'por jugar'],
        default: 'por jugar'
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
})

const GameModel = mongoose.model('Game', GameSchema, 'game')

module.exports = GameModel
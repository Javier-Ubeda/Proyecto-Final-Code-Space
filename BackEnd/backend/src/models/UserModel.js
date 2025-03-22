const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserShema = new Schema({
    username:{
        type: String,
        required: [true, 'Es necesario introducir el nombre'],
        trim: true
    },

    email:{
        type: String,
        required: [true, 'Tienes que añadir un email'],
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Por favor introduce un email valido']
    },

    password:{
        type: String,
        required: [true, 'Tienes que introducir una contraseña'],
        minLength: [4, 'La contraseña debe contener minimo 4 caracteres']
    },

    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    favorites:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Game'
    }
})

const UserModel = mongoose.model('User', UserShema, 'user')

module.exports = UserModel
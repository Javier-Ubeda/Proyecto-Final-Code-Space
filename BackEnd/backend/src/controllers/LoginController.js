const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const { createToken } = require('../Utils/utils');


const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ username, email, password: hashedPassword, role });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        
        console.error(error);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email : email})

        if(!user){
            return res.status(404).send('usuario o contraseña no validos')
        }

        const validar = await bcrypt.compare(password, user.password)

        if(!validar){
            return res.status(404).send('usuario o contraseña no validos')
        }

        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const token = createToken(payload, false)

        const tokenRefresh = createToken(payload, true)

        res.status(200).send({user, token, tokenRefresh})
    } catch (error) {
        
        res.status(500).send({status:'Error', error:error.message})
    }
};

module.exports = {signup, login}
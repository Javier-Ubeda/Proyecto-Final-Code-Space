const mongoose = require('mongoose')

const dbUrl = process.env.Mongo_url

const connectDataBase = async () => {
    try {
        await mongoose.connect(dbUrl, 
            console.log('http://localhost:4000')
        )
    } catch (error) {
        console.log('No se pudo conectar', error.message)
    }
}

module.exports = connectDataBase
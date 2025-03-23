const express = require('express')

const userLogin = require('./src/routes/LoginRoutes')
const userRouter = require('./src/routes/UserRouter')
const rawgRouter = require('./src/routes/rawg')

const cors = require('cors')
require('dotenv').config()

const connectDataBase = require('./src/DB/db')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', userLogin)
app.use('/api/user', userRouter)
app.use('/api/rawg', rawgRouter)

connectDataBase()

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Se ha conectado a MongoDB')
})

module.exports = app
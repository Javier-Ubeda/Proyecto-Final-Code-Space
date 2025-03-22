const express = require('express')
const { getGames, createCollection } = require('../controllers/UserController')
const { auth } = require('../middleware/verify-token')


const router = express.Router()

router.post('/', auth, createCollection)

router.get('/game', auth, getGames)

module.exports = router
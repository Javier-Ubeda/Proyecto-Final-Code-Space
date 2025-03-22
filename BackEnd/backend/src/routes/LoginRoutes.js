const express = require('express')
const router = express.Router()

const { signup, login } = require('../controllers/LoginController')
const { auth } = require('../middleware/verify-token')




router.post('/signup', signup)
router.post('/login', login)


module.exports = router
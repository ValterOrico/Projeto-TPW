const express = require('express')
const router = express.Router()

const userController = require('../controllers/user_controller')
const { isAdmin } = require('../middlewares/auth')

//Busca todos os usuario
router.get('/', userController.allUser)

//Cadastra novo usuario
router.post('/cadastrar', userController.createUser)

//login e gera um token
router.post('/login', userController.Login)

module.exports = router
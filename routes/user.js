const express = require('express')
const { UserController } = require('../controllers/userController')
const router = express.Router()


router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.patch('/products/:id',UserController.BuyProduct)

module.exports = router
const express = require('express')
const { UserController } = require('../controllers/userController')
const router = express.Router()
const {authN} = require('../middlewares/authN.js')

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.use(authN)
router.patch('/products/:id',UserController.BuyProduct)

module.exports = router
const express = require('express')
const router = express.Router()
const userRoutes = require('./user.js')
const productRoutes = require('./product.js')

router.use('/users',userRoutes)
router.use('/products',productRoutes)

module.exports = router
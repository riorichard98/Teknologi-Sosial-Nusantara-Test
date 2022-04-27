const express = require('express')
const { ProductController } = require('../controllers/productController')
const router = express.Router()

router.get('/',ProductController.findAll)
router.get('/:id',ProductController.findOne)


module.exports = router
const express = require('express')
const router = express.Router()

router.get('/',ProductController.findAll)
router.get('/:id',ProductController.findOne)


module.exports = router
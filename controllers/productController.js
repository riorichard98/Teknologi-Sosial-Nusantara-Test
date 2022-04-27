const { Product } = require("../models/product");


class ProductController {
    static async findAll(req, res, next) {
        try {
            const products = await Product.findAllProduct()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ message: 'something error in get all product' })
        }
    }

    static async findOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findProductById(id)
            res.status(200).json(product)
        } catch (error) {
            if (error.name === 'BSONTypeError') {
                res.status(404).json({
                    message: 'Product not found'
                })
            } else {
                res.status(500).json({ message: 'something error in get one product by id' })
            }

        }
    }
}

module.exports = { ProductController }
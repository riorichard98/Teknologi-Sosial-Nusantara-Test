const { ObjectId } = require("mongodb");
const { getDataBase } = require("../config/mongoDb");

class Product {
    static async findAllProduct() {
        try {
            const db = getDataBase()
            const products = await db
                .collection('products')
                .find()
                .toArray()
            return products
        } catch (error) {
            throw (error)
        }
    }

    static async findProductById(id) {
        try {
            const db = getDataBase()
            const product = await db
                .collection('products')
                .findOne({ _id: ObjectId(id) })
            return product
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = {Product}
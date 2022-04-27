const { User } = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Product } = require("../models/product");


class UserController {
    static async register(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber) {
                throw ({
                    code: 400,
                    message: 'please fill all the form registration including email password name and phone number'
                })
            }
            const { email, password, name, phoneNumber } = req.body
            const data = { email, password, name, phoneNumber }
            data.password = bcrypt.hashSync(data.password, 10)
            let found = await User.findOneUser(data.email)
            if (found) {
                throw ({
                    code: 400,
                    message: 'email has been registered'
                })
            }
            data.kart = []
            let user = await User.registerUser(data)
            user = await User.findOneUserById(user.insertedId)
            const access_token = jwt.sign({ id: user._id }, 'secret')
            res.status(201).json({
                access_token,
                message:'Success Register',
                user
            })
        } catch (error) {
            console.log(error);
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in register user' })
            }
        }
    }

    static async login(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                throw ({
                    code: 400,
                    message: 'email or password are required'
                })
            }
            const { email, password } = req.body
            const data = { email, password }
            const user = await User.loginUser(data)
            if (!user) {
                throw ({
                    code: 400,
                    message: 'email is not registered please register'
                })
            }
            if (!bcrypt.compareSync(data.password, user.password)) {
                throw ({
                    code: 400,
                    message: 'invalid password'
                })
            }
            delete user.password
            const access_token = jwt.sign({ id: user._id }, 'secret')
            res.status(200).json({
                user,
                access_token
            })
        } catch (error) {
            if (error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in login user' })
            }
        }
    }

    static async BuyProduct(req, res, next) {
        try {
            if (!req.body.size ) {
                throw ({
                    code: 400,
                    message: 'please select the size of the shirt'
                })
            }
            let s = req.body.size
            if(s !== "M" && s !== "L" && s !== "X"&& s !== "XL"){
                throw ({
                    code: 400,
                    message: 'please select the size of the shirt properly'
                })
            }
            if (!req.body.gender) {
                throw ({
                    code: 400,
                    message: 'please select the gender of the shirt'
                })
            }
            let g = req.body.gender
            if(g !== "Male" && g !== "Female"){
                throw ({
                    code: 400,
                    message: 'please select the gender of the shirt properly'
                })
            }
            const  productId  = req.params.id
            await Product.findProductById(productId)
            const product ={
                productId,
                size:req.body.size,
                genderProduct:req.body.gender
            }
            const {id} = req.auth
            await User.updateUserKart(id,product)
            const user = await User.findOneUserById(id)
            res.status(200).json({
                message:"success buying new product",
                user
            })
        } catch (error) {
            if(error.name === 'BSONTypeError' ){
                res.status(404).json({
                    message:'Product not found'
                })
            }else if(error.code === 400) {
                res.status(400).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'something error in buying product' })
            }
        }
    }
}

module.exports = { UserController }
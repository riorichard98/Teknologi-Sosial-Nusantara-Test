const { User } = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static async register(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name || !req.body.phoneNumber) {
                throw ({
                    code: 400,
                    message: 'please fill all the form registration'
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
            user = await user.findOneUserById(user.insertedId)
            const access_token = jwt.sign({ id: user._id }, 'secret')
            res.status(201).json({
                access_token,
                message:'Success Register',
                user
            })
        } catch (error) {
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
                    message: 'invalid email or password'
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

        } catch (error) {

        }
    }
}

module.exports = { UserController }
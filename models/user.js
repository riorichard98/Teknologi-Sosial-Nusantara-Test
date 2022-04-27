const { ObjectId } = require("mongodb");
const { getDataBase } = require("../config/mongoDb");

class User {
    static async registerUser(data) {
        try {
            const db = getDataBase()
            const user = await db
                .collection('users')
                .insertOne(data)
            return user
        } catch (error) {
            throw (error)
        }
    }

    static async loginUser(data) {
        try {
            const db = getDataBase()
            const user = await db
                .collection('users')
                .findOne({ email: data.email })
            return user
        } catch (error) {
            throw (error)
        }
    }

    static async findOneUser(email) {
        try {
            const db = getDataBase()
            const user = await db
                .collection('users')
                .findOne({ email: email })
            return user
        } catch (error) {
            throw (error)
        }
    }

    static async findOneUserById(id) {
        try {
            const db = getDataBase()
            const user = await db
                .collection('users')
                .findOne({ _id: ObjectId(id) })
            if(user){
                delete user.password
            }
            return user
        } catch (error) {
            throw (error)
        }
    }

    static async updateUserKart(id, product) {
        try {
            const db = getDataBase()
            const user = await db
                .collection('users')
                .findOne({ _id: ObjectId(id) })

            //avoid database error for kart
            if (user.kart.length) {
                user.kart.push(product)
            } else {
                user.kart = [product]
            }
            await db
                .collection('users')
                .updateOne({ _id: ObjectId(id) },
                    {
                        $set: {
                            kart: user.kart
                        },
                    })
            return 'success updating saldo'
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = { User }
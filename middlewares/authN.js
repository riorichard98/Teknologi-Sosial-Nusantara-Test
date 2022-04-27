const jwt = require('jsonwebtoken')
const { User } = require("../models/user");

const authN = async (req,res,next)=>{
    try {
        if(!req.headers.access_token){
            throw({
                name:'client',
                code:401,
                msg:'Invalid token'
            })
        }
        const {id} = jwt.verify(req.headers.access_token,'secret')
        const found = await User.findOneUserById(id)
        if(!found){
            throw({
                name:'client',
                code:401,
                msg:'Invalid token'
            })
        }
        req.auth = {id}
        next()
    } catch (error) {
        if(error.name === 'client'){
            res.status(error.code).json({
                message:error.msg
            })
        }else if(error.name === 'JsonWebTokenError'){
            res.status(401).json({
                message:'Invalid token'
            })
        }else{
            res.status(500).json({
                message:'Internal server error'
            })
        }
    }
}

module.exports ={authN}
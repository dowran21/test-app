const JWT = require ('jsonwebtoken')
require('dotenv').config()
const {status} = require ('../utils/status.js')

const VerifyAdminAccessToken = async (req, res, next) =>{
    let token = req.headers.authorization
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ADMIN_ACCESS_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

const VerifyAdminRefreshToken = async (req, res, next) =>{
    let token = req.headers.authorization
    if (!token){
        return res.status(status.bad).send("Token not provided")
    }

    token = token.replace("Bearer ", "")
    JWT.verify(token, process.env.ADMIN_REFRESH_KEY, async (err, decoded) =>{
        if(err){
            console.log("I am in error")
            console.log(err)
            return res.status(status.forbidden).send("forbidden");
        }
        req.user = decoded;
        next()
    });
}

module.exports = {
    VerifyAdminAccessToken,
    VerifyAdminRefreshToken
}
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const HashPassword = async (password) => {
    return bcrypt.hashSync(password, 5);
};

const ComparePassword = async (password, hash) =>{
    return bcrypt.compareSync(password, hash)
};

const GenerateAdminAccessToken = async(data) =>{
    return JWT.sign(data, process.env.ADMIN_ACCESS_KEY, {expiresIn:"1d"})
};

const GenerateAdminRefreshToken = async(data) =>{
    return JWT.sign(data, process.env.ADMIN_REFRESH_KEY, {expiresIn:"15d"})
};

module.exports = {
    HashPassword,
    ComparePassword,
    GenerateAdminAccessToken,
    GenerateAdminRefreshToken
}
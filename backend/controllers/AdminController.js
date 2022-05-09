const database = require("../db/index.js") 
const Helper = require('../utils/index.js');
const { status } = require("../utils/status");

const Login = async (req, res) =>{
    const {name, password} = req.body;
    const query_text = `
        SELECT * FROM users WHERE name = $1
    `
    try {
        const {rows} = await database.query(query_text, [name])
        const user = rows[0]
        if(!user){
            let message = {}
            message["name"] = "Неправильное имя или пароль"
            return res.status(status.error).send({error:message})
        }
        let compare = await Helper.ComparePassword(password, user?.password)
        if(!compare){
            let message = {}
            message["name"] = "Неправильное имя или пароль"
            return res.status(status.error).send({error:message})
        }
        const data = {name:user.name}
        const access_token = await Helper.GenerateAdminAccessToken(data)
        const refresh_token = await Helper.GenerateAdminRefreshToken(data)
        return res.status(status.success).json({access_token, refresh_token, data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AdminLoad = async (req, res) =>{
    const {name} = req.user;
    if(!name){
        return res.status(status.bad).send(false)
    }
    const data = {name}
    const access_token = await Helper.GenerateAdminAccessToken(data)
    const refresh_token = await Helper.GenerateAdminRefreshToken(data)
    return res.status(status.success).json({access_token, refresh_token, data})
}

const UpdatePost = async (req, res) =>{
    const {name, email, text} = req.body;
    const {id} = req.params
    const query_text = `
        UPDATE to_do_list SET name = $1, email = $2, text=$3, status_id = 2 WHERE id = $4
    `
    try {
        await database.query(query_text, [name, email, text, id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const SubmitToDo = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE to_do_list SET status_id = 3 WHERE id = $1
    `
    try {
        await database.query(query_text, [id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

module.exports = {
    Login, 
    AdminLoad,
    UpdatePost,
    SubmitToDo
}
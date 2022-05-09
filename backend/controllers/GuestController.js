const database = require("../db/index.js") 
const { status } = require("../utils/status");

const AddPost = async (req, res) =>{
    const {name, email, text} = req.body;
    const query_text = `
        INSERT INTO to_do_list(name, email, text) VALUES ($1, $2, $3) RETURNING id, status_id, name, email, text
    `
    try {
        const {rows} = await database.query(query_text, [name, email, text])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetPosts = async (req, res) =>{
    const {page, limit, search, column, direction} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    wherePart = ``
    if(search){
        wherePart += ` AND (tl.name~*'${search}' OR tl.email~*'${search}')`
    }
    let sort_direction = ``
    if(direction){
        sort_direction = direction
    }else{
        sort_direction = `DESC`
    }
    let sort_column = ``
    if(column) {
        sort_column = column
    }else{
        sort_column = ` tl.created_at`
    }
    const query_text = `
        SELECT (
            SELECT COUNT(*) 
            FROM to_do_list tl 
            WHERE tl.id > 0 ${wherePart}
        ) AS count, (
            SELECT json_agg(l) FROM (
                SELECT tl.name, tl.email, tl.text, tl.id, tl.status_id
                FROM to_do_list tl
                WHERE tl.id>0 ${wherePart}
                ORDER BY ${sort_column} ${sort_direction} 
                ${offSet}
        )l) AS list
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

module.exports = {
    AddPost,
    GetPosts
}
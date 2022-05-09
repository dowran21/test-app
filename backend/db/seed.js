const database = require('./index.js')
const {HashPassword} = require('../utils/index.js')

const CreateAdmin = async () => { 
    const password = '123';
    const hashed_password = await HashPassword(password);
    const query_text = `
        INSERT INTO users(name, password)
            VALUES ('admin', $1 )
    `
    try {
        await database.query(query_text, [hashed_password])
    } catch (e) {
        console.log(e)
        throw e
    }
}

CreateAdmin()
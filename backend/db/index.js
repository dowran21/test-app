// const dbconst = require('../utils/')
require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER || "dowran",
    password: process.env.DB_PASSWORD || '61123141',
    localhost: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'to_do',
    port: process.env.DB_PORT || '5432'
});

module.exports = {
    pool,
    async query(text, params){
        const res = await pool.query(text, params)
        return res
    },
    async queryTransaction(query_list){
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()
        try {
          await client.query('BEGIN');
          let response = [];
          for (const {text, params} of query_list) {
            const {rows} = await client.query(text, params);
            response = response.concat(rows);
          }
          await client.query('COMMIT');
          return response;
        } catch (e) {
          await client.query('ROLLBACK')
          throw e
        } finally {
          client.release()
        }
      } 
}
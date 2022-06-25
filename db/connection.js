const { Pool } = require('pg')


require('dotenv').config()
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PASSWORD}@${process.env.HOST}:5656/${process.env.DATABASE}`
const isProduction = process.env.NODE_ENV === 'production'
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction
})


const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err)
                reject(({ status: 'failed', msg: 'error connection to db', err }))
            else {
                client.query(query, params, (err, result) => {
                    release()
                    if (err)
                        reject({ status: 'failed', msg: 'error executing query', err })
                    else
                        resolve({ status: 'success', msg: 'query executed sucessfully', rows: result.rows })
                })
            }
        })
    })
}


module.exports = { executeQuery }
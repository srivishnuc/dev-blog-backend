const Pool = require('pg').Pool
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString: connectionString })


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
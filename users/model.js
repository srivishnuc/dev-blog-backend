const { executeQuery } = require('../db/connection.js')

const addUserModel = async (req, res) => {
    const { username, email, phone, password } = req.body
    let dbResponse;
    try {
        const usernameCheck = await executeQuery(`select count(*) from users where username = $1 or email = $2`, [username, email])
        if (usernameCheck.rows[0].count === '0') {
            dbResponse = await executeQuery(`Insert into users(username,password,email,phone) values ($1 ,$2 ,$3 ,$4 )`, [username, password, email, phone])
            res.status(200).send(dbResponse)
        }
        else
            res.status(400).send({ status: 'failed', msg: 'Username or Email already in use' })
    } catch (err) {
        res.status(400).send(err)
    }

}


const getUserModel = async (req, res) => {
    const { username, email } = req.body
    let dbResponse, userid
    try {
        dbResponse = await executeQuery('select userid from users where username = $1 or email = $2', [username, email])
        userid = (dbResponse.rows.length !== 0) ? parseInt(dbResponse.rows[0].userid) : null
    } catch (err) {
        res.status(400).send({ status: 'failed', msg: 'User validation issue' })
    }
    if (userid !== null) {
        try {
            dbResponse = await executeQuery('select * from users where userid = $1', [userid])
            return dbResponse
        } catch (err) {
            return dbResponse
        }
    } else {
        res.status(400).send({ status: 'failed', msg: 'Invalid User' })
    }
}


module.exports = { getUserModel, addUserModel }
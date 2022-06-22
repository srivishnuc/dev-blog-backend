const { executeQuery } = require('./db/connection.js')

const addUserModel = async (req, res) => {
    const { username, email, phone, password } = req.body
    const dbResponse = await executeQuery(`Insert into users(username,password,email,phone) values ($1 $2 $3 $4 )`, [username, password, email, phone])
    const statusCode = dbResponse.status === 'success' ? 200 : 400
    res.sendStatus(statusCode).send(dbResponse)
}


const getUserModel = (req, res) => {

}


module.exports = { getUserModel, addUserModel }
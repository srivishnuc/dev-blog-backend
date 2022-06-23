const { executeQuery } = require('./db/connection.js')

const addUserModel = async (req, res) => {
    const { username, email, phone, password } = req.body
    let dbResponse
    try {
        dbResponse = await executeQuery(`Insert into users(username,password,email,phone) values ($1 $2 $3 $4 )`, [username, password, email, phone])
        res.sendStatus(200).send(dbResponse)
    } catch (err) {
        res.send(err)
    }

}


const getUserModel = (req, res) => {

}


module.exports = { getUserModel, addUserModel }
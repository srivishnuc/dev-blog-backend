const { getUserModel, addUserModel, getUserIdModel } = require('./model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getUserDetails = async (req, res) => {
    const { password } = req.body
    const selectedUser = await getUserModel(req, res)
    if (selectedUser !== undefined) {
        if (bcrypt.compareSync(password, selectedUser.rows[0].password)) {
            let jwtToken = jwt.sign({ userid: selectedUser.rows[0].userid, username: selectedUser.rows[0].username, email: selectedUser.rows[0].email }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
            res.status(200).send({ status: 'success', msg: 'Login sucessful', data: jwtToken })
        } else {
            res.status(400).send({ status: 'failed', msg: 'Invalid User' })
        }
    } else {
        res.send(selectedUser)
    }
}

const addUserDetails = async (req, res) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTS_ROUND))
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    const isUserRegistered = await addUserModel(req, res)
    if (isUserRegistered.status === "success") {
        try {
            const loginId = await getUserIdModel(req, res)
            let jwtToken = jwt.sign({ userid: loginId, username: req.body.username, email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
            res.status(200).send({ status: 'success', msg: 'Login successful', data: jwtToken })
        } catch (err) {
            res.status(400).send({ status: 'failed', msg: 'Login failed' })
        }
    } else {
        res.send(isUserRegistered)
    }
}

module.exports = { getUserDetails, addUserDetails }



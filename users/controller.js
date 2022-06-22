const { getUserModel, addUserModel } = require('./model.js')

const getUserDetails = (req, res) => {
    getUserModel(req, res)
}


const addUserDetails = (req, res) => {
    addUserModel(res, res)
}


module.exports = { getUserDetails, addUserDetails }
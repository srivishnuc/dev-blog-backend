const router = require('express').Router()
const { getUserDetails, addUserDetails } = require('./controller.js')



router.get('/userDetails', getUserDetails)
router.post('/addUser', addUserDetails)



module.exports = router
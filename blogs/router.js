const router = require('express').Router()
const { addBlog } = require('./controller')

router.post('/addBlog', addBlog)

module.exports = router
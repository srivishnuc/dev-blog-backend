const router = require('express').Router()
const { addBlog, selectBlog, selectAllBlog } = require('./controller')

router.post('/addBlog', addBlog)
router.get('/', selectBlog)
router.get('/allBlog', selectAllBlog)

module.exports = router
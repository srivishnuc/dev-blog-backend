const router = require('express').Router()
const { addBlog, selectBlog, selectAllBlog, addUserComment, addUserLike } = require('./controller')

router.post('/addBlog', addBlog)
router.get('/', selectBlog)
router.get('/allBlog', selectAllBlog)
router.put('/comment', addUserComment)
router.put('/like', addUserLike)

module.exports = router
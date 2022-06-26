const router = require('express').Router()
const { addBlog, selectBlog, selectAllBlog, addUserComment, addUserLike, getLikeCount, getComments, updateLike, updateComment } = require('./controller')

router.post('/addBlog', addBlog)
router.get('/', selectBlog)
router.get('/allBlog', selectAllBlog)
router.put('/comment', addUserComment)
router.put('/like', addUserLike)
router.get('/likeCount', getLikeCount)
router.get('/getComments', getComments)
router.put('/updateLike', updateLike)
router.put('/updateComment', updateComment)

module.exports = router
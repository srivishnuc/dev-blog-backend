const { addBlogModel, selectBlogModel, selectAllBlogModel, addUserCommentModel, addUserLikeModel, getLikeCountModel, getCommentsModel } = require('./model')

const addBlog = (req, res) => {
    addBlogModel(req, res)
}

const selectBlog = (req, res) => {
    selectBlogModel(req, res)
}

const selectAllBlog = (req, res) => {
    selectAllBlogModel(req, res)
}

const addUserComment = (req, res) => {
    addUserCommentModel(req, res)
}

const addUserLike = (req, res) => {
    addUserLikeModel(req, res)
}

const getLikeCount = (req, res) => {
    getLikeCountModel(req, res)
}

const getComments = (req, res) => {
    getCommentsModel(req, res)
}

module.exports = { addBlog, selectBlog, selectAllBlog, addUserComment, addUserLike, getLikeCount, getComments }
const { addBlogModel, selectBlogModel, selectAllBlogModel, addUserCommentModel, addUserLikeModel } = require('./model')

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

module.exports = { addBlog, selectBlog, selectAllBlog, addUserComment, addUserLike }
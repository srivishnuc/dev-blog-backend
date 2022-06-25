const { addBlogModel, selectBlogModel, selectAllBlogModel } = require('./model')

const addBlog = (req, res) => {
    addBlogModel(req, res)
}

const selectBlog = (req, res) => {
    selectBlogModel(req, res)
}

const selectAllBlog = (req, res) => {
    selectAllBlogModel(req, res)
}

module.exports = { addBlog, selectBlog, selectAllBlog }
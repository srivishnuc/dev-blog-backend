const { addBlogModel } = require('./model')

const addBlog = (req, res) => {
    addBlogModel(req, res)
}


module.exports = { addBlog }
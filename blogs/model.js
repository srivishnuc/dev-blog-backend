const { executeQuery } = require('../db/connection')


const addBlogModel = async (req, res) => {
    const { userid } = req
    const { content, header, tagid } = req.body
    try {
        const dbResponse = await executeQuery(`Insert into blogs(userid, content,header,tagid) values($1,$2,$3,$4)`, [userid, content, header, tagid])
        res.status(200).send(dbResponse)
    } catch (err) {
        res.status(400).send(err)
    }
}


module.exports = { addBlogModel }
const { executeQuery } = require("../db/connection");

const addBlogModel = async (req, res) => {
  const { userid } = req;
  const { content, title, author, tagids } = req.body;
  try {
    const dbResponse = await executeQuery(
      `Insert into blogs(userid, content, title, tagids, author) values($1,$2,$3,$4,$5)`,
      [userid, content, title, tagids, author]
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const selectBlogModel = async (req, res) => {
  const { blogid } = req.query;
  try {
    const dbResponse = await executeQuery(
      `select row_to_json(blog) as selectedBlog from (select blogid,title,content from blogs)blog where blogid = $1`,
      [blogid]
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const selectAllBlogModel = async (req, res) => {
  try {
    const dbResponse = await executeQuery(
      `select json_agg(json_build_object('blogid', blogid, 'title', title , 'content', content , 'author' , author, 'tags' , tagids )
      order by created_date desc
      )as blogs
      from blogs`,
      []
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTagsModel = async (req, res) => {
  try {
    const dbResponse = await executeQuery(
      `select tagid,name as tagname from tags`,
      []
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addUserCommentModel = async (req, res) => {
  try {
    const { blogid, comment, status } = req.body;
    const { userid } = req;
    const dbResponse = await executeQuery(`call updatecomment($1,$2,$3,$4)`, [
      blogid,
      userid,
      status,
      comment,
    ]);
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addUserLikeModel = async (req, res) => {
  try {
    const { blogid, status } = req.body;
    const { userid } = req;
    const dbResponse = await executeQuery(`call updatelike($1,$2,$3)`, [
      blogid,
      userid,
      status,
    ]);
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getLikeCountModel = async (req, res) => {
  const { blogid } = req.body;
  try {
    const dbResponse = await executeQuery(
      `select row_to_json(com) as like from (select count(*) from likes  where blogid = $1 and active = 'Y') com`,
      [blogid]
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCommentsModel = async (req, res) => {
  const { blogid } = req.body;
  try {
    const dbResponse = await executeQuery(
      `select row_to_json(cmts) as comments from (select comment from comments  where blogid = $1 and active = 'Y') cmts`,
      [blogid]
    );
    res.status(200).send(dbResponse);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addBlogModel,
  selectBlogModel,
  selectAllBlogModel,
  addUserCommentModel,
  addUserLikeModel,
  getLikeCountModel,
  getCommentsModel,
  getTagsModel,
};

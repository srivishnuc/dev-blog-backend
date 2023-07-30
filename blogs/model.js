const { executeQuery } = require("../db/connection");

const addBlogModel = async (req, res) => {
  const { userid } = req;
  const { content, header, tagval, author, otherTags } = req.body;
  let { tagid } = req.body;
  try {
    const addNewTag = await executeQuery(`Insert into tags(name) values($1)`, [
      tagval,
    ]);
    if (addNewTag.status === "success") {
      try {
        if (tagid === "") {
          const addNewTagId = await executeQuery(
            `select tagid from tags where name = $1`,
            [tagval]
          );
          tagid = addNewTagId.rows[0].tagid;
        }
        const dbResponse = await executeQuery(
          `Insert into blogs(userid, content,header,tagid,other_tags, author) values($1,$2,$3,$4,ARRAY[$5],$6)`,
          [userid, content, header, tagid, otherTags, author]
        );
        res.status(200).send(dbResponse);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(400).send(addNewTag);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const selectBlogModel = async (req, res) => {
  const { blogid } = req.query;
  try {
    const dbResponse = await executeQuery(
      `select row_to_json(blog) as selectedBlog from (select blogid,header,content from blogs)blog where blogid = $1`,
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
      `select row_to_json(blog) as Blog from (select blogid,header,content from blogs order by created_date desc , blogid desc)blog`,
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
};

const { executeQuery } = require("../db/connection.js");

const getUserIdModel = async (req, res) => {
  const { username, email } = req.body;
  try {
    dbResponse = await executeQuery(
      "select userid from users where username = $1 or email = $2",
      [username, email]
    );
    return dbResponse.rows.length !== 0
      ? parseInt(dbResponse.rows[0].userid)
      : null;
  } catch (err) {
    return err;
  }
};

const getUserModel = async (req, res) => {
  let dbResponse, userid;
  userid = await getUserIdModel(req, res);
  if (userid) {
    try {
      dbResponse = await executeQuery("select * from users where userid = $1", [
        userid,
      ]);
      return dbResponse;
    } catch (err) {
      return dbResponse;
    }
  } else {
    res.status(400).send({ status: "failed", msg: "Invalid User" });
  }
};

const addUserModel = async (req, res) => {
  const { username, email, phone, password } = req.body;
  let dbResponse;
  try {
    const usernameCheck = await getUserIdModel(req, res);
    if (usernameCheck === null) {
      dbResponse = await executeQuery(
        `Insert into users(username,password,email,phone) values ($1 ,$2 ,$3 ,$4 )`,
        [username, password, email, phone]
      );
      return dbResponse;
    } else {
      return { status: "failed", msg: "Username or Email already in use" };
    }
  } catch (err) {
    return err;
  }
};

module.exports = { getUserModel, addUserModel, getUserIdModel };

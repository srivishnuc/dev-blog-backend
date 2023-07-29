const { executeQuery } = require("../db/connection.js");

const getUserIdModel = async (req) => {
  const { email } = req.body;
  try {
    dbResponse = await executeQuery(
      "select userid from users where email = $1",
      [email]
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
  userid = await getUserIdModel(req);
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
    res.status(403).send({ status: "failed", msg: "Invalid User" });
  }
};

const addUserModel = async (req, res) => {
  const { email, phone, password, firstname } = req.body;
  let dbResponse;
  try {
    const isExistingUser = await getUserIdModel(req);
    if (isExistingUser === null) {
      dbResponse = await executeQuery(
        `Insert into users(firstname,password,email,phone) values ($1 ,$2 ,$3 ,$4 )`,
        [firstname, password, email, phone]
      );
      return dbResponse;
    } else {
      return { status: "failed", msg: "Email already in use" };
    }
  } catch (err) {
    return err;
  }
};

module.exports = { getUserModel, addUserModel, getUserIdModel };

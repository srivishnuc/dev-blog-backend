const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const checkJwtToken = (req, res, next) => {
  let isRegister =
    req.method === "POST" &&
    (req.url == "/user/addUser" || req.url == "/user/addUser/");
  let isLogin =
    req.method === "PUT" &&
    (req.url == "/user/userDetails" || req.url == "/user/userDetails/");
  let isBlog = req.method === "GET" && req.url.includes("/blogs");
  if (isRegister || isLogin || isBlog) next();
  else {
    let authorization = req.headers.authorization;
    authorization = authorization ? authorization.split(" ")[1] : "";
    if (authorization) {
      jwt.verify(authorization, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(400).send({ status: "failed", msg: "Un-authorized" });
        } else {
          req.userid = decoded.userid;
          next();
        }
      });
    } else {
      next();
    }
  }
};
app.use(checkJwtToken);

const users = require("./users/router");
const blogs = require("./blogs/router");

app.use("/user", users);
app.use("/blogs", blogs);

app.listen(process.env.PORT, () =>
  console.log(`App running at http://localhost:${process.env.PORT}`)
);

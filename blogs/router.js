const router = require("express").Router();
const {
  addBlog,
  selectBlog,
  selectAllBlog,
  addUserComment,
  addUserLike,
  getLikeCount,
  getComments,
  getTags,
} = require("./controller");

router.post("/addBlog", addBlog);
router.get("/", selectBlog);
router.get("/allBlog", selectAllBlog);
router.put("/comment", addUserComment);
router.put("/like", addUserLike);
router.get("/likeCount", getLikeCount);
router.get("/getComments", getComments);
router.get("/allTags", getTags);

module.exports = router;

const { Router } = require("express");
const {
  createPost,
  getAllPost,
  addComment,
  getCommentsOnPost,
  replyToComment,
  getComment,
} = require("../controller/postController");
const router = Router();

router
  .get("/post", getAllPost)
  .post("/post", createPost)
  .post("/post/comment", addComment)
  .post("/post/reply", replyToComment)
  .get("/post/comment/:postId", getCommentsOnPost)
  .get("/comment/:commentId", getComment);

module.exports = router;

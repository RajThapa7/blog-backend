const { Router } = require("express");
const {
  createPost,
  getAllPost,
  addComment,
  getCommentsOnPost,
  replyToComment,
  getComment,
  getRepliesOfComment,
  getPost,
} = require("../controller/postController");
const router = Router();

router
  .get("/post", getAllPost)
  .get("/post/:postId", getPost)
  .post("/post", createPost)
  .post("/post/comment", addComment)
  .get("/post/comment/:postId", getCommentsOnPost)
  .get("/comment/:commentId", getComment)
  .get("/comment/replies/:commentId", getRepliesOfComment);

module.exports = router;

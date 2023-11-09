import { Router } from "express";
import {
  addComment,
  createPost,
  getAllPost,
  getComment,
  getCommentsOnPost,
  getPost,
  getRepliesOfComment,
} from "../controller/postController.js";

const router = Router();

router
  .get("/post", getAllPost)
  .get("/post/:postId", getPost)
  .post("/post", createPost)
  .post("/post/comment", addComment)
  .get("/post/comment/:postId", getCommentsOnPost)
  .get("/comment/:commentId", getComment)
  .get("/comment/replies/:commentId", getRepliesOfComment);

export default router;

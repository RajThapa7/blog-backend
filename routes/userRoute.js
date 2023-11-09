import { Router } from "express";
import {
  createUser,
  getUser,
  requestToBeAuthor,
} from "../controller/userController.js";

const router = Router();

router
  .post("/user", createUser)
  .post("/user/become-author", requestToBeAuthor)
  .get("/user/:userId", getUser);

export default router;

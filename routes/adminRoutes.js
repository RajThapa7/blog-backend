import { Router } from "express";
import {
  createRole,
  deleteUser,
  editUserRole,
  getAllUsers,
  getAuthorRequestList,
  verifyAuthorRequest,
} from "../controller/adminController.js";

const router = Router();

router
  .get("/user", getAllUsers)
  .post("/role", createRole)
  .patch("/role", editUserRole)
  .delete("/user/:userId", deleteUser)
  .get("/author-request", getAuthorRequestList)
  .post("/verify-author-request", verifyAuthorRequest);

export default router;

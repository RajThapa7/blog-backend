const { Router } = require("express");
const {
  createRole,
  editUserRole,
  deleteUser,
  getAllUsers,
  getAuthorRequestList,
  verifyAuthorRequest,
} = require("../controller/adminController");

const router = Router();

router
  .get("/user", getAllUsers)
  .post("/role", createRole)
  .patch("/role", editUserRole)
  .delete("/user/:userId", deleteUser)
  .get("/author-request", getAuthorRequestList)
  .post("/verify-author-request", verifyAuthorRequest);

module.exports = router;

const { Router } = require("express");
const {
  createUser,
  getUser,
  requestToBeAuthor,
} = require("../controller/userController");
const router = Router();

router
  .post("/user", createUser)
  .post("/user/become-author", requestToBeAuthor)
  .get("/user/:userId", getUser);

module.exports = router;

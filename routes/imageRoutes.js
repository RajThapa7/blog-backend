const { Router } = require("express");
const imageUpload = require("../controller/imageController");
const router = Router();

router.post("/image/upload", imageUpload);

module.exports = router;

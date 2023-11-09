const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

//routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoutes");
const imageRoutes = require("./routes/imageRoutes");
const {
  errorHandlerMiddleware,
  invalidPathHandler,
  errorLoggerMiddleware,
} = require("./middlewares/errorHandlerMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");

app.use(corsMiddleware());

app.use(adminRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(imageRoutes);

//middlewares
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(invalidPathHandler);

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Successfully connected to Database");
  app.listen(4000, () => {
    console.log("server is running on port 4000");
  });
});

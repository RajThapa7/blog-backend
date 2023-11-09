import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
  invalidPathHandler,
} from "./middlewares/errorHandlerMiddleware.js";
import { adminRoutes, postRoutes, userRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

//routes

app.use(corsMiddleware());

app.use(adminRoutes);
app.use(userRoutes);
app.use(postRoutes);

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

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index.js";
import ExpireVerification from "./helper/ExpireVerification/ExpireVerification.js";
import {
  AchievementImageMover,
  CategoryImageMover,
  CourseImageMover,
  GalleryImageMover,
  PropertyImageMover,
  TeacherImageMover,
  UserImageMover,
} from "./helper/FolderCleaners/PropertyImageMover.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(router);
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/media", express.static("media"));

setInterval(() => {
  ExpireVerification();
}, 1);

setInterval(() => {
  PropertyImageMover();
  TeacherImageMover();
  GalleryImageMover();
  AchievementImageMover();
  CourseImageMover();
  CategoryImageMover();
  UserImageMover();
}, 2000);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

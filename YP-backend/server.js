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
import {
  categoryFolderCleaners,
  courseFolderCleaners,
  propertyAchievementsFolderCleaners,
  propertyGalleryFolderCleaners,
  propertyMainFolderCleaners,
  teacherProfileFolderCleaners,
  UserFolderCleaners,
} from "./helper/FolderCleaners/FolderCleaners.js";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_DASHBOARD_URL],
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
  UserFolderCleaners();
  courseFolderCleaners();
  categoryFolderCleaners();
  propertyMainFolderCleaners();
  propertyGalleryFolderCleaners();
  propertyAchievementsFolderCleaners();
  teacherProfileFolderCleaners();
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
  console.log(`Server is running on PORT ${process.env.PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index.js";
import handleFolderCleaner from "./helper/FolderCleaners/FolderCleaners.js";
import ExpireVerification from "./helper/ExpireVerification/ExpireVerification.js";
import GalleryFolderCleaner from "./helper/FolderCleaners/GalleryFolderCleaner.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(router);
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/Folders", express.static("Folders"));

setInterval(() => {
  handleFolderCleaner();
  ExpireVerification();
  GalleryFolderCleaner();
}, 120000);

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

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/index.js";
import ExpireVerification from "./helper/ExpireVerification/ExpireVerification.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_DASHBOARD_URL],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
app.use("/api/", router);
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use("/media", express.static("media"));

setInterval(() => {
  ExpireVerification();
}, 10000);

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

import express from "express";
import bodyParser from "body-parser";
import { upload } from "../multer/index.js";
import {
  changePassword,
  forgotPassword,
  getEmailVerification,
  getResetToken,
  login,
  postResetToken,
  profile,
  register,
  verifyEmail,
} from "../controller/AuthController.js";
import { Authentication, userData } from "../middleware/index.js";
import {
  deleteUser,
  deleteUserProfile,
  getUser,
  getUserById,
  updateUser,
} from "../controller/UserController.js";
import {
  addStatus,
  deleteStatus,
  getStatus,
  getStatusById,
  updateStatus,
} from "../controller/StatusController.js";
import {
  addCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../controller/CategoryController.js";
import {
  addProperty,
  deleteProperty,
  getProperty,
  getPropertyById,
  getPropertyBySlug,
  updateProperty,
  updatePropertyImages,
} from "../controller/PropertyController.js";
import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  getTeacherById,
  updateTeacher,
} from "../controller/TeachersController.js";
import {
  addReview,
  deleteReview,
  getReview,
  getReviewById,
  getReviewByPropertyId,
  updateReview,
} from "../controller/ReviewsController.js";
import {
  addFaq,
  deleteFaq,
  getFaq,
  getFaqById,
  updateFaq,
} from "../controller/FaqsController.js";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourseById,
  updateCourse,
} from "../controller/CourseController.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
  getGalleryById,
  updateGallery,
} from "../controller/GalleryController.js";
import {
  addSeo,
  deleteSeo,
  getSeo,
  getSeoById,
  updateSeo,
} from "../controller/SeoController.js";
import { addSearch, getSearch } from "../controller/SearchController.js";
import {
  addPropertyCourse,
  deletePropertyCourse,
  getPropertyCourse,
  getPropertyCourseById,
  updatePropertyCourse,
} from "../controller/PropertyCourseController.js";
import {
  addBusinessHours,
  getBusinessHours,
} from "../controller/BusinessHourController.js";
import { getState } from "../controller/StateController.js";
import { getCity } from "../controller/CityController.js";
import { getCountry } from "../controller/CountryController.js";
import {
  addAchievements,
  getAchievementsByPropertyId,
} from "../controller/AchievementsController.js";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Auth Routes//
router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.get("/reset/:token", getResetToken);
router.post("/reset", postResetToken);
router.post("/verify-email", verifyEmail);
router.get("/verify-email/:token", getEmailVerification);

// Profile Route
router.get("/profile", userData, profile);

// User Route
const profileUpload = upload.fields([{ name: "profile", maxCount: 1 }]);
router.get("/users", Authentication, getUser);
router.patch("/user/:uniqueId", profileUpload, updateUser);
router.delete("/user/:uniqueId", deleteUser);
router.delete("/user/profile/:uniqueId", deleteUserProfile);
router.get("/user/:uniqueId", Authentication, getUserById);

// Status Route
router.get("/status", Authentication, getStatus);
router.post("/status", Authentication, addStatus);
router.patch("/status/:uniqueId", Authentication, updateStatus);
router.delete("/status/:uniqueId", Authentication, deleteStatus);
router.get("/status/:uniqueId", Authentication, getStatusById);

// Category Route
const categoryUpload = upload.fields([
  { name: "category_icon", maxCount: 1 },
  { name: "featured_image", maxCount: 1 },
]);
router.get("/category", Authentication, getCategory);
router.post("/category", Authentication, categoryUpload, addCategory);
router.patch(
  "/category/:uniqueId",
  Authentication,
  categoryUpload,
  updateCategory
);
router.delete("/category/:uniqueId", Authentication, deleteCategory);
router.get("/category/:uniqueId", Authentication, getCategoryById);

// Property Route
const propertyUpload = upload.fields([
  { name: "property_icon", maxCount: 1 },
  { name: "featured_image", maxCount: 1 },
]);
router.get("/property", Authentication, getProperty);
router.post("/property", Authentication, propertyUpload, addProperty);
router.patch(
  "/property/:uniqueId",
  Authentication,
  propertyUpload,
  updateProperty
);
router.patch(
  "/property/images/:uniqueId",
  Authentication,
  propertyUpload,
  updatePropertyImages
);
router.delete("/property/:uniqueId", Authentication, deleteProperty);
router.get("/property/:uniqueId", Authentication, getPropertyById);
router.get("/property/:property_slug", Authentication, getPropertyBySlug);

// Teacher Route
const teacherProfile = upload.fields([{ name: "profile", maxCount: 1 }]);
router.get("/teacher", Authentication, getTeacher);
router.post("/teacher", Authentication, teacherProfile, addTeacher);
router.patch(
  "/teacher/:uniqueId",
  Authentication,
  teacherProfile,
  updateTeacher
);
router.delete("/teacher/:uniqueId", Authentication, deleteTeacher);
router.get("/teacher/:uniqueId", Authentication, getTeacherById);

// Review Route
router.get("/review", Authentication, getReview);
router.post("/review", Authentication, addReview);
router.patch("/review/:uniqueId", Authentication, updateReview);
router.delete("/review/:uniqueId", Authentication, deleteReview);
router.get("/review/:uniqueId", Authentication, getReviewById);
router.get(
  "/review/property/:property_id",
  Authentication,
  getReviewByPropertyId
);

// Faqs Route
router.get("/faqs", Authentication, getFaq);
router.post("/faqs", Authentication, addFaq);
router.patch("/faqs/:uniqueId", Authentication, updateFaq);
router.delete("/faqs/:uniqueId", Authentication, deleteFaq);
router.get("/faqs/:uniqueId", Authentication, getFaqById);

// Course Route
const courseUpload = upload.fields([{ name: "image", maxCount: 1 }]);
router.get("/course", Authentication, getCourse);
router.post("/course", Authentication, courseUpload, addCourse);
router.patch("/course/:uniqueId", Authentication, courseUpload, updateCourse);
router.delete("/course/:uniqueId", Authentication, deleteCourse);
router.get("/course/:uniqueId", Authentication, getCourseById);

// Gallery Route
const gallery = upload.fields([{ name: "gallery", maxCount: 4 }]);
const galleryUpdate = upload.fields([{ name: "newImages", maxCount: 4 }]);
router.get("/gallery", Authentication, getGallery);
router.post("/gallery", Authentication, gallery, addGallery);
router.patch(
  "/gallery/:uniqueId",
  Authentication,
  galleryUpdate,
  updateGallery
);
router.delete("/gallery/:uniqueId", Authentication, deleteGallery);
router.get("/gallery/:uniqueId", Authentication, gallery, getGalleryById);

// Seo Route
router.get("/seo", Authentication, getSeo);
router.post("/seo", Authentication, addSeo);
router.patch("/seo/:uniqueId", Authentication, updateSeo);
router.delete("/seo/:uniqueId", Authentication, deleteSeo);
router.get("/seo/:uniqueId", Authentication, getSeoById);

// Search
router.get("/search", Authentication, getSearch);
router.post("/search", Authentication, addSearch);

// Property Course
router.get("/property-course", Authentication, getPropertyCourse);
router.post(
  "/property-course",
  Authentication,
  courseUpload,
  addPropertyCourse
);
router.patch(
  "/property-course/:uniqueId",
  Authentication,
  courseUpload,
  updatePropertyCourse
);
router.get("/property-course/:uniqueId", Authentication, getPropertyCourseById);
router.delete(
  "/property-course/:uniqueId",
  Authentication,
  deletePropertyCourse
);

// Business Hours
router.get("/business-hours", Authentication, getBusinessHours);
router.get("/business-hours/:property_id", Authentication, getBusinessHours);
router.post("/business-hours", Authentication, addBusinessHours);

// Country
router.get("/countries", Authentication, getCountry);

// Statee
router.get("/states", Authentication, getState);

// City
router.get("/cities", Authentication, getCity);

//achievements
const achievements = upload.fields([{ name: "achievements", maxCount: 4 }]);
router.post("/achievements", Authentication, achievements, addAchievements);
router.get(
  "/achievements/:property_id",
  Authentication,
  getAchievementsByPropertyId
);

export default router;

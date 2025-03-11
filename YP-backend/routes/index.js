import express from "express";
import bodyParser from "body-parser";
import { processImage, storage, upload } from "../multer/index.js";
import {
  changePassword,
  forgotPassword,
  getEmailVerification,
  getResetToken,
  getToken,
  login,
  logout,
  postResetToken,
  profile,
  register,
  verifyEmail,
} from "../controller/AuthController.js";
// import { userData } from "../middleware/index.js";
import {
  addNewUser,
  deleteUser,
  deleteUserProfile,
  getUser,
  getUserById,
  updateUser,
  // UpdateUserProfile,
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
  getPropertyByUniqueId,
  updateProperty,
  updatePropertyImages,
} from "../controller/PropertyController.js";
import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  getTeacherById,
  getTeacherByPropertyId,
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
  getFaqByPropertyId,
  updateFaq,
} from "../controller/FaqsController.js";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourseById,
  getCourseByUniqueId,
  updateCourse,
} from "../controller/CourseController.js";
import {
  addGallery,
  deleteGallery,
  getGallery,
  getGalleryById,
  getGalleryByPropertyId,
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
  getPropertyCourseByPropertyId,
  updatePropertyCourse,
} from "../controller/PropertyCourseController.js";
import {
  addBusinessHours,
  changePropertyCategory,
  getBusinessHours,
  getBusinessHoursByPropertyId,
} from "../controller/BusinessHourController.js";
import { getState } from "../controller/StateController.js";
import { getCity } from "../controller/CityController.js";
import { getCountry } from "../controller/CountryController.js";
import {
  addAchievements,
  getAchievementsByPropertyId,
} from "../controller/AchievementsController.js";
import { getPermissions } from "../controller/PermissionsControllers.js";
import {
  addAmenities,
  getAmenities,
  getAmenitiesByPropertyId,
  updateAmenities,
} from "../controller/AmenitesController.js";
import {
  addEnquiry,
  deleteArchiveEnquiry,
  getAllArchiveEnquiry,
  getAllEnquiry,
  getArchiveEnquiryByObjectId,
  getArchiveEnquiryByPropertyId,
  getEnquiryByObjectId,
  getEnquiryByPropertyId,
  softDeleteEnquiry,
} from "../controller/EnqiryControllers.js";

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
router.get("/get-token", getToken);
router.get("/logout", logout);

// Profile Route
router.get("/profile", profile);

// User Route
const profileUpload = upload.fields([{ name: "profile", maxCount: 1 }]);
router.get("/users", getUser);
router.patch("/user/:objectId", profileUpload, processImage, updateUser);
// router.patch(
//   "/user/profile/:objectId",
//   profileUpload,
//   processImage,
//   UpdateUserProfile
// );
router.post("/user/new", addNewUser);
router.delete("/user/:objectId", deleteUser);
router.delete("/user/profile/:uniqueId", deleteUserProfile);
router.get("/user/:objectId", getUserById);
router.get("/permissions", getPermissions);

// Status Route
router.get("/status", getStatus);
router.post("/status", addStatus);
router.patch("/status/:objectId", updateStatus);
router.delete("/status/:objectId", deleteStatus);
router.get("/status/:objectId", getStatusById);

// Course Route
const courseUpload = upload.fields([{ name: "image", maxCount: 1 }]);
router.get("/course", getCourse);
router.post("/course", courseUpload, processImage, addCourse);
router.patch("/course/:uniqueId", courseUpload, processImage, updateCourse);
router.delete("/course/:uniqueId", deleteCourse);
router.get("/course/:objectId", getCourseById);
router.get("/course-detail/:uniqueId", getCourseByUniqueId);

// Category Route
const categoryUpload = upload.fields([
  { name: "category_icon", maxCount: 1 },
  { name: "featured_image", maxCount: 1 },
]);
router.get("/category", getCategory);
router.post("/category", categoryUpload, processImage, addCategory);
router.patch(
  "/category/:objectId",
  categoryUpload,
  processImage,
  updateCategory
);
router.delete("/category/:objectId", deleteCategory);
router.get("/category/:objectId", getCategoryById);

// Property Route
const propertyUpload = upload.fields([
  { name: "property_logo", maxCount: 1 },
  { name: "featured_image", maxCount: 1 },
]);
router.get("/property", getProperty);
router.get("/property/uniqueId/:uniqueId", getPropertyByUniqueId);
router.post("/property", propertyUpload, processImage, addProperty);
router.patch(
  "/property/:objectId",
  propertyUpload,
  processImage,
  updateProperty
);
router.patch(
  "/property/images/:objectId",
  propertyUpload,
  processImage,
  updatePropertyImages
);
router.delete("/property/:objectId", deleteProperty);
router.get("/property/:objectId", getPropertyById);
router.get("/property/:property_slug", getPropertyBySlug);

// Teacher Route
const teacherProfile = upload.fields([{ name: "profile", maxCount: 1 }]);
router.get("/teacher", getTeacher);
router.post("/teacher", teacherProfile, processImage, addTeacher);
router.patch("/teacher/:objectId", teacherProfile, processImage, updateTeacher);
router.delete("/teacher/:objectId", deleteTeacher);
router.get("/teacher/:objectId", getTeacherById);
router.get("/property/teacher/:propertyId", getTeacherByPropertyId);

// Review Route
router.get("/review", getReview);
router.post("/review", addReview);
router.patch("/review/:uniqueId", updateReview);
router.delete("/review/:uniqueId", deleteReview);
router.get("/review/:uniqueId", getReviewById);
router.get("/review/property/:property_id", getReviewByPropertyId);

// Gallery Route
const gallery = upload.fields([{ name: "gallery", maxCount: 8 }]);
const galleryUpdate = upload.fields([{ name: "newImages", maxCount: 8 }]);
router.get("/gallery", getGallery);
router.post("/gallery", gallery, processImage, addGallery);
router.patch("/gallery/:uniqueId", galleryUpdate, processImage, updateGallery);
router.delete("/gallery/:uniqueId", deleteGallery);
router.get("/gallery/:uniqueId", getGalleryById);
router.get("/property/gallery/:propertyId", getGalleryByPropertyId);

// Faqs Route
router.get("/faqs", getFaq);
router.post("/faqs", addFaq);
router.patch("/faqs/:objectId", updateFaq);
router.delete("/faqs/:uniqueId", deleteFaq);
router.get("/faqs/:objectId", getFaqById);
router.get("/property/faq/:propertyId", getFaqByPropertyId);

// Seo Route
router.get("/seo", getSeo);
router.post("/seo", addSeo);
router.patch("/seo/:objectId", updateSeo);
router.delete("/seo/:objectId", deleteSeo);
router.get("/seo/:objectId", getSeoById);

// Search
router.get("/search", getSearch);
router.post("/search", addSearch);

// Property Course
router.get("/property-course", getPropertyCourse);
router.post("/property-course", courseUpload, addPropertyCourse);
router.patch("/property-course/:objectId", courseUpload, updatePropertyCourse);
router.get("/property-course/:objectId", getPropertyCourseById);
router.get(
  "/property/property-course/:propertyId",
  getPropertyCourseByPropertyId
);
router.delete("/property-course/:objectId", deletePropertyCourse);

// Business Hours
router.get("/business-hours", getBusinessHours);
router.get("/business-hours/:property_id", getBusinessHoursByPropertyId);
router.post("/business-hours", addBusinessHours);
router.patch("/business-hours/category", changePropertyCategory);

// Country
router.get("/countries", getCountry);

// Statee
router.get("/states", getState);

// City
router.get("/cities", getCity);

//achievements
const achievements = upload.fields([{ name: "achievements", maxCount: 4 }]);
router.post("/achievements", achievements, processImage, addAchievements);
router.get("/achievements/:property_id", getAchievementsByPropertyId);

router.post("/amenities", addAmenities);
router.get("/amenities", getAmenities);
router.get("/property/amenities/:propertyId", getAmenitiesByPropertyId);
router.put("/amenities/:uniqueId", updateAmenities);

router.post("/add/enquiry", addEnquiry);
router.get("/archive/enquiry", getAllArchiveEnquiry);
router.get("/enquiry", getAllEnquiry);
router.get("/property/enquiry/:property_id", getEnquiryByPropertyId);
router.get(
  "/property/archive/enquiry/:property_id",
  getArchiveEnquiryByPropertyId
);
router.get("/enquiry/:objectId", getEnquiryByObjectId);
router.get("/archive/enquiry/:objectId", getArchiveEnquiryByObjectId);
router.delete("/enquiry/soft/:objectId", softDeleteEnquiry);
router.delete("/archive/enquiry/:objectId", deleteArchiveEnquiry);
export default router;

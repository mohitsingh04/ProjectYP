import express from "express";
import bodyParser from "body-parser";
import {
  categoryUploadMulter,
  courseUploadMulter,
  processImage,
  upload,
  userUpload,
} from "../multer/index.js";
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
  addNewGalleryImages,
  deleteGallery,
  getGallery,
  getGalleryById,
  getGalleryByPropertyId,
  removeGalleryImages,
  updateGallery,
} from "../controller/GalleryController.js";
import {
  addSeo,
  deleteSeo,
  getSeo,
  getSeoById,
  getSeoByPropertyId,
  updateSeo,
} from "../controller/SeoController.js";
import { addSearch, getSearch } from "../controller/SearchController.js";
import {
  addPropertyCourse,
  deletePropertyCourse,
  getPropertyCourse,
  getPropertyCourseById,
  getPropertyCourseByPropertyId,
  getPropertyCourseByUniqueId,
  updatePropertyCourse,
} from "../controller/PropertyCourseController.js";
import {
  addBusinessHours,
  changePropertyCategory,
  getBusinessHours,
  getBusinessHoursByPropertyId,
  updateBusinessHours,
} from "../controller/BusinessHourController.js";
import {
  addAchievements,
  addNewAchievement,
  getAchievementsByPropertyId,
  removeAchievement,
} from "../controller/AchievementsController.js";
import {
  getCity,
  getCountry,
  getPermissions,
  getState,
} from "../controller/ExtraControllers.js";
import {
  addAmenities,
  getAmenities,
  getAmenitiesByPropertyId,
  updateAmenities,
} from "../controller/AmenitesController.js";
import {
  addEnquiry,
  archiveStatus,
  deleteArchiveEnquiry,
  enquiryStatus,
  getAllArchiveEnquiry,
  getAllEnquiry,
  getArchiveEnquiryByObjectId,
  getArchiveEnquiryByPropertyId,
  getEnquiryByObjectId,
  getEnquiryByPropertyId,
  softDeleteEnquiry,
} from "../controller/EnqiryControllers.js";
import {
  getLocation,
  UpdateLocation,
} from "../controller/LocationController.js";
import {
  AddHostel,
  addHostelImages,
  EditHostel,
  getHostelByPropertyId,
  removeHostelImages,
} from "../controller/HostelController.js";

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//? Auth Routes//
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email/:email", verifyEmail);
router.get("/verify-email/:token", getEmailVerification);
router.post("/forgot-password", forgotPassword);
router.get("/reset/:token", getResetToken);
router.post("/reset", postResetToken);
router.get("/profile", profile);
router.get("/logout", logout);
router.post("/change-password", changePassword);
router.get("/get-token", getToken);

//?Extra Routes
router.get("/permissions", getPermissions);
router.get("/cities", getCity);
router.get("/states", getState);
router.get("/countries", getCountry);

//?User Routes
const profileUpload = userUpload.fields([{ name: "profile", maxCount: 1 }]);
router.patch("/user/:objectId", profileUpload, processImage, updateUser);
router.get("/users", getUser);
router.get("/user/:objectId", getUserById);
router.post("/user/new", addNewUser);
router.delete("/user/:objectId", deleteUser);
router.delete("/user/profile/:objectId", deleteUserProfile);

// ?Status Route
router.get("/status", getStatus);
router.get("/status/:objectId", getStatusById);
router.post("/status", addStatus);
router.patch("/status/:objectId", updateStatus);
router.delete("/status/:objectId", deleteStatus);

// ?Course Route
const courseUpload = courseUploadMulter.fields([
  { name: "image", maxCount: 1 },
]);
router.get("/course", getCourse);
router.post("/course", courseUpload, processImage, addCourse);
router.patch("/course/:objectId", courseUpload, processImage, updateCourse);
router.delete("/course/:objectId", deleteCourse);
router.get("/course/:objectId", getCourseById);
router.get("/course-detail/:uniqueId", getCourseByUniqueId);

// ?Category Route
const categoryUpload = categoryUploadMulter.fields([
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

//?Enquiry Route
router.get("/enquiry", getAllEnquiry);
router.delete("/enquiry/soft/:objectId", softDeleteEnquiry);
router.get("/enquiry/:objectId", getEnquiryByObjectId);
router.patch("/enquiry/status/:objectId", enquiryStatus);
router.get("/enquiry/archive/all", getAllArchiveEnquiry);
router.delete("/enquiry/archive/:objectId", deleteArchiveEnquiry);
router.patch("/enquiry/archive/status/:objectId", archiveStatus);
router.post("/add/enquiry", addEnquiry);
router.get("/enquiry/archive/:objectId", getArchiveEnquiryByObjectId);
router.get("/property/enquiry/:property_id", getEnquiryByPropertyId);
router.get(
  "/property/archive/enquiry/:property_id",
  getArchiveEnquiryByPropertyId
);

//? Property Route
const propertyUpload = upload.fields([
  { name: "property_logo", maxCount: 1 },
  { name: "featured_image", maxCount: 1 },
]);
router.get("/property", getProperty);
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
router.get("/property/uniqueId/:uniqueId", getPropertyByUniqueId);
router.get("/property/:objectId", getPropertyById);
router.get("/property/:property_slug", getPropertyBySlug);

//? Location Route
router.patch("/property/location/:property_id", UpdateLocation);
router.get("/property/location/:property_id", getLocation);

//? Teacher Route
const teacherProfile = upload.fields([{ name: "profile", maxCount: 1 }]);
router.get("/teacher", getTeacher);
router.post("/teacher", teacherProfile, processImage, addTeacher);
router.patch("/teacher/:objectId", teacherProfile, processImage, updateTeacher);
router.delete("/teacher/:objectId", deleteTeacher);
router.get("/teacher/:objectId", getTeacherById);
router.get("/teacher/property/:propertyId", getTeacherByPropertyId);

//? Hostel Route
const hostelUpload = upload.fields([{ name: "images", maxCount: 8 }]);
router.post("/hostel", AddHostel);
router.get("/hostel/:property_id", getHostelByPropertyId);
router.patch("/hostel/:uniqueId", EditHostel);
router.patch(
  "/hostel/images/:uniqueId",
  hostelUpload,
  processImage,
  addHostelImages
);
router.post(`/hostel/images/remove/:uniqueId`, removeHostelImages);

//? Review Route
router.get("/review", getReview);
router.post("/review", addReview);
router.patch("/review/:uniqueId", updateReview);
router.delete("/review/:uniqueId", deleteReview);
router.get("/review/:uniqueId", getReviewById);
router.get("/review/property/:property_id", getReviewByPropertyId);

//? Gallery Route
const gallery = upload.fields([{ name: "gallery", maxCount: 8 }]);
const galleryUpdate = upload.fields([{ name: "newImages", maxCount: 8 }]);
router.get("/gallery", getGallery);
router.post("/gallery", gallery, processImage, addGallery);
router.patch("/gallery/:uniqueId", galleryUpdate, processImage, updateGallery);
router.delete("/gallery/:uniqueId", deleteGallery);
router.get("/gallery/:uniqueId", getGalleryById);
router.get("/property/gallery/:propertyId", getGalleryByPropertyId);
router.post(
  "/gallery/add/:uniqueId",
  gallery,
  processImage,
  addNewGalleryImages
);
router.post("/gallery/remove/:uniqueId", removeGalleryImages);

//? Faqs Route
router.get("/faqs", getFaq);
router.post("/faqs", addFaq);
router.patch("/faqs/:uniqueId", updateFaq);
router.delete("/faqs/:uniqueId", deleteFaq);
router.get("/faqs/:uniqueId", getFaqById);
router.get("/property/faq/:propertyId", getFaqByPropertyId);

//? Seo Route
router.get("/seo", getSeo);
router.post("/seo", addSeo);
router.patch("/seo/:objectId", updateSeo);
router.delete("/seo/:objectId", deleteSeo);
router.get("/seo/:objectId", getSeoById);
router.get("/seo/property/:property_id", getSeoByPropertyId);

// Search
router.get("/search", getSearch);
router.post("/search", addSearch);

//? Property Course
router.get("/property-course", getPropertyCourse);
router.post("/property-course", addPropertyCourse);
router.patch("/property-course/:objectId", courseUpload, updatePropertyCourse);
router.get("/property-course/:objectId", getPropertyCourseById);
router.get("/property-course/uniqueId/:uniqueId", getPropertyCourseByUniqueId);
router.get(
  "/property/property-course/:propertyId",
  getPropertyCourseByPropertyId
);
router.delete("/property-course/:objectId", deletePropertyCourse);

//! Business Hours
router.get("/business-hours", getBusinessHours);
router.get("/business-hours/:property_id", getBusinessHoursByPropertyId);
router.post("/business-hours", addBusinessHours);
router.patch("/business-hours/category", changePropertyCategory);
router.patch("/business-hours/:uniqueId", updateBusinessHours);

//?achievements
const achievements = upload.fields([{ name: "achievements", maxCount: 8 }]);
router.post("/achievements", achievements, processImage, addAchievements);
router.post(
  "/achievements/add/:property_id",
  achievements,
  processImage,
  addNewAchievement
);
router.post("/achievements/remove/:property_id", removeAchievement);
router.get("/achievements/:property_id", getAchievementsByPropertyId);

//? amenties
router.post("/amenities", addAmenities);
router.get("/amenities", getAmenities);
router.get("/property/amenities/:propertyId", getAmenitiesByPropertyId);
router.put("/amenities/:uniqueId", updateAmenities);

export default router;

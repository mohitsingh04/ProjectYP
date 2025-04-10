import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const name = Yup.string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .matches(/^\S.*\S$/, "Name cannot start or end with a space")
  .required("Name is required");

const email = Yup.string().email("Invalid email").required("Email is required");

const mobile_no = Yup.string()
  .test("valid-phone", "Invalid phone number", (value) => {
    if (!value) return false;
    const phoneNumber = parsePhoneNumberFromString(`+${value}`);
    return phoneNumber && phoneNumber.isValid();
  })
  .required("Phone number is required");

const password = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .matches(/^\S*$/, "Password cannot contain spaces")
  .required("Password is required");

const confirmPassword = (field = "password") =>
  Yup.string()
    .oneOf([Yup.ref(field), null], "Passwords must match")
    .required("Confirm Password is required");

const role = Yup.string().required("Role is required");

const status = Yup.string().required("Status is required");

const address = Yup.string().required("Address is required");
const pincode = Yup.string().required("Pincode is required");
const state = Yup.string().required("State is required");
const country = Yup.string().required("Country is required");
const city = Yup.string().required("City is required");

export const RegisterValidation = Yup.object({
  name,
  email,
  mobile_no,
  password,
  confirm_password: confirmPassword(),
});

export const LoginValidation = Yup.object({ email, password });

export const EmailValidation = Yup.object({ email });

export const ResetPasswordValidation = Yup.object({
  new_password: password,
  confirm_password: confirmPassword("new_password"),
});

export const EditProfileValidation = Yup.object({
  name,
  email,
  mobile_no,
  address,
  pincode,
  state,
  city,
});

export const ChangePasswordValidation = Yup.object({
  current_password: Yup.string().required("Current password is required"),
  new_password: password,
  confirm_password: confirmPassword("new_password"),
});

export const EditUserValidation = Yup.object({
  name,
  email,
  mobile_no: Yup.string().required("Phone number is required"),
  role,
  status,
});

export const CreateUserValidation = Yup.object({
  name,
  email,
  mobile_no,
  role,
});

export const CreateStatusValidation = Yup.object({
  status_name: Yup.string().required("Status Name is required"),
  parent_status: Yup.string().required("Parent Status is required"),
  description: Yup.string().max(
    200,
    "Description cannot exceed 200 characters"
  ),
});

const duration_value = Yup.number()
  .typeError("Duration must be a number.")
  .required("Course duration is required.")
  .min(0, "Duration cannot be negative.");
const duration_type = Yup.string().required(
  "Course duration type is required."
);
const course_level = Yup.string().required("Course level is required.");

const course_type = Yup.string().required("Course type is required.");
const certification_type = Yup.string().required(
  "Certification type is required."
);
export const EditCourseValidation = Yup.object({
  course_name: name,
  duration_value,
  duration_type,
  course_level,
  status,
  course_type,
  certification_type,
});

export const createCourseValidation = Yup.object({
  course_name: name,
  duration_value,
  duration_type,
  course_level,
  course_type,
  certification_type,
});

const parent_status = Yup.string().required("Please select a parent category");
export const EditCategoryValidation = Yup.object().shape({
  category_name: name,
  parent_category: parent_status,
  status,
});
export const CreateCategoryValidation = Yup.object().shape({
  category_name: name,
  parent_category: parent_status,
});

export const CreatePropertyValidation = Yup.object({
  property_name: name,
  email: email,
  contact: mobile_no,
  category: Yup.string().required("Category is required"),
  property_type: Yup.string().required("Property type is required"),
});

export const faqValidation = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

export const reviewValidation = Yup.object({
  name,
  email,
  phone_number: mobile_no,
  gender: Yup.string().required("Gender is required"),
  review: Yup.string()
    .max(500, "Review must be 500 characters or less")
    .required("Review is required"),
  rating: Yup.number()
    .min(1, "Rating is required")
    .required("Rating is required"),
});

export const seoValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
  meta_description: Yup.string().required("Meta description is required"),
  primary_focus_keyword: Yup.array()
    .min(1, "Select at least one keyword")
    .max(2, "Maximum 2 keywords allowed")
    .required("Primary focus keyword is required"),
  json_schema: Yup.string().required("JSON schema is required"),
});

export const teacherValidation = Yup.object({
  teacher_name: name,
  designation: Yup.string().required("Designation is required"),
  experience_value: Yup.number()
    .typeError("Must be a number")
    .required("Experience value is required")
    .moreThan(0, "Experience must be greater than 0"),
  experience_type: Yup.string()
    .oneOf(["months", "years"], "Invalid experience type")
    .required("Experience type is required"),
});

export const propertyCourseValidation = Yup.object({
  course_type: course_type,
  course_name: name,
  duration_value,
  duration_type,
  course_level,
  certification_type,
});

export const stateValidation = Yup.object({ property_state: state });

export const cityValidation = Yup.object({ property_city: city });

export const countryValidation = Yup.object({ property_country: country });

export const addressValidation = Yup.object({ property_address: address });
export const pincodeValidation = Yup.object({ property_pincode: pincode });
export const hostelValidation = Yup.object({ hostel_name: name });

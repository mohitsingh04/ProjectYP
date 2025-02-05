import React from "react";
import "./index.scss";
import Swal from "sweetalert2";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { accessToken } from "./context/Api";
import App from "./components/app";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Error404 from "../src/components/ErrorPages/ErrorPages/404/404";
import StatusList from "./pages/Status/StatusList";
import CreateStatus from "./pages/Status/CreateStatus";
import EditStatus from "./pages/Status/EditStatus";
import CategoryList from "./pages/Category/CategoryList";
import CreateCategory from "./pages/Category/CreateCategory";
import EditCategory from "./pages/Category/EditCategory";
import PropertyList from "./pages/Property/PropertyList";
import CreateProperty from "./pages/Property/CreateProperty";
import ShowProperty from "./pages/Property/ShowProperty";
import YourComponent from "./pages/Index";
import ForgotPassword from "./pages/Auth/Password/ForgotPassword";
import Enquiry from "./pages/Enquiry/Enquiry";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import ViewCategory from "./pages/Category/ViewCategory";
import ResetPassword from "./pages/Auth/Password/ResetPassword";
import UserList from "./pages/Users/UserList";
import ViewUser from "./pages/Users/ViewUser";
import ViewStatus from "./pages/Status/ViewStatus";
import EditUser from "./pages/Users/EditUser";
import Search from "./Frontend/Home/Search";
import ViewProperty from "./Frontend/Property/ViewProperty";
import EditTeacher from "./pages/Teachers/EditTeacher"
import ViewTeacher from "./pages/Teachers/ViewTeacher";
// import ViewFaqs from "./pages/Faqs/ViewFaq";
import EditFaqs from "./pages/Faqs/EditFaqs";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";
import DataRequest from "./context/DataRequest";
import VerifyEmail from "./pages/Auth/Email/VerifyEmail";
import EmailVerified from "./pages/Auth/Email/EmailVerified";
import EditSeo from "./pages/Seo/EditSeo";
import EditGallery from "./pages/Gallery/EditGallery";
import Home from "./Frontend/Home/Home";
import FrontPropertyList from "./Frontend/Property/PropertyList";
import CourseList from "./pages/Course/CourseList";
import AddCourse from "./pages/Course/AddCourse";
import EditPropertyCourse from "./pages/Course/Property/EditCourse";
import ViewPropertyCourse from "./pages/Course/Property/ViewCourse";
import EditCourse from "./pages/Course/EditCourse";
import ViewCourse from "./pages/Course/ViewCourse";
import AddCourseSeo from "./pages/Course/Seo/AddCourseSeo";
import EditCourseSeo from "./pages/Course/Seo/EditCourseSeo";
import VerificationEmail from "./pages/Auth/Email/VerificationEmail";
import SendVerifyEmail from "./pages/Auth/Email/SendVerifyEmail";

window.Swal = Swal;
const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timeProgressBar: true,
});
window.toast = toast;

function Root() {
  const { User } = DataRequest();
  const { loading } = useSelector((state) => state.alerts);
  const authenticate = accessToken;

  return (
    <>
      <BrowserRouter>
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/search/institute-in-india"
            element={<FrontPropertyList />}
          />
          <Route path="/courses-in-india" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/property/:uniqueId" element={<ViewProperty />} />
          <Route path="/verify-user/:token" element={<VerificationEmail />} />
          <Route
            path="/send/verify-email/success/:email"
            element={<SendVerifyEmail />}
          />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {authenticate ? (
            <>
              {User.role === "Editor" ? (
                <>
                  <Route path="/*" element={<Error404 />} />
                  <Route
                    path="/email-verified/:token"
                    element={<EmailVerified />}
                  />
                  <Route path={`/`} element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path={`/dashboard`} element={<Dashboard />} />
                    <Route
                      path={`/dashboard/status`}
                      element={<StatusList />}
                    />
                    <Route
                      path={`/dashboard/status/add`}
                      element={<CreateStatus />}
                    />
                    <Route
                      path={`/dashboard/status/edit/:uniqueId`}
                      element={<EditStatus />}
                    />
                    <Route
                      path={`/dashboard/status/view/:uniqueId`}
                      element={<ViewStatus />}
                    />
                    <Route
                      path={`/dashboard/category`}
                      element={<CategoryList />}
                    />
                    <Route
                      path={`/dashboard/category/add`}
                      element={<CreateCategory />}
                    />
                    <Route
                      path={`/dashboard/category/edit/:uniqueId`}
                      element={<EditCategory />}
                    />
                    <Route
                      path={`/dashboard/category/view/:uniqueId`}
                      element={<ViewCategory />}
                    />
                    <Route
                      path={`/dashboard/property`}
                      element={<PropertyList />}
                    />
                    <Route
                      path={`/dashboard/property/add`}
                      element={<CreateProperty />}
                    />
                    <Route
                      path={`/dashboard/property/view/:uniqueId`}
                      element={<ShowProperty />}
                    />
                    <Route
                      path={`/dashboard/test/:id`}
                      element={<YourComponent />}
                    />
                    <Route path={`/dashboard/enquiry`} element={<Enquiry />} />
                    <Route
                      path={`/dashboard/my-profile`}
                      element={<Profile />}
                    />
                    <Route
                      path={`/dashboard/edit/my-profile`}
                      element={<EditProfile />}
                    />
                    <Route
                      path={`/dashboard/edit/course/:uniqueId`}
                      element={<EditCourse />}
                    />
                    <Route
                      path={`/dashboard/view/course/:uniqueId`}
                      element={<ViewCourse />}
                    />
                    <Route
                      path={`/dashboard/edit/teacher/:property_name/:uniqueId`}
                      element={<EditTeacher />}
                    />
                    <Route
                      path={`/dashboard/view/teacher/:property_name/:uniqueId`}
                      element={<ViewTeacher />}
                    />
                    <Route
                      path={`/dashboard/edit/faqs/:property_name/:uniqueId`}
                      element={<EditFaqs />}
                    />
                    <Route
                      path={`/dashboard/edit/seo/:property_name/:uniqueId`}
                      element={<EditSeo />}
                    />
                    <Route
                      path={`/dashboard/edit/gallery/:property_name/:uniqueId`}
                      element={<EditGallery />}
                    />
                  </Route>
                </>
              ) : User.role === "User" ? (
                <>
                  <Route path="/*" element={<Error404 />} />
                  <Route
                    path="/email-verified/:token"
                    element={<EmailVerified />}
                  />
                  <Route path={`/`} element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path={`/dashboard`} element={<Dashboard />} />
                    <Route
                      path={`/dashboard/property`}
                      element={<PropertyList />}
                    />
                    <Route
                      path={`/dashboard/property/add`}
                      element={<CreateProperty />}
                    />
                    <Route
                      path={`/dashboard/property/view/:uniqueId`}
                      element={<ShowProperty />}
                    />
                    <Route
                      path={`/dashboard/test/:id`}
                      element={<YourComponent />}
                    />
                    <Route path={`/dashboard/enquiry`} element={<Enquiry />} />
                    <Route
                      path={`/dashboard/edit/teacher/:property_name/:uniqueId`}
                      element={<EditTeacher />}
                    />
                    <Route
                      path={`/dashboard/view/teacher/:property_name/:uniqueId`}
                      element={<ViewTeacher />}
                    />
                    <Route
                      path={`/dashboard/my-profile`}
                      element={<Profile />}
                    />
                    <Route
                      path={`/dashboard/edit/my-profile`}
                      element={<EditProfile />}
                    />
                    <Route
                      path={`/dashboard/edit/seo/:property_name/:uniqueId`}
                      element={<EditSeo />}
                    />
                    <Route
                      path={`/dashboard/edit/faqs/:property_name/:uniqueId`}
                      element={<EditFaqs />}
                    />
                    <Route
                      path={`/dashboard/edit/gallery/:property_name/:uniqueId`}
                      element={<EditGallery />}
                    />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="/*" element={<Error404 />} />
                  <Route
                    path="/email-verified/:token"
                    element={<VerifyEmail />}
                  />
                  <Route path={`/dashboard/search`} element={<Search />} />
                  <Route path={`/`} element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path={`/dashboard`} element={<Dashboard />} />
                    <Route
                      path={`/dashboard/status`}
                      element={<StatusList />}
                    />
                    <Route
                      path={`/dashboard/status/add`}
                      element={<CreateStatus />}
                    />
                    <Route
                      path={`/dashboard/status/edit/:uniqueId`}
                      element={<EditStatus />}
                    />
                    <Route
                      path={`/dashboard/status/view/:uniqueId`}
                      element={<ViewStatus />}
                    />
                    <Route
                      path={`/dashboard/category`}
                      element={<CategoryList />}
                    />
                    <Route
                      path={`/dashboard/category/add`}
                      element={<CreateCategory />}
                    />
                    <Route
                      path={`/dashboard/category/edit/:uniqueId`}
                      element={<EditCategory />}
                    />
                    <Route
                      path={`/dashboard/category/view/:uniqueId`}
                      element={<ViewCategory />}
                    />
                    <Route
                      path={`/dashboard/property`}
                      element={<PropertyList />}
                    />
                    <Route
                      path={`/dashboard/property/add`}
                      element={<CreateProperty />}
                    />
                    <Route
                      path={`/dashboard/property/view/:uniqueId`}
                      element={<ShowProperty />}
                    />
                    <Route
                      path={`/dashboard/test/:id`}
                      element={<YourComponent />}
                    />
                    <Route path={`/dashboard/enquiry`} element={<Enquiry />} />
                    <Route
                      path={`/dashboard/my-profile`}
                      element={<Profile />}
                    />
                    <Route
                      path={`/dashboard/edit/my-profile`}
                      element={<EditProfile />}
                    />
                    <Route path={`/dashboard/user`} element={<UserList />} />
                    <Route
                      path={`/dashboard/user/view/:uniqueId`}
                      element={<ViewUser />}
                    />
                    <Route
                      path={`/dashboard/user/edit/:uniqueId`}
                      element={<EditUser />}
                    />
                    <Route
                      path={`/dashboard/edit/course/:property_name/:uniqueId`}
                      element={<EditPropertyCourse />}
                    />
                    <Route
                      path={`/dashboard/view/course/:property_name/:uniqueId`}
                      element={<ViewPropertyCourse />}
                    />
                    <Route
                      path={`/dashboard/edit/teacher/:property_name/:uniqueId`}
                      element={<EditTeacher />}
                    />
                    <Route
                      path={`/dashboard/view/teacher/:property_name/:uniqueId`}
                      element={<ViewTeacher />}
                    />
                    <Route
                      path={`/dashboard/edit/faqs/:property_name/:uniqueId`}
                      element={<EditFaqs />}
                    />
                    <Route
                      path={`/dashboard/edit/seo/:property_name/:uniqueId`}
                      element={<EditSeo />}
                    />
                    <Route
                      path={`/dashboard/edit/gallery/:property_name/:uniqueId`}
                      element={<EditGallery />}
                    />
                    <Route
                      path={`/dashboard/course`}
                      element={<CourseList />}
                    />
                    <Route
                      path={`/dashboard/course/add`}
                      element={<AddCourse />}
                    />
                    <Route
                      path={`/dashboard/course/edit/:uniqueId`}
                      element={<EditCourse />}
                    />
                    <Route
                      path={`/dashboard/course/view/:uniqueId`}
                      element={<ViewCourse />}
                    />
                    <Route
                      path={`/dashboard/course-seo/add/:uniqueId`}
                      element={<AddCourseSeo />}
                    />
                    <Route
                      path={`/dashboard/course-seo/edit/:uniqueId`}
                      element={<EditCourseSeo />}
                    />
                  </Route>
                </>
              )}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace="true" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Root;

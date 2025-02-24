import React from "react";
import "./index.scss";
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from "sweetalert2";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
// import Search from "./Frontend/Home/Search";
// import ViewProperty from "./Frontend/Property/ViewProperty";
import EditTeacher from "./pages/Teachers/EditTeacher";
import ViewTeacher from "./pages/Teachers/ViewTeacher";
// import ViewFaqs from "./pages/Faqs/ViewFaq";
import EditFaqs from "./pages/Faqs/EditFaqs";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/Auth/Email/VerifyEmail";
import EmailVerified from "./pages/Auth/Email/EmailVerified";
import EditSeo from "./pages/Seo/EditSeo";
import EditGallery from "./pages/Gallery/EditGallery";
import Home from "./Frontend/Home/Home";
// import FrontPropertyList from "./Frontend/Property/PropertyList";
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
import ProtectedRoutes from "./helper/ProtectedRoutes/ProtectedRoutes";
import CreateUser from "./pages/Users/CreateUser";

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
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {/* {loading && <Loader />} */}
        <ToastContainer />
        <Routes>
          {/* <Route path="/search" element={<Search />} /> */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/search/institute-in-india"element={<FrontPropertyList />}/> */}
          {/* <Route path="/courses-in-india" element={<Home />} /> */}

          {/* non Login Paths */}
          <Route path="/login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
          <Route path="/register" element={<ProtectedRoutes><Register /></ProtectedRoutes>} />
          <Route path="/send/verify-email/success/:email"element={<SendVerifyEmail />}/>
          <Route path="/verify-email" element={<ProtectedRoutes><VerifyEmail /></ProtectedRoutes>} />
          <Route path="/verify-user/:token" element={<ProtectedRoutes><VerificationEmail /></ProtectedRoutes>} />
          <Route path="/forgot-password" element={<ProtectedRoutes><ForgotPassword /></ProtectedRoutes>} />
          <Route path="/reset/:token" element={<ProtectedRoutes><ResetPassword /></ProtectedRoutes>} />
          <Route path="/email-verified/:token" element={<ProtectedRoutes><EmailVerified /></ProtectedRoutes>} />

          {/* Unkown */}
          {/* <Route path="/property/:uniqueId" element={<ViewProperty />} /> */}

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<App />}>
            <Route index element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>

            <Route path={`/dashboard/user`} element={<ProtectedRoutes><UserList /></ProtectedRoutes>} />
            <Route path={`/dashboard/user/add`}element={<ProtectedRoutes><CreateUser/></ProtectedRoutes>}/>
            <Route path={`/dashboard/user/view/:objectId`}element={<ProtectedRoutes><ViewUser /></ProtectedRoutes>}/>
            <Route path={`/dashboard/user/edit/:objectId`}element={<ProtectedRoutes><EditUser /></ProtectedRoutes>}/>

            <Route path={`/dashboard/status`}element={<ProtectedRoutes><StatusList /></ProtectedRoutes>}/>
            <Route path={`/dashboard/status/add`}element={<ProtectedRoutes><CreateStatus /></ProtectedRoutes>}/>
            <Route path={`/dashboard/status/edit/:objectId`}element={<ProtectedRoutes><EditStatus /></ProtectedRoutes>}/>
            <Route path={`/dashboard/status/view/:objectId`}element={<ProtectedRoutes><ViewStatus /></ProtectedRoutes>}/>

            <Route path={`/dashboard/course`}element={<ProtectedRoutes><CourseList /></ProtectedRoutes>}/>
            <Route path={`/dashboard/course/add`}element={<ProtectedRoutes><AddCourse /></ProtectedRoutes>}/>
            <Route path={`/dashboard/course/view/:objectId`} element={<ProtectedRoutes><ViewCourse/></ProtectedRoutes>}/>
            <Route path={`/dashboard/course/edit/:objectId`} element={<ProtectedRoutes><EditCourse/></ProtectedRoutes>} />
            
            <Route path={`/dashboard/category`}element={<ProtectedRoutes><CategoryList /></ProtectedRoutes>}/>
            <Route path={`/dashboard/category/add`}element={<ProtectedRoutes><CreateCategory /></ProtectedRoutes>}/>
            <Route path={`/dashboard/category/edit/:objectId`}element={<ProtectedRoutes><EditCategory /></ProtectedRoutes>}/>
            <Route path={`/dashboard/category/view/:objectId`}element={<ProtectedRoutes><ViewCategory /></ProtectedRoutes>}/>

            <Route path={`/dashboard/property`} element={<ProtectedRoutes><PropertyList /></ProtectedRoutes>} />
            <Route path={`/dashboard/property/add`}element={<ProtectedRoutes><CreateProperty /></ProtectedRoutes>}/>
            <Route path={`/dashboard/property/view/:objectId`}element={<ProtectedRoutes><ShowProperty /></ProtectedRoutes>}/>
            
            <Route path={`/dashboard/edit/teacher/:property_name/:objectId`}element={<ProtectedRoutes><EditTeacher /></ProtectedRoutes>}/>
            <Route path={`/dashboard/view/teacher/:property_name/:objectId`}element={<ProtectedRoutes><ViewTeacher /></ProtectedRoutes>}/>

            <Route path={`/dashboard/edit/faqs/:property_name/:objectId`}element={<ProtectedRoutes><EditFaqs /></ProtectedRoutes>}/>

            <Route path={`/dashboard/edit/course/:property_name/:objectId`}element={<ProtectedRoutes><EditPropertyCourse /></ProtectedRoutes>}/>
            <Route path={`/dashboard/view/course/:property_name/:objectId`}element={<ProtectedRoutes><ViewPropertyCourse /></ProtectedRoutes>}/>

            <Route path={`/dashboard/test/:id`} element={<ProtectedRoutes><YourComponent /></ProtectedRoutes>} />
            <Route path={`/dashboard/enquiry`} element={<ProtectedRoutes><Enquiry /></ProtectedRoutes>} />
            <Route path={`/dashboard/my-profile`} element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path={`/dashboard/edit/my-profile`}element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>}/>
            <Route path={`/dashboard/edit/gallery/:property_name/:uniqueId`}element={<ProtectedRoutes><EditGallery /></ProtectedRoutes>}/>

            <Route path={`/dashboard/edit/seo/:property_name/:objectId`}element={<ProtectedRoutes><EditSeo /></ProtectedRoutes>}/>

            <Route path={`/dashboard/course-seo/add/:uniqueId`} element={<ProtectedRoutes><AddCourseSeo /></ProtectedRoutes>}/>
            <Route path={`/dashboard/course-seo/edit/:uniqueId`} element={<ProtectedRoutes><EditCourseSeo /></ProtectedRoutes>}/>
          </Route>
            <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Root;

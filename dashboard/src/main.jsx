import { Fragment } from "react";
import ReactDOM from "react-dom/client";
// import { Routedata } from "./common/Routedata";
import "react-loading-skeleton/dist/skeleton.css";

import "./index.scss";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scrolltotop from "./Scrolltotop";
import Dashboard from "./components/Dashboard";
import Lockscreen from "./components/authentication/Lockscreen";

import Underconstruction from "./components/authentication/Underconstruction";
import Error400 from "./components/authentication/errorpages/Error400";
import Error401 from "./components/authentication/errorpages/Error401";
import Error403 from "./components/authentication/errorpages/Error403";
import Error404 from "./components/authentication/errorpages/Error404";
import Error500 from "./components/authentication/errorpages/Error500";
import Error503 from "./components/authentication/errorpages/Error503";

// import Firebasesignin from "./common/firebase/Firebasesignin";
// import Firebasesignup from "./common/firebase/Firebasesignup";
// import Firebasereset from "./common/firebase/Firebasereset";

import App from "./layouts/App";
import Custompage from "./layouts/Custompage";
import ProtectedRoutes from "./context/ProtectedRoutes";

import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Forgotpassword from "./pages/Authentication/Forgotpassword";
import VerifyEmailSwal from "./pages/Authentication/verifyEmailSwal";
import VerifyEmailConfirm from "./pages/Authentication/VerifyEmailConfirm";
import ForgotpasswordSwal from "./pages/Authentication/ForgotPasswordSwal";
import ResetPassword from "./pages/Authentication/ResetPassword";

import Profile from "./pages/Profile/Profile";
import Editprofile from "./pages/Profile/Editprofile";

import Userlist from "./pages/Users/Userlist";
import ViewUser from "./pages/Users/ViewUser";
import EditUser from "./pages/Users/EditUser";
import CreateUser from "./pages/Users/CreateUser";
import Statuslist from "./pages/Status/StatusList";
import CreateStatus from "./pages/Status/CreateStatus";
import EditStatus from "./pages/Status/EditStatus";
import ViewStatus from "./pages/Status/ViewStatus";
import Courselist from "./pages/Courses/Courselist";
import ViewCourse from "./pages/Courses/ViewCourse";
import EditCourse from "./pages/Courses/EditCourse";
import CreateCourse from "./pages/Courses/CreateCourse";
import CategoryList from "./pages/Category/Categorylist";
import EditCategory from "./pages/Category/EditCategory";
import CreateCategory from "./pages/Category/CreateCategory";
import ViewCategory from "./pages/Category/ViewCategory";
import Enquiry from "./pages/Enquiry/Enquiry";
import ViewEnquiry from "./pages/Enquiry/ViewEnquiry";
import ArchiveEnquiry from "./pages/Enquiry/ArchiveEnquiry";
import ViewArchive from "./pages/Enquiry/ViewArchive";
import CreateProperty from "./pages/Property/CreateProperty";
import PropertyList from "./pages/Property/PropertyList";
// import ViewProfileSkeleton from "./components/Skeletons/ViewProfileSkeleton";
import DataTableSkeleton from "./components/Skeletons/DataTableSkeleton";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import ViewProperty from "./pages/Property/ViewProperty";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Fragment>
    <HelmetProvider>
      <BrowserRouter>
        <Scrolltotop />
        <Routes>
          {/* //firebase authentication */}
          <Route path={`/`} element={<Custompage />}>
            {/* <Route index element={<Firebasesignin />} />

            <Route path={`${import.meta.env.BASE_URL}firebase/firebasesignin`} element={<Firebasesignin />} />
            <Route path={`${import.meta.env.BASE_URL}firebase/firebasesignup`} element={<Firebasesignup />} />
            <Route path={`${import.meta.env.BASE_URL}firebase/firebasereset`} element={<Firebasereset />} /> */}

            <Route path="*" element={<Error404 />} />

            <Route index element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
            <Route path={`/register`} element={<ProtectedRoutes><Register /></ProtectedRoutes>} />
            <Route path={`/verify-email/send/:email`} element={<ProtectedRoutes><VerifyEmailSwal /></ProtectedRoutes>}/>
            <Route path={`/verify-email/:token`}element={<ProtectedRoutes><VerifyEmailConfirm /></ProtectedRoutes>}/>
            <Route path={`/forgot-password`} element={<ProtectedRoutes><Forgotpassword /></ProtectedRoutes>} />
            <Route path={`/forgot-password/send/:email`}element={<ProtectedRoutes><ForgotpasswordSwal /></ProtectedRoutes>}/>
            <Route path="/reset-password/:token" element={<ProtectedRoutes><ResetPassword /></ProtectedRoutes>} />

            <Route path={`/lockscreen`} element={<Lockscreen />} />
            <Route path={`/underconstruction`}element={<Underconstruction />}/>
            <Route path={`/errorpages/error400`} element={<Error400 />} />
            <Route path={`/errorpages/error401`} element={<Error401 />} />
            <Route path={`/errorpages/error403`} element={<Error403 />} />
            <Route path={`/errorpages/error500`} element={<Error500 />} />
            <Route path={`/errorpages/error503`} element={<Error503 />} />
          </Route>

          {/* //main route */}
          <Route path={`/dashboard`} element={<App />}>
          <Route index element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
          <Route path="/dashboard/extra" element={<DataTableSkeleton/>} />
          <Route path="/dashboard/access-denied" element={<AccessDenied/>} />
            <Route path="/dashboard/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/dashboard/profile/:objectId"element={<ProtectedRoutes><Editprofile /></ProtectedRoutes>}/>

            <Route path="/dashboard/user"element={<ProtectedRoutes><Userlist /></ProtectedRoutes>}/>
            <Route path="/dashboard/user/create"element={<ProtectedRoutes><CreateUser /></ProtectedRoutes>}/>
            <Route path="/dashboard/user/view/:objectId"element={<ProtectedRoutes><ViewUser /></ProtectedRoutes>}/>
            <Route path="/dashboard/user/edit/:objectId"element={<ProtectedRoutes><EditUser /></ProtectedRoutes>}/>

            <Route path="/dashboard/status"element={<ProtectedRoutes><Statuslist /></ProtectedRoutes>}/>
            <Route path="/dashboard/status/create"element={<ProtectedRoutes><CreateStatus /></ProtectedRoutes>}/>
            <Route path="/dashboard/status/view/:objectId"element={<ProtectedRoutes><ViewStatus /></ProtectedRoutes>}/>
            <Route path="/dashboard/status/edit/:objectId"element={<ProtectedRoutes><EditStatus /></ProtectedRoutes>}/>

            <Route path="/dashboard/course"element={<ProtectedRoutes><Courselist /></ProtectedRoutes>}/>
            <Route path="/dashboard/course/create"element={<ProtectedRoutes><CreateCourse /></ProtectedRoutes>}/>
            <Route path="/dashboard/course/view/:objectId"element={<ProtectedRoutes><ViewCourse /></ProtectedRoutes>}/>
            <Route path="/dashboard/course/edit/:objectId"element={<ProtectedRoutes><EditCourse /></ProtectedRoutes>}/>

            <Route path="/dashboard/category"element={<ProtectedRoutes><CategoryList/></ProtectedRoutes>}/>
            <Route path="/dashboard/category/create"element={<ProtectedRoutes><CreateCategory /></ProtectedRoutes>}/>
            <Route path="/dashboard/category/view/:objectId"element={<ProtectedRoutes><ViewCategory /></ProtectedRoutes>}/>
            <Route path="/dashboard/category/edit/:objectId"element={<ProtectedRoutes><EditCategory /></ProtectedRoutes>}/>

            <Route path="/dashboard/property" element={<ProtectedRoutes><PropertyList/></ProtectedRoutes>}/>
            <Route path="/dashboard/property/create" element={<ProtectedRoutes><CreateProperty/></ProtectedRoutes>}/>
            <Route path="/dashboard/property/view/:objectId" element={<ProtectedRoutes><ViewProperty/></ProtectedRoutes>}/>

            <Route path="/dashboard/enquiry" element={<ProtectedRoutes><Enquiry/></ProtectedRoutes>}/>
            <Route path="/dashboard/enquiry/view/:objectId" element={<ProtectedRoutes><ViewEnquiry/></ProtectedRoutes>}/>
            <Route path="/dashboard/enquiry/archive" element={<ProtectedRoutes><ArchiveEnquiry/></ProtectedRoutes>}/>
            <Route path="/dashboard/enquiry/archive/view/:objectId" element={<ProtectedRoutes><ViewArchive/></ProtectedRoutes>}/>

            {/* {Routedata.map((idx) => (
              <Route key={idx.id} path={idx.path} element={idx.element} />
            ))} */}
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);

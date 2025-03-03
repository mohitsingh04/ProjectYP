import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstructorList from "./pages/InstructorList/InstructorList";
import InstructorCourse from "./pages/InstructorCourse/InstructorCourse";
import CourseDetails from "./pages/CourseDeatails/CourseDetails";
import Error404 from "./pages/Error/Error404";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AllBlog from "./pages/Blog/AllBlog";
import ViewBlog from "./pages/Blog/ViewBlog";

function App() {
  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructor-list" element={<InstructorList />} />
          <Route path="/instructor-course" element={<InstructorCourse />} />
          <Route path="/course-detail" element={<CourseDetails />} />
          <Route path="/all-blog" element={<AllBlog />} />
          <Route path="/view-blog" element={<ViewBlog />} />

          <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

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

function App() {
  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructor-list" element={<InstructorList />} />
          <Route path="/instructor-course" element={<InstructorCourse />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

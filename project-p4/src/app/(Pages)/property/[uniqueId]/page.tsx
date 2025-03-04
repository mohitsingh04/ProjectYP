"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import FAQs from "./_propertyComponents/FAQs/FAQs";
import { FaHeart, FaPlay, FaShare, FaStar } from "react-icons/fa";
import PropertyBanner from "./_propertyComponents/PropertyBanner/PropertyBanner";
import Review from "./_propertyComponents/Review/Review";
import Teachers from "./_propertyComponents/Teachers/Teachers";
import CommentsForm from "./_propertyComponents/Comments/CommentsForm";
import BussinessHours from "./_propertyComponents/BussinessHours/BussinessHours";
import { Tab, Tabs } from "react-bootstrap";
import Gallery from "./_propertyComponents/Gallery/Gallery";
import Achievements from "./_propertyComponents/Achievements/Achievements";
import Hostel from "./_propertyComponents/Hostels/Hostel";
import Amenities from "./_propertyComponents/Amenities/Amenities";
import Courses from "./_propertyComponents/Courses/Courses";

interface Property {
  uniqueId: string;
  property_logo?: string[];
  property_name: string;
  property_address: string;
  property_city: string;
  property_pincode: string;
  property_state: string;
  property_description?: string;
  property_hostel_type: string[];
}

export default function CourseDetails() {
  const [property, setProperty] = useState<Property | null>(null);
  const [faqs, setFaqs] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bussinessHours, setBussinessHours] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [courses, setCourses] = useState([]);
  const { uniqueId } = useParams();

  const getProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/uniqueId/${uniqueId}`
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFaqs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/faq/${property?.uniqueId}`
      );
      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/teacher/${property?.uniqueId}`
      );
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    const response = await axios.get(
      `http://localhost:5000/review/property/${property?.uniqueId}`
    );
    setReviews(response.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getBussinessHours = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/business-hours/${property?.uniqueId}`
      );
      setBussinessHours(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGallery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/gallery/${property?.uniqueId}`
      );
      setGallery(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAchievements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/achievements/${property?.uniqueId}`
      );
      setAchievements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAmenities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/amenities/${property?.uniqueId}`
      );
      setAmenities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/property-course/${property?.uniqueId}`
      );
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  useEffect(() => {
    if (property) {
      getFaqs();
      getTeachers();
      getReviews();
      getBussinessHours();
      getGallery();
      getAchievements();
      getAmenities();
      getCourses();
    }
  }, [property]);

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a> */}
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {/* Courses */}
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {/* All Courses */}
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {/* The Complete Web Developer Course 2.0 */}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PropertyBanner property={property} />
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 category-tab">
              <Tabs
                variant="Tabs"
                defaultActiveKey="Overview"
                id=" tab-51"
                className="tab-content tabesbody "
              >
                <Tab eventKey="Overview" title="Overview">
                  <div className="tab-pane show">
                    <div className="card overview-sec">
                      <div className="card-body">
                        <h5 className="subs-title">Property Description</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: property?.property_description ?? "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Faqs" title="Faqs">
                  <div className="card content-sec">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <h5 className="subs-title">Property FAQs</h5>
                        </div>
                        <div className="col-sm-6 text-sm-end">
                          <h6>92 Lectures 10:56:11</h6>
                        </div>
                      </div>
                      {faqs.map((item, index) => (
                        <FAQs key={index} faq={item} />
                      ))}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Review" title="Review">
                  {reviews.map((review, index) => (
                    <div className="card review-sec" key={index}>
                      <Review review={review} />
                    </div>
                  ))}
                </Tab>
                <Tab eventKey="Gallery" title="Gallery">
                  {gallery.map((item, index) => (
                    <Gallery gallery={item} key={index} />
                  ))}
                </Tab>
                <Tab eventKey="Achievements" title="Achievements">
                  <Achievements achievements={achievements} />
                </Tab>
                <Tab eventKey="Hostel" title="Hostel">
                  <Hostel property={property} />
                </Tab>
                <Tab eventKey="Teachers" title="Teachers">
                  {teachers?.map((teacher, index) => (
                    <Teachers teacher={teacher} key={index} />
                  ))}
                </Tab>
                <Tab eventKey="Amenities" title="Amenities">
                  <Amenities amenities={amenities} />
                </Tab>
                <Tab eventKey="Courses" title="Courses">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="subs-title">Courses</h5>
                      <div className="row">
                        {courses.map((course, index) => (
                          <Courses course={course} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="BussinessHours" title="BussinessHours">
                  <BussinessHours bussinessHours={bussinessHours} />
                </Tab>
                <Tab eventKey="CommentsForm" title="Comments Form">
                  <CommentsForm />
                </Tab>
              </Tabs>
            </div>

            <div className="col-lg-4">
              <div className="sidebar-sec">
                <div className="video-sec vid-bg">
                  <div className="card">
                    <div className="card-body">
                      <a
                        href="https://www.youtube.com/embed/1trvO6dqQUI"
                        className="video-thumbnail"
                        data-fancybox=""
                      >
                        <div className="play-icon">
                          <FaPlay />
                        </div>
                        <img className="" src="/img/video.jpg" alt="Img" />
                      </a>
                      <div className="video-details">
                        <div className="course-fee">
                          <h2>FREE</h2>
                          <p>
                            <span>$99.00</span> 50% off
                          </p>
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6">
                            <a
                              href="course-wishlist.html"
                              className="btn btn-wish w-100"
                            >
                              <FaHeart /> Add to Wishlist
                            </a>
                          </div>
                          <div className="col-md-6">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-wish w-100"
                            >
                              <FaShare /> Share
                            </a>
                          </div>
                        </div>
                        <a
                          href="checkout.html"
                          className="btn btn-enroll w-100"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card include-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img
                          src="/img/icon/import.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        11 hours on-demand video
                      </li>
                      <li>
                        <img
                          src="/img/icon/play.svg"
                          className="me-2"
                          alt="Img"
                        />
                        69 downloadable resources
                      </li>
                      <li>
                        <img
                          src="/img/icon/key.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Full lifetime access
                      </li>
                      <li>
                        <img
                          src="/img/icon/mobile.svg"
                          className="me-2"
                          alt="Img"
                        />
                        Access on mobile and TV
                      </li>
                      <li>
                        <img
                          src="/img/icon/cloud.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Assignments
                      </li>
                      <li>
                        <img
                          src="/img/icon/teacher.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Certificate of Completion
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card feature-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img
                          src="/img/user/user2.jpg"
                          className="me-2 img-fluid"
                          alt="Img"
                        />{" "}
                        Enrolled: <span>32 students</span>
                      </li>
                      <li>
                        <img
                          src="/img/icon/timer-icon.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Duration: <span>20 hours</span>
                      </li>
                      <li>
                        <img
                          src="/img/icon/chapter.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Chapters: <span>15</span>
                      </li>
                      <li>
                        <img
                          src="/img/icon/video.svg"
                          className="me-2"
                          alt="Img"
                        />{" "}
                        Video:
                        <span> 12 hours</span>
                      </li>
                      <li>
                        <img
                          src="/img/icon/chart.svg"
                          className="me-2"
                          alt="Img"
                        />
                        Level: <span>Beginner</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

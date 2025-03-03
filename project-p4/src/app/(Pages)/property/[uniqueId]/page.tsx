"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import FAQs from "./_propertyComponents/FAQs";
import { FaHeart, FaPlay, FaShare, FaStar } from "react-icons/fa";
import { RiCornerDownLeftLine } from "react-icons/ri";

interface Property {
  uniqueId: string;
  property_logo?: string[];
  property_name: string;
  property_address: string;
  property_city: string;
  property_pincode: string;
  property_state: string;
  property_decription?: string;
}

export default function CourseDetails() {
  const [property, setProperty] = useState<Property | null>(null);
  const [faqs, setFaqs] = useState([]);
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
    const response = await axios.get(
      `http://localhost:5000/property/faq/${property?.uniqueId}`
    );
    setFaqs(response.data);
  };

  useEffect(() => {
    getProperty();
  }, []);

  useEffect(() => {
    if (property) {
      getFaqs();
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
      <div className="inner-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instructor-wrap border-bottom-0 m-0">
                <div className="about-instructor align-items-center">
                  <div className="abt-instructor-img">
                    <a href="instructor-profile.html">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${property?.property_logo?.[0]}`}
                        alt="img"
                        className="img-fluid"
                      />
                    </a>
                  </div>
                </div>
                <span className="web-badge mb-3">WEB DEVELPMENT</span>
              </div>
              <h2>{property?.property_name}</h2>
              <p>
                {property?.property_address}, {property?.property_city},{" "}
                {property?.property_pincode} ,{property?.property_state}
              </p>
              <div className="rating mb-2">
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star" />
                <span className="d-inline-block average-rating">
                  <span>4.5</span> (15)
                </span>
              </div>
              <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                <div className="cou-info">
                  <img src="/img/icon/icon-01.svg" alt="Img" />
                  <p>12+ Lesson</p>
                </div>
                <div className="cou-info">
                  <img src="/img/icon/timer-icon.svg" alt="Img" />
                  <p>9hr 30min</p>
                </div>
                <div className="cou-info">
                  <img src="/img/icon/people.svg" alt="Img" />
                  <p>32 students enrolled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Overview</h5>
                  <h6>Property Description</h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: property?.property_decription ?? "",
                    }}
                  />
                </div>
              </div>
              <div className="card content-sec">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="subs-title">Course Content</h5>
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
              <div className="card instructor-sec">
                <div className="card-body">
                  <h5 className="subs-title">About the instructor</h5>
                  <div className="instructor-wrap">
                    <div className="about-instructor">
                      <div className="abt-instructor-img">
                        <a href="instructor-profile.html">
                          <img
                            src="/img/user/user2.jpg"
                            alt="img"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="instructor-detail">
                        <h5>
                          <a href="instructor-profile.html">Nicole Brown</a>
                        </h5>
                        <p>UX/UI Designer</p>
                      </div>
                    </div>
                    <div className="rating">
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star" />
                      <span className="d-inline-block average-rating">
                        4.5 Instructor Rating
                      </span>
                    </div>
                  </div>
                  <div className="course-info d-flex align-items-center">
                    <div className="cou-info">
                      <img src="/img/icon/play.svg" alt="Img" />
                      <p>5 Courses</p>
                    </div>
                    <div className="cou-info">
                      <img src="/img/icon/icon-01.svg" alt="Img" />
                      <p>12+ Lesson</p>
                    </div>
                    <div className="cou-info">
                      <img src="/img/icon/timer-icon.svg" alt="Img" />
                      <p>9hr 30min</p>
                    </div>
                    <div className="cou-info">
                      <img src="/img/icon/people.svg" alt="Img" />
                      <p>270,866 students enrolled</p>
                    </div>
                  </div>
                  <p>
                    UI/UX Designer, with 7+ Years Experience. Guarantee of High
                    Quality Work.
                  </p>
                  <p>
                    Skills: Web Design, UI Design, UX/UI Design, Mobile Design,
                    User Interface Design, Sketch, Photoshop, GUI, Html, Css,
                    Grid Systems, Typography, Minimal, Template, English,
                    Bootstrap, Responsive Web Design, Pixel Perfect, Graphic
                    Design, Corporate, Creative, Flat, Luxury and much more.
                  </p>

                  <p>Available for:</p>
                  <ul>
                    <li>1. Full Time Office Work</li>
                    <li>2. Remote Work</li>
                    <li>3. Freelance</li>
                    <li>4. Contract</li>
                    <li>5. Worldwide</li>
                  </ul>
                </div>
              </div>
              <div className="card review-sec">
                <div className="card-body">
                  <h5 className="subs-title">Reviews</h5>
                  <div className="instructor-wrap">
                    <div className="about-instructor">
                      <div className="abt-instructor-img">
                        <a href="instructor-profile.html">
                          <img
                            src="/img/user/user2.jpg"
                            alt="img"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                      <div className="instructor-detail">
                        <h5>
                          <a href="instructor-profile.html">Nicole Brown</a>
                        </h5>
                        <p>UX/UI Designer</p>
                      </div>
                    </div>
                    <div className="rating">
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star filled" />
                      <FaStar className="star" />
                      <span className="d-inline-block average-rating">
                        4.5 Instructor Rating
                      </span>
                    </div>
                  </div>
                  <p className="rev-info">
                    “ This is the second Photoshop course I have completed with
                    Cristian. Worth every penny and recommend it highly. To get
                    the most out of this course, its best to to take the
                    Beginner to Advanced course first. The sound and video
                    quality is of a good standard. Thank you Cristian. “
                  </p>
                  <a href="javascript:void(0);" className="btn btn-reply">
                    <RiCornerDownLeftLine /> Reply
                  </a>
                </div>
              </div>
              <div className="card comment-sec">
                <div className="card-body">
                  <h5 className="subs-title">Post A comment</h5>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-block">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="input-block">
                      <textarea
                        rows={4}
                        className="form-control"
                        placeholder="Your Comments"
                      ></textarea>
                    </div>
                    <div className="submit-section">
                      <button className="btn submit-btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
                          className="me-2"
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

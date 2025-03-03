import React from "react";
import user from "../../img/user/user2.jpg";
import book from "../../img/icon/icon-01.svg";
import clock from "../../img/icon/timer-icon.svg";
import people from "../../img/icon/people.svg";
import play from "../../img/icon/play.svg";
import imp from "../../img/icon/import.svg";
import key from "../../img/icon/key.svg";
import mobile from "../../img/icon/mobile.svg";
import cloud from "../../img/icon/cloud.svg";
import teacher from "../../img/icon/teacher.svg";
import chapter from "../../img/icon/chapter.svg";
import videosvg from "../../img/icon/video.svg";
import chart from "../../img/icon/chart.svg";
import video from "../../img/video.jpg";

export default function CourseDetails() {
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
                      <img src={user} alt="img" className="img-fluid" />
                    </a>
                  </div>
                  <div className="instructor-detail me-3">
                    <h5>
                      <a href="instructor-profile.html">Nicole Brown</a>
                    </h5>
                    <p>UX/UI Designer</p>
                  </div>
                  <div className="rating mb-0">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">
                      <span>4.5</span> (15)
                    </span>
                  </div>
                </div>
                <span className="web-badge mb-3">WEB DEVELPMENT</span>
              </div>
              <h2>The Complete Web Developer Course 2.0</h2>
              <p>
                Learn Web Development by building 25 websites and mobile apps
                using HTML, CSS, Javascript, PHP, Python, MySQL & more!
              </p>
              <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                <div className="cou-info">
                  <img src={book} alt="Img" />
                  <p>12+ Lesson</p>
                </div>
                <div className="cou-info">
                  <img src={clock} alt="Img" />
                  <p>9hr 30min</p>
                </div>
                <div className="cou-info">
                  <img src={people} alt="Img" />
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
                  <h6>Course Description</h6>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                  <p>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>

                  <h6>What you'll learn</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>Become a UX designer.</li>
                        <li>You will be able to add UX designer to your CV</li>
                        <li>Become a UI designer.</li>
                        <li>Build & test a full website design.</li>
                        <li>Build & test a full mobile app.</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>Learn to design websites & mobile phone apps.</li>
                        <li>You'll learn how to choose colors.</li>
                        <li>Prototype your designs with interactions.</li>
                        <li>Export production ready assets.</li>
                        <li>All the techniques used by UX professionals</li>
                      </ul>
                    </div>
                  </div>
                  <h6>Requirements</h6>
                  <ul className="mb-0">
                    <li>
                      You will need a copy of Adobe XD 2019 or above. A free
                      trial can be downloaded from Adobe.
                    </li>
                    <li>No previous design experience is needed.</li>
                    <li className="mb-0">
                      No previous Adobe XD skills are needed.
                    </li>
                  </ul>
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
                  <div className="course-card">
                    <h6 className="cou-title">
                      <a
                        className="collapsed"
                        data-bs-toggle="collapse"
                        href="#collapseOne"
                        aria-expanded="false"
                      >
                        In which areas do you operate?
                      </a>
                    </h6>
                    <div id="collapseOne" className="card-collapse collapse">
                      <ul>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.1 Introduction to the User Experience
                            Course
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.2 Exercise: Your first design challenge
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.5 How to use text layers effectively
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <a
                        className="collapsed"
                        data-bs-toggle="collapse"
                        href="#course2"
                        aria-expanded="false"
                      >
                        The Brief
                      </a>
                    </h6>
                    <div id="course2" className="card-collapse collapse">
                      <ul>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.1 Introduction to the User Experience
                            Course
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.2 Exercise: Your first design challenge
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.5 How to use text layers effectively
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title">
                      <a
                        className="collapsed"
                        data-bs-toggle="collapse"
                        href="#course3"
                        aria-expanded="false"
                      >
                        Wireframing Low Fidelity
                      </a>
                    </h6>
                    <div id="course3" className="card-collapse collapse">
                      <ul>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.1 Introduction to the User Experience
                            Course
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.2 Exercise: Your first design challenge
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture1.5 How to use text layers effectively
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="course-card">
                    <h6 className="cou-title mb-0">
                      <a
                        className="collapsed"
                        data-bs-toggle="collapse"
                        href="#coursefour"
                        aria-expanded="false"
                      >
                        Type, Color & Icon Introduction
                      </a>
                    </h6>
                    <div id="coursefour" className="card-collapse collapse">
                      <ul>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture4.1 Introduction to the User Experience
                            Course
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture4.2 Exercise: Your first design challenge
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture4.3 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture4.4 How to solve the previous exercise
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                        <li>
                          <p>
                            <img src={play} alt="Img" className="me-2" />
                            Lecture4.5 How to use text layers effectively
                          </p>
                          <div>
                            <a href="javascript:void(0);">Preview</a>
                            <span>02:53</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card instructor-sec">
                <div className="card-body">
                  <h5 className="subs-title">About the instructor</h5>
                  <div className="instructor-wrap">
                    <div className="about-instructor">
                      <div className="abt-instructor-img">
                        <a href="instructor-profile.html">
                          <img src={user} alt="img" className="img-fluid" />
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
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        4.5 Instructor Rating
                      </span>
                    </div>
                  </div>
                  <div className="course-info d-flex align-items-center">
                    <div className="cou-info">
                      <img src={play} alt="Img" />
                      <p>5 Courses</p>
                    </div>
                    <div className="cou-info">
                      <img src={book} alt="Img" />
                      <p>12+ Lesson</p>
                    </div>
                    <div className="cou-info">
                      <img src={clock} alt="Img" />
                      <p>9hr 30min</p>
                    </div>
                    <div className="cou-info">
                      <img src={people} alt="Img" />
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
                          <img src={user} alt="img" className="img-fluid" />
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
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
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
                    <i className="feather-corner-up-left"></i> Reply
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
                        rows="4"
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
                          <i className="fa-solid fa-play"></i>
                        </div>
                        <img className="" src={video} alt="Img" />
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
                              <i className="feather-heart"></i> Add to Wishlist
                            </a>
                          </div>
                          <div className="col-md-6">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-wish w-100"
                            >
                              <i className="feather-share-2"></i> Share
                            </a>
                          </div>
                        </div>
                        <a href="checkout.html" className="btn btn-enroll w-100">
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
                        <img src={imp} className="me-2" alt="Img" /> 11 hours
                        on-demand video
                      </li>
                      <li>
                        <img src={play} className="me-2" alt="Img" /> 69
                        downloadable resources
                      </li>
                      <li>
                        <img src={key} className="me-2" alt="Img" /> Full lifetime
                        access
                      </li>
                      <li>
                        <img src={mobile} className="me-2" alt="Img" /> Access on
                        mobile and TV
                      </li>
                      <li>
                        <img src={cloud} className="me-2" alt="Img" /> Assignments
                      </li>
                      <li>
                        <img src={teacher} className="me-2" alt="Img" /> Certificate
                        of Completion
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
                        <img src={user} className="me-2" alt="Img" /> Enrolled:{" "}
                        <span>32 students</span>
                      </li>
                      <li>
                        <img src={clock} className="me-2" alt="Img" /> Duration:{" "}
                        <span>20 hours</span>
                      </li>
                      <li>
                        <img src={chapter} className="me-2" alt="Img" /> Chapters:{" "}
                        <span>15</span>
                      </li>
                      <li>
                        <img src={videosvg} className="me-2" alt="Img" /> Video:
                        <span> 12 hours</span>
                      </li>
                      <li>
                        <img src={chart} className="me-2" alt="Img" />
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

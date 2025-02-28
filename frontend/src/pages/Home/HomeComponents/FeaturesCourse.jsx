import React from "react";
import book from "../../../img/icon/icon-01.svg";
import clock from "../../../img/icon/icon-02.svg";
import course1 from "../../../img/course/course-01.jpg";
import user from "../../../img/user/user1.jpg";

export default function FeaturesCourse() {
  return (
    <section className="section new-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>What’s New</span>
            <h2>Featured Courses</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <a href="course-list.html" className="btn btn-primary">
              All Courses
            </a>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p className="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </p>
        </div>
        <div className="course-feature">
          <div className="row">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="col-lg-4 col-md-6 d-flex">
                <div className="course-box d-flex aos" data-aos="fade-up">
                  <div className="product">
                    <div className="product-img">
                      <a href="course-details.html">
                        <img className="img-fluid" alt="Course" src={course1} />
                      </a>
                      <div className="price">
                        <h3>
                          $300 <span>$99.00</span>
                        </h3>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="course-group d-flex">
                        <div className="course-group-img d-flex">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Instructor" className="img-fluid" />
                          </a>
                          <div className="course-name">
                            <h4>
                              <a href="instructor-profile.html">Nicole Brown</a>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                        <div className="course-share d-flex align-items-center justify-content-center">
                          <a href="#">
                            <i className="fa-regular fa-heart"></i>
                          </a>
                        </div>
                      </div>
                      <h3 className="title instructor-text">
                        <a href="course-details.html">
                          Information About UI/UX Design Degree
                        </a>
                      </h3>
                      <div className="course-info d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img src={book} alt="Lessons" />
                          <p>12+ Lesson</p>
                        </div>
                        <div className="course-view d-flex align-items-center">
                          <img src={clock} alt="Duration" />
                          <p>9hr 30min</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="rating m-0">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            <span>4.0</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <a href="checkout.html" className="btn btn-primary">
                            BUY NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

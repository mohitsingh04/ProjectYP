"use client";
import React from "react";
import dynamic from "next/dynamic";
import trendingCourses from "./JSONS/TC.json";
import instructors from "./JSONS/instructors.json";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

export default function TrendingCourse() {
  const options: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
    lazyLoad: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 3 },
    },
  };

  const options2: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
    lazyLoad: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 4 },
    },
  };

  return (
    <section className="section trend-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>What’s New</span>
            <h2>TRENDING COURSES</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <a href="course-list.html" className="btn btn-primary">
              All Courses
            </a>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p className="mb-0">
            Explore our latest trending courses curated by expert instructors.
          </p>
        </div>
        <div className="owl-theme trending-course">
          <OwlCarousel {...(options as any)}>
            {trendingCourses.map((course) => (
              <div className="item" key={course.id}>
                <div className="course-box trend-box">
                  <div className="product trend-product">
                    <div className="product-img">
                      <a href="course-details.html">
                        <img
                          className="img-fluid"
                          alt="Course"
                          src={course.image}
                        />
                      </a>
                      <div className="price">
                        <h3>
                          {course.price} <span>{course.discountedPrice}</span>
                        </h3>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="course-group d-flex">
                        <div className="course-group-img d-flex">
                          <a href={course.instructor.profileLink}>
                            <img
                              src={course.instructor.profileImage}
                              alt="Instructor"
                              className="img-fluid"
                            />
                          </a>
                          <div className="course-name">
                            <h4>
                              <a href={course.instructor.profileLink}>
                                {course.instructor.name}
                              </a>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="title">
                        <a href="course-details.html">{course.title}</a>
                      </h3>
                      <div className="course-info d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img
                            src="/img/icon/icon-01.svg"
                            alt="Lessons"
                            className="img-fluid"
                          />
                          <p className="text-nowrap">{course.lessons}</p>
                        </div>
                        <div className="course-view d-flex align-items-center">
                          <img
                            src="/img/icon/icon-02.svg"
                            alt="Duration"
                            className="img-fluid"
                          />
                          <p className="text-nowrap">{course.duration}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="rating m-0">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < Math.floor(course.rating) ? "filled" : ""
                              }`}
                            ></i>
                          ))}
                          <span className="d-inline-block average-rating">
                            <span>{course.rating}</span> ({course.reviews})
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
          </OwlCarousel>
        </div>

        <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Featured Instructor</h2>
            </div>
          </div>
          <div className="owl-theme instructors-course">
            <OwlCarousel {...(options2 as any)}>
              {instructors.map((instructor,index) => (
                <div className="instructors-widget" key={index}>
                  <div className="instructors-img">
                    <a href="instructor-list.html">
                      <img
                        className="img-fluid"
                        alt="Instructor"
                        src={instructor.image}
                      />
                    </a>
                  </div>
                  <div className="instructors-content text-center">
                    <h5>
                      <a href="instructor-profile.html">{instructor.name}</a>
                    </h5>
                    <p>{instructor.role}</p>
                    <div className="student-count d-flex justify-content-center">
                      <i className="fa-solid fa-user-group"></i>
                      <span>{instructor.students} Students</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

export default function TrendingCourse() {
  const options: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </p>
        </div>
        <div className="owl-theme trending-course">
          <OwlCarousel {...(options as any)}>
            <div className="item">
              <div className="course-box trend-box">
                <div className="product trend-product">
                  <div className="product-img">
                    <a href="course-details.html">
                      <img
                        className="img-fluid"
                        alt="Img"
                        src="/img/course/course-01.jpg"
                      />
                    </a>
                    <div className="price">
                      <h3>
                        $200 <span>$99.00</span>
                      </h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <a href="instructor-profile.html">
                          <img
                            src="/img/user/user1.jpg"
                            alt="Img"
                            className="img-fluid"
                          />
                        </a>
                        <div className="course-name">
                          <h4>
                            <a href="instructor-profile.html">John Michael</a>
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
                    <h3 className="title">
                      <a href="course-details.html">
                        Learn JavaScript and Express to become a professional
                        JavaScript
                      </a>
                    </h3>
                    <div className="course-info d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img
                          src="/img/icon/icon-01.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <p className="text-nowrap">4+ Lesson</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img
                          src="/img/icon/icon-02.svg"
                          alt="Img"
                          className="img-fluid"
                        />
                        <p className="text-nowrap">1hr 3min</p>
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
          </OwlCarousel>
        </div>

        <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Featured Instructor</h2>
              <div className="section-text aos" data-aos="fade-up">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                  aenean accumsan bibendum gravida maecenas augue elementum et
                  neque. Suspendisse imperdiet.
                </p>
              </div>
            </div>
          </div>
          <div className="owl-theme instructors-course">
            <OwlCarousel {...(options2 as any)}>
              <div className="instructors-widget">
                <div className="instructors-img ">
                  <a href="instructor-list.html">
                    <img
                      className="img-fluid"
                      alt="Img"
                      src="/img/user/user1.jpg"
                    />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="instructor-profile.html">David Lee</a>
                  </h5>
                  <p>Web Developer</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-user-group"></i>
                    <span>50 Students</span>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}

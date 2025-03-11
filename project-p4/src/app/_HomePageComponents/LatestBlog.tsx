"use client";
import React from "react";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});
export default function LatestBlog() {
  const options: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 4,
      },
    },
  };
  return (
    <section className="section latest-blog">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head feature-head text-center mb-0">
            <h2>Latest Blogs</h2>
            <div className="section-text aos" data-aos="fade-up">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                aenean accumsan bibendum gravida maecenas augue elementum et
                neque. Suspendisse imperdiet.
              </p>
            </div>
          </div>
        </div>
        <div className="blogs-slide owl-theme aos" data-aos="fade-up">
          <OwlCarousel {...(options as any)} className="owl-theme">
            {Array(9)
              .fill({})
              .map((_, index) => (
                <div className="item" key={index}>
                  <div className="instructors-widget blog-widget">
                    <div className="instructors-img">
                      <a href="blog-list.html">
                        <img
                          className="img-fluid"
                          alt="Img"
                          style={{ aspectRatio: "4/4", objectFit: "cover" }}
                          src={`/img/blog/blog-0${index + 1}.jpg`}
                        />
                      </a>
                    </div>
                    <div className="instructors-content text-center">
                      <h5>
                        <a href="blog-list.html">
                          Attract More Attention Sales And Profits
                        </a>
                      </h5>
                      <p>Marketing</p>
                      <div className="student-count d-flex justify-content-center">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>Jun {index + 1}, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </OwlCarousel>
        </div>
        <div className="enroll-group aos" data-aos="fade-up">
          <div className="row ">
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img ">
                    <img
                      src="/img/icon/icon-08.svg"
                      alt="Img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">253,085</span>
                  </h3>
                  <p>STUDENTS ENROLLED</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img ">
                    <img
                      src="/img/icon/icon-09.svg"
                      alt="Img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">1,205</span>
                  </h3>
                  <p>TOTAL COURSES</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="total-course d-flex align-items-center">
                <div className="blur-border">
                  <div className="enroll-img ">
                    <img
                      src="/img/icon/icon-10.svg"
                      alt="Img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="course-count">
                  <h3>
                    <span className="counterUp">127</span>
                  </h3>
                  <p>COUNTRIES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lab-course">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>
                Unlimited access to 360+ courses <br />
                and 1,600+ hands-on labs
              </h2>
            </div>
          </div>
          <div className="icon-group aos" data-aos="fade-up">
            <div className="offset-lg-1 col-lg-12">
              <div className="row">
                {Array(10)
                  .fill({})
                  .map((_, index) => (
                    <div className="col-lg-1 col-3" key={index}>
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img
                              src={`/img/icon/icon-${index + 10}.svg`}
                              alt="Img"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

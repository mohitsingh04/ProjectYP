"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function FeaturesCourse() {
  const [courses, setCourses] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/course");
      setCourses(shuffleArray(response.data).slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

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
            {courses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-6 d-flex">
                <div className="course-box d-flex aos" data-aos="fade-up">
                  <div className="product">
                    <div className="product-img">
                      <a href="course-details.html">
                        <img
                          className="img-fluid"
                          alt="Course"
                          src={
                            course?.image?.[0]
                              ? `${process.env.NEXT_PUBLIC_API_URL}${course?.image?.[0]}`
                              : "/img/course/course-01.jpg"
                          }
                        />
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
                          <div className="course-name">
                            <h4>{course?.course_short_name}</h4>
                            <p>{course?.course_type}</p>
                          </div>
                        </div>
                        <div className="course-share d-flex align-items-center justify-content-center">
                          <a href="#">
                            <FaRegHeart className="icon" />
                          </a>
                        </div>
                      </div>
                      <h3 className="title instructor-text">
                        <Link
                          href={`/course/${
                            course?.uniqueId
                          }/${course?.course_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {course?.course_name}
                        </Link>
                      </h3>
                      <div className="course-info d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img src="/img/icon/icon-01.svg" alt="Lessons" />
                          <p>{course?.course_level}</p>
                        </div>
                        <div className="course-view d-flex align-items-center">
                          <img src="/img/icon/icon-02.svg" alt="Duration" />
                          <p>{course?.duration}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="rating m-0">
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaStar className="star filled" />
                          <FaStar className="star" />
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

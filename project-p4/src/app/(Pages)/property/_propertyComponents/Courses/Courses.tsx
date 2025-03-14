"use client";
import API from "@/service/API/API";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Property {
  uniqueId: string;
}

interface Course {
  uniqueId: string;
  image?: string[];
  price: number;
  course_short_name: string;
  course_type: string;
  course_name: string;
  course_level: string;
  duration: string;
}

export default function Courses({ property }: { property: Property | null }) {
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = async () => {
    try {
      const response = await API.get(
        `/property/property-course/${property?.uniqueId}`
      );
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (property) {
      getCourses();
    }
  }, [property]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="subs-title">Courses</h5>
        <div className="row">
          {courses.map((course, index) => (
            <div className="col-md-6 d-flex" key={index}>
              <div className="course-box d-flex aos" data-aos="fade-up">
                <div className="product">
                  <div className="product-img">
                    <Link href={`/course/${course.uniqueId}`}>
                      <img
                        className="img-fluid"
                        alt="Course"
                        src={
                          course.image?.[0]
                            ? `${process.env.NEXT_PUBLIC_API_URL}${course.image[0]}`
                            : "/img/course/course-01.jpg"
                        }
                        style={{ aspectRatio: "4/3", objectFit: "cover" }}
                      />
                    </Link>
                    <div className="price">
                      <h3>
                        ${course.price} <span>${course.price}</span>
                      </h3>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="course-group d-flex">
                      <div className="course-group-img d-flex">
                        <div className="course-name">
                          <h4>{course.course_short_name}</h4>
                          <p>{course.course_type}</p>
                        </div>
                      </div>
                      {/* <div className="course-share d-flex align-items-center justify-content-center">
                        <a href="#">
                          <FaRegHeart className="icon" />
                        </a>
                      </div> */}
                    </div>
                    <h3 className="title instructor-text">
                      <Link
                        href={`/property-course/${
                          course?.uniqueId
                        }/${course?.course_name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {course.course_name}
                      </Link>
                    </h3>
                    <div className="course-info border-0 d-flex align-items-center">
                      <div className="rating-img d-flex align-items-center">
                        <img src="/img/icon/icon-01.svg" alt="Lessons" />
                        <p>{course.course_level}</p>
                      </div>
                      <div className="course-view d-flex align-items-center">
                        <img src="/img/icon/icon-02.svg" alt="Duration" />
                        <p>{course.duration}</p>
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
  );
}

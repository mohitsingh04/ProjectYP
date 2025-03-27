import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

interface Course {
  uniqueId: string;
  course_name: string;
  course_short_name: string;
  course_type: string;
  course_level: string;
  duration: string;
  image?: string[];
}

interface CourseSearchCardProps {
  course: Course;
}

export default function CourseSearchCard({ course }: CourseSearchCardProps) {
  return (
    <div className="col-lg-12 d-flex">
      <div className="instructor-list flex-fill">
        <div className="instructor-img">
          <img
            src={
              course?.image?.[0]
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${course.image[0]}`
                : "/Images/CourseBanner.jpg"
            }
            alt={course?.course_name || "Course Image"}
            style={{ aspectRatio: "1/1", objectFit: "cover" }}
            className="img-fluid"
          />
        </div>
        <div className="instructor-content">
          <div className="d-flex mb-2">
            <div className="align-content-center">
              <h5>
                <Link
                  href={`/course/${course?.uniqueId}/${course?.course_name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {course?.course_name} - [{course.course_short_name}]
                </Link>
              </h5>
              <h6 className="m-0">{course?.course_type}</h6>
            </div>
          </div>
          <div className="instructor-info">
            <div className="rating-img d-flex align-items-center">
              <img src="/img/icon/icon-01.svg" className="me-1" alt="Courses" />
              <p>{course.course_level}</p>
            </div>
            <div className="rating-img d-flex align-items-center">
              <img src="/img/icon/icon-02.svg" className="me-1" alt="Courses" />
              <p>{course.duration}</p>
            </div>
            <a href="#rate" className="rating-count">
              <FaRegHeart />
            </a>
          </div>
          <div className="instructor-badge">
            <span className="web-badge">Course</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";

const courseData = [
  { icon: "/img/pencil-icon.svg", count: 10000, text: "Online Courses" },
  { icon: "/img/cources-icon.svg", count: 200, text: "Expert Tutors" },
  { icon: "/img/certificate-icon.svg", count: 6000, text: "Certified Courses" },
  { icon: "/img/gratuate-icon.svg", count: 60000, text: "Online Students" },
];

export default function StudentCourse() {
  const [counts, setCounts] = useState(courseData.map(() => 0));

  useEffect(() => {
    const duration = 2000;

    const intervals = courseData.map((course, i) => {
      const steps = course.count >= 1000 ? course.count / 1000 : course.count;
      const intervalTime = duration / steps;
      let stepCount = 0;
      const stepValue = course.count / steps;

      return setInterval(() => {
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[i] = Math.min(
            course.count,
            Math.floor(prevCounts[i] + stepValue)
          );
          return newCounts;
        });

        stepCount++;
        if (stepCount >= steps) clearInterval(intervals[i]);
      }, intervalTime);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const formatCount = (num: number): string => {
    return num >= 1000
      ? (num / 1000).toFixed(1).replace(".0", "") + "K"
      : num + "+";
  };

  return (
    <section className="section student-course">
      <div className="container">
        <div className="course-widget">
          <div className="row">
            {courseData.map((course, index) => (
              <div key={index} className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src={course.icon} alt="Img" />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span>{formatCount(counts[index])}</span>
                        </h4>
                        <p>{course.text}</p>
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

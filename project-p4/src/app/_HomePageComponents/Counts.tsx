import React from "react";
import CountUp from "react-countup";

const courseData = [
  { icon: "/img/pencil-icon.svg", count: 15, text: "Courses" },
  { icon: "/img/cources-icon.svg", count: 200, text: "Institutes" },
  { icon: "/img/certificate-icon.svg", count: 10, text: "Certified Courses" },
  { icon: "/img/gratuate-icon.svg", count: 10000, text: "Students" },
];

export default function Counts() {
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
                          <CountUp
                            end={course.count}
                            duration={2}
                            formattingFn={(num) =>
                              num >= 1000
                                ? (num / 1000).toFixed(1).replace(".0", "") +
                                  "K"
                                : num + "+"
                            }
                          />
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

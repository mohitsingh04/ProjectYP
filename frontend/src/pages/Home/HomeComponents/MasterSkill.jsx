import React from "react";
import join from "../../../img/join.png";
import icon from "../../../img/icon/icon-1.svg";

const skillItems = [
  {
    imgSrc: icon,
    text: "Stay motivated with engaging instructors",
  },
  {
    imgSrc: icon,
    text: "Keep up with in the latest in cloud",
  },
  {
    imgSrc: icon,
    text: "Get certified with 100+ certification courses",
  },
  {
    imgSrc: icon,
    text: "Build skills your way, from labs to courses",
  },
];

export default function MasterSkill() {
  return (
    <section className="section master-skill">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head">
                <span>What’s New</span>
                <h2>Master the skills to drive your career</h2>
              </div>
            </div>
            <div className="section-text aos" data-aos="fade-up">
              <p>
                Get certified, master modern tech skills, and level up your
                career — whether you’re starting out or a seasoned pro. 95% of
                eLearning learners report our hands-on content directly helped
                their careers.
              </p>
            </div>
            <div className="career-group aos" data-aos="fade-up">
              <div className="row">
                {skillItems.map((item, index) => (
                  <div key={index} className="col-lg-6 col-md-6 d-flex">
                    <div className="certified-group blur-border d-flex">
                      <div className="get-certified d-flex align-items-center">
                        <div className="blur-box">
                          <div className="certified-img">
                            <img
                              src={item.imgSrc}
                              alt="Img"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 d-flex align-items-end">
            <div className="career-img aos" data-aos="fade-up">
              <img src={join} alt="Img" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import share from "../../../img/share.png";

export default function ShareKnowlegde() {
  return (
    <section className="section share-knowledge">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="knowledge-img aos" data-aos="fade-up">
              <img src={share} alt="Img" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="join-mentor aos" data-aos="fade-up">
              <h2>Want to share your knowledge? Join us a Mentor</h2>
              <p>
                High-definition video is video of higher resolution and quality
                than standard-definition. While there is no standardized meaning
                for high-definition, generally any video.
              </p>
              <ul className="course-list">
                <li>
                  <i className="fa-solid fa-circle-check"></i>Best Courses
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Top rated Instructors
                </li>
              </ul>
              <div className="all-btn all-category d-flex align-items-center">
                <a href="instructor-list.html" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

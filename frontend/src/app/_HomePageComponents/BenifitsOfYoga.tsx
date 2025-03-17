import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function BenifitsOfYoga() {
  const list = [
    "Boosts Flexibility & Strength",
    "Reduces Stress & Anxiety",
    "Enhances Focus & Mental Clarity",
    "Improves Sleep & Heart Health",
    "Supports Digestion & Immunity",
  ];
  return (
    <section className="section share-knowledge">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="knowledge-img aos" data-aos="fade-up">
              <img
                src="/Images/BenifitOfYoga.png"
                alt="Img"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="join-mentor aos" data-aos="fade-up">
              <h2>Benefits of Yoga</h2>
              <p>
                Yoga is a holistic practice that nurtures both the body and
                mind, helping you lead a healthier, more balanced life.
              </p>
              <ul className="course-list">
                {list.map((item, index) => (
                  <li key={index}>
                    <FaCircleCheck className="icon text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="all-btn all-category d-flex align-items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

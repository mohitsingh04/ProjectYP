"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const test = [
    {
      image: "/img/user/user.jpg",
      name: "Aarav Sharma",
      designation: "Yoga Practitioner",
      text: "Signing up for this yoga academy was the best decision I ever made! The classes are well-organized, and the instructors provide amazing guidance. My flexibility, strength, and mindfulness have all improved significantly. Highly recommend!",
    },
    {
      image: "/img/user/user2.jpg",
      name: "Meera Patel",
      designation: "Certified Yoga Instructor",
      text: "The Yoga Alliance-approved training exceeded my expectations. The teachers are highly knowledgeable, compassionate, and truly care about every student's journey. I now feel confident in my practice and have even started teaching!",
    },
    {
      image: "/img/user/user3.jpg",
      name: "Rohan Verma",
      designation: "Wellness Coach",
      text: "I joined the online yoga courses to reduce stress and anxiety, and I couldn't be more satisfied! The breathing and meditation techniques have helped me find inner peace and balance in my life.",
    },
    {
      image: "/img/user/user4.jpg",
      name: "Sanya Kapoor",
      designation: "Fitness Enthusiast",
      text: "The best part of these courses is the flexibility! I could learn at my own pace with expert guidance. Whether you're a beginner or an advanced yogi, this platform is perfect for deepening your yoga practice.",
    },
  ];

  return (
    <>
      <section className="section user-love">
        <div className="container">
          <div className="section-header white-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <span></span>
              <h2>Hear our user experience</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-four">
        <div className="review">
          <div className="container">
            <div className="testi-quotes">
              <img src="/img/qute.png" alt="Img" />
            </div>
            <Slider>
              {test.map((item, index) => (
                <div className="d-flex justify-content-center" key={index}>
                  <div className="testimonial-all d-flex justify-content-center">
                    <div className="testimonial-two-head text-center align-items-center d-flex">
                      <div className="testimonial-four-saying ">
                        <div className="testi-right">
                          <img src="/img/qute-01.png" alt="Img" />
                        </div>
                        <p>{item?.text}</p>
                        <div className="four-testimonial-founder">
                          <div className="fount-about-img">
                            <img
                              src={item?.image}
                              alt="Img"
                              className="img-fluid"
                            />
                          </div>
                          <h3>{item?.name}</h3>
                          <span>{item?.designation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      {/* <section className="section become-instructors aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="student-mentor cube-instuctor ">
                <h4>Become An Instructor</h4>
                <div className="row">
                  <div className="col-lg-7 col-md-12">
                    <div className="top-instructors">
                      <p>
                        Top instructors from around the world teach millions of
                        students on Mentoring.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="mentor-img">
                      <img
                        className="img-fluid"
                        alt="Img"
                        src="/img/icon/become-02.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="student-mentor yellow-mentor">
                <h4>Transform Access To Education</h4>
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="top-instructors">
                      <p>
                        Create an account to receive our newsletter, course
                        recommendations and promotions.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="mentor-img">
                      <img
                        className="img-fluid"
                        alt="Img"
                        src="/img/icon/become-01.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

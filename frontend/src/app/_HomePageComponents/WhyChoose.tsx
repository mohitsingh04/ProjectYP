import React from "react";

const skillItems = [
  {
    imgSrc: "/img/icon/icon-1.svg",
    text: "Expert Instructors: Learn from certified yoga professionals with years of experience.",
  },
  {
    imgSrc: "/img/icon/icon-2.svg",
    text: "Flexible Learning: Access our courses anytime, anywhere.",
  },
  {
    imgSrc: "/img/icon/icon-3.svg",
    text: "Personalized Programs: Find courses designed for all levels, from beginners to advanced practitioners.",
  },
  {
    imgSrc: "/img/icon/icon-4.svg",
    text: "Holistic Approach: Focus on mind, body, and soul with meditation, breathing exercises, and asanas.",
  },
  // {
  //   imgSrc: "/img/icon/icon-4.svg",
  //   text: "Community Support: Join a vibrant community of yoga enthusiasts on the same journey.",
  // },
];

export default function WhyChoose() {
  return (
    <section className="section master-skill">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head">
                {/* <span>What’s New</span> */}
                <h2>Why Choose Our Yoga Courses?</h2>
              </div>
            </div>
            <div className="section-text aos" data-aos="fade-up">
              <p>
                Our carefully crafted programs will allow you to experience yoga
                like never before. Regardless of your level of experience, our
                classes provide the ideal balance of education, adaptability,
                and group support to help you improve in your yoga practice.
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
              <img src="/img/join.png" alt="Img" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

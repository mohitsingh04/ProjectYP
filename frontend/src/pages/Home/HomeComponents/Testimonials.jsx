import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quote1 from "../../../img/qute.png";
import quote2 from "../../../img/qute-01.png";
import user from "../../../img/user/user.jpg";
import become1 from "../../../img/icon/become-01.svg";
import become2 from "../../../img/icon/become-02.svg";

export default function Testimonials() {
  return (
    <>
      <section className="section user-love">
        <div className="container">
          <div className="section-header white-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <span>Check out these real reviews</span>
              <h2>Users-love-us Don't take it from us.</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-four">
        <div className="review">
          <div className="container">
            <div className="testi-quotes">
              <img src={quote1} alt="Img" />
            </div>
            <Slider>
              <div className="d-flex justify-content-center">
                <div className="testimonial-all d-flex justify-content-center">
                  <div className="testimonial-two-head text-center align-items-center d-flex">
                    <div className="testimonial-four-saying ">
                      <div className="testi-right">
                        <img src={quote2} alt="Img" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <div className="four-testimonial-founder">
                        <div className="fount-about-img">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Img" className="img-fluid" />
                          </a>
                        </div>
                        <h3>
                          <a href="instructor-profile.html">Daziy Millar</a>
                        </h3>
                        <span>Founder of Awesomeux Technology</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="testimonial-all d-flex justify-content-center">
                  <div className="testimonial-two-head text-center align-items-center d-flex">
                    <div className="testimonial-four-saying ">
                      <div className="testi-right">
                        <img src={quote2} alt="Img" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <div className="four-testimonial-founder">
                        <div className="fount-about-img">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Img" className="img-fluid" />
                          </a>
                        </div>
                        <h3>
                          <a href="instructor-profile.html">john smith</a>
                        </h3>
                        <span>Founder of Awesomeux Technology</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="testimonial-all d-flex justify-content-center">
                  <div className="testimonial-two-head text-center align-items-center d-flex">
                    <div className="testimonial-four-saying ">
                      <div className="testi-right">
                        <img src={quote2} alt="Img" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <div className="four-testimonial-founder">
                        <div className="fount-about-img">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Img" className="img-fluid" />
                          </a>
                        </div>
                        <h3>
                          <a href="instructor-profile.html">David Lee</a>
                        </h3>
                        <span>Founder of Awesomeux Technology</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      <section className="section become-instructors aos" data-aos="fade-up">
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
                      <img className="img-fluid" alt="Img" src={become2} />
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
                      <img className="img-fluid" alt="Img" src={become1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

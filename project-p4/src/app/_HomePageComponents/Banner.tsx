import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import CountUp from "react-countup";

interface BannerProps {
  setShow: (value: boolean) => void;
}

export default function Banner({ setShow }: BannerProps) {
  return (
    <section className="home-slide d-flex align-items-center">
      <div className="container">
        <div className="row ">
          <div className="col-md-7">
            <div className="home-slide-face aos" data-aos="fade-up">
              <div className="home-slide-text ">
                <h5 className="mt-5">The Leader in Yoga Learning</h5>
                <h1>Your Journey to Wellness Begins Here!</h1>
                <p>
                  Discover the transformative power of yoga with our expertly
                  designed courses.
                </p>
              </div>
              <div className="banner-content">
                <form className="form">
                  <div className="form-inner">
                    <div
                      className="input-group align-items-center"
                      onClick={() => setShow(true)}
                    >
                      <FaMagnifyingGlass className="search-icon" />
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Search School, Online eductional centers, etc"
                        autoComplete="off"
                      />
                      <span className="drop-detail">
                        <select
                          className="form-select select"
                          id="drop-details"
                        >
                          <option>Category</option>
                          <option>Angular</option>
                          <option>Node Js</option>
                          <option>React</option>
                          <option>Python</option>
                        </select>
                      </span>
                      <button className="btn btn-primary sub-btn" type="submit">
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="trust-user mb-5">
                <p>Trusted by over 15K Users worldwide since 2024</p>
                <div className="trust-rating d-flex align-items-center">
                  <div className="rate-head">
                    <h2>
                      <span>
                        <CountUp end={1000} />
                      </span>
                      +
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-center">
            <div className="girl-slide-img aos" data-aos="fade-up">
              <img src="/images/mainBanner.png" alt="Img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

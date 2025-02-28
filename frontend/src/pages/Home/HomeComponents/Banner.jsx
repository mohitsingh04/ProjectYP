import React, { useState, useEffect } from "react";

export default function Banner() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => {
        if (prevNum >= 1000) {
          clearInterval(interval);
          return 1000;
        }
        return prevNum + 1;
      });
    }, 0);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-slide d-flex align-items-center">
      <div className="container">
        <div className="row ">
          <div className="col-md-7">
            <div className="home-slide-face aos" data-aos="fade-up">
              <div className="home-slide-text ">
                <h5>The Leader in Online Learning</h5>
                <h1>Engaging & Accessible Online Courses For All</h1>
                <p>Own your future learning new skills online</p>
              </div>
              <div className="banner-content">
                <form
                  className="form"
                  action="https://dreamslms.dreamstechnologies.com/html/course-list.html"
                >
                  <div className="form-inner">
                    <div className="input-group">
                      <i className="fa-solid fa-magnifying-glass search-icon"></i>
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
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="trust-user">
                <p>
                  Trusted by over 15K Users <br />
                  worldwide since 2024
                </p>
                <div className="trust-rating d-flex align-items-center">
                  <div className="rate-head">
                    <h2>
                      <span>{num}</span>+
                    </h2>
                  </div>
                  <div className="rating d-flex align-items-center">
                    <h2 className="d-inline-block average-rating">4.4</h2>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-center">
            <div className="girl-slide-img aos" data-aos="fade-up">
              <img src={require("../../../img/object.png")} alt="Img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

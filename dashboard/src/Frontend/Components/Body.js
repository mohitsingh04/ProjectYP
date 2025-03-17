import React, { useCallback, useEffect, useState } from "react";
import Logo from "../Assets/image/logo.png";
import YogaImage from "../Assets/image/site/yoga.jpg";
import { API } from "../../context/Api";
// import "../Assets/Css/homeStyle.css";
// import "../Assets/Css/owl.carousel.min.css";
// import "../Assets/Css/owl.theme.default.min.css";

export default function Body() {
  const [property, setProperty] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const getProperty = useCallback(() => {
    API.get("/property").then(({ data }) => {
      setProperty(data);
      setFilterData(data);
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    const result = property.filter((property) => {
      return property.property_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search, property]);

  return (
    <>
      <section id="hero-search">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <img src={Logo} class="brand-logo" alt="Yogprerna" />
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-5 px-1">
                  <h1 class="mt-3 py-3 custom-txt">Easily Find </h1>
                </div>
                <div class="col-md-7 px-1">
                  <div class="text-center">
                    <h2 id="resizing-h3" class="">
                      <span>
                        <div class="stage py-3">
                          <div class="cubespinner">
                            <div class="face1">YOGA INSTITUTE</div>
                            <div class="face2">YOGA COURSES</div>
                            <div class="face3">YOGA TRAINER</div>
                            <div class="face4">JOBS IN YOGA</div>
                          </div>
                        </div>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div class="row" id="main-search-bar">
                <div class="col-md-8 offset-md-2">
                  <div class="input-group bg-white mb-4 border rounded-pill p-1 site-shadow">
                    <input
                      type="search"
                      placeholder="Search Yoga institute, Courses, Trainer, Jobs..."
                      aria-describedby="button-addon3"
                      class="form-control bg-none border-0 rounded-pill"
                      data-toggle="modal"
                      data-target="/searchModal"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div class="input-group-append border-0 mt-1">
                      <button
                        id="button-addon3"
                        type="button"
                        class="btn rounded-pill search-btn"
                      >
                        <i class="fa fa-search"></i>{" "}
                        <span class="hide-sm"> SEARCH </span>
                      </button>
                    </div>
                    {search.length === 0 ? null : (
                      <>
                        <div className="search-list-container">
                          <ul className="search-list">
                            {filterData.map((item) => (
                              <li>
                                <a
                                  className="text-dark"
                                  href={`/dashboard/view/property/${item.uniqueId}`}
                                >
                                  {item.property_name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col text-center">
                  <ul class="list-unstyled list-vertical py-3">
                    <li>
                      <a href="/">Yoga Institute</a>
                    </li>
                    <li>
                      <a href="/">Personnel Yoga Trainer</a>
                    </li>
                    <li>
                      <a href="/">Yoga Courses</a>
                    </li>
                    <li>
                      <a href="/">Find Jobs in yoga</a>
                    </li>
                    <li>
                      <a href="/">Offers</a>
                    </li>
                    <li>
                      <a href="/" class="text-primary">
                        Not Sure?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1 class="site-heading mb-3">
                Yogprerna is the best way to find your Yoga Places
              </h1>
              <p class="site-subheading mb-3">
                If success is a process with a number of defined steps, then it
                is just like any other process.
              </p>
              <p>
                Making a decision to do something – this is the first step. We
                all know that nothing moves until someone makes a decision. The
                first action is always in making the decision to proceed. This
                is a fundamental step, which most people overlook.
              </p>
              <ul class="highlight-points-1">
                <li>
                  Projects & residentials completed in 2020 workers with us{" "}
                </li>
                <li>
                  Building Relationships With Clients All Over The World!{" "}
                </li>
                <li>
                  Offering high quality construction solutions Build Your.{" "}
                </li>
                <li>
                  Building Relationships With Clients All Over The World!{" "}
                </li>
                <li>
                  Offering high quality construction solutions Build Your.{" "}
                </li>
              </ul>
              <a href="/" class="btn site-btn-2 my-3">
                {" "}
                Join Us{" "}
              </a>
            </div>
            <div class="col-md-6">
              <div class="feature-img-1">
                <img src={YogaImage} alt="YogaImage" />
                <div class="feature-text">
                  <h2>2K</h2>
                  <p>Above 200 Yoga Institute</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

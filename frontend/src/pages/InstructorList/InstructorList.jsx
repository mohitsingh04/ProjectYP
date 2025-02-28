import React from "react";
import BreadCrumbs from "./InstructorComponents/BreadCrumbs";
import user from "../../img/user/user4.jpg";
import book from "../../img/icon/icon-01.svg";
import clock from "../../img/icon/icon-02.svg";
import userIcon from "../../img/icon/user-icon.svg";

export default function InstructorList() {
  return (
    <>
      <BreadCrumbs />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="showing-list">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center">
                      <div className="view-icons">
                        <a href="instructor-grid.html" className="grid-view">
                          <i className="fa fa-border-all"></i>
                        </a>
                        <a
                          href="instructor-list.html"
                          className="list-view active"
                        >
                          <i className="fa fa-list"></i>
                        </a>
                      </div>
                      <div className="show-result">
                        <h4>Showing 1-9 of 50 results</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="show-filter add-course-info">
                      <form action="#">
                        <div className="row gx-2 align-items-center">
                          <div className="col-md-6 col-item">
                            <div className="search-group">
                              <i className="fa fa-magnifying-glass"></i>
                              <input
                                type="text"
                                id="search"
                                className="form-control"
                                placeholder="Search our courses"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-item">
                            <div className="input-block select-form mb-0">
                              <select
                                className="form-select select"
                                name="sellist1"
                              >
                                <option>Newly published</option>
                                <option>Angular</option>
                                <option>React</option>
                                <option>Node.js</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {Array(5)
                  .fill({})
                  .map((_, index) => (
                    <div className="col-lg-12 d-flex" key={index}>
                      <div className="instructor-list flex-fill">
                        <div className="instructor-img">
                          <a href="instructor-profile.html">
                            <img className="img-fluid" alt="Img" src={user} />
                          </a>
                        </div>
                        <div className="instructor-content">
                          <h5>
                            <a href="instructor-profile.html">Rolands R</a>
                          </h5>
                          <h6>Instructor</h6>
                          <div className="instructor-info">
                            <div className="rating-img d-flex align-items-center">
                              <img src={book} className="me-1" alt="Img" />
                              <p>12+ Lessons</p>
                            </div>
                            <div className="course-view d-flex align-items-center ms-0">
                              <img src={clock} className="me-1" alt="Img" />
                              <p>9hr 30min</p>
                            </div>
                            <div className="rating-img d-flex align-items-center">
                              <img src={userIcon} className="me-1" alt="Img" />
                              <p>50 Students</p>
                            </div>
                            <div className="rating">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <span className="d-inline-block average-rating">
                                <span>4.0</span> (15)
                              </span>
                            </div>
                            <a href="#rate" className="rating-count">
                              <i className="fa fa-heart"></i>
                            </a>
                          </div>
                          <div className="instructor-badge">
                            <span className="web-badge">Web Design</span>
                            <span className="web-badge">Web Development</span>
                            <span className="web-badge">UI Design</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <ul className="pagination lms-page lms-pagination">
                    <li className="page-item prev">
                      <a
                        className="page-link"
                        href="javascript:void(0);"
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left"></i>
                      </a>
                    </li>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <li
                        key={num}
                        className={`page-item ${num === 1 ? "active" : ""}`}
                      >
                        <a className="page-link" href="javascript:void(0);">
                          {num}
                        </a>
                      </li>
                    ))}
                    <li className="page-item next">
                      <a className="page-link" href="javascript:void(0);">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="filter-clear">
                <div className="clear-filter d-flex align-items-center">
                  <h4>
                    <i className="fa fa-filter"></i> Filters
                  </h4>
                  <div className="clear-text">
                    <p>CLEAR</p>
                  </div>
                </div>

                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Course categories</h4>
                        <i className="fas fa-angle-down"></i>
                      </div>
                      {[
                        { label: "Backend", count: 3 },
                        { label: "CSS", count: 2 },
                        { label: "Frontend", count: 2 },
                        { label: "General", count: 2, checked: true },
                        { label: "IT & Software", count: 2, checked: true },
                        { label: "Photography", count: 2 },
                        { label: "Programming Language", count: 3 },
                        { label: "Technology", count: 2 },
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Instructor</h4>
                        <i className="fas fa-angle-down"></i>
                      </div>
                      {[
                        { label: "Keny White", count: 10 },
                        { label: "Hinta Hyuga", count: 5 },
                        { label: "Frontend", count: 2 },
                        { label: "Johe Doe", count: 2 },
                        { label: "Nicole Brown", count: 0, checked: true },
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Price</h4>
                        <i className="fas fa-angle-down"></i>
                      </div>
                      {[
                        { label: "All", count: 18 },
                        { label: "Free", count: 3 },
                        { label: "Paid", count: 15 },
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

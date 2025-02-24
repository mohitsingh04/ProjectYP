import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

const Sidebar = () => {
  const { User } = DataRequest();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState("");
  const location = useLocation();
  const path = location.pathname;

  function Onhover() {
    if (document.querySelector(".app").classList.contains("sidenav-toggled"))
      document.querySelector(".app").classList.add("sidenav-toggled-open");
  }
  function Outhover() {
    document.querySelector(".app").classList.remove("sidenav-toggled-open");
  }

  const toggleActiveIndex = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (path === "/dashboard/user" || path === "/dashboard/user/add") {
      setIsActive("user");
    } else if (
      path === "/dashboard/status" ||
      path === "/dashboard/status/add"
    ) {
      setIsActive("status");
    } else if (
      path === "/dashboard/course" ||
      path === "/dashboard/course/add"
    ) {
      setIsActive("course");
    } else if (
      path === "/dashboard/category" ||
      path === "/dashboard/category/add"
    ) {
      setIsActive("category");
    } else if (
      path === "/dashboard/property" ||
      path === "/dashboard/property/add"
    ) {
      setIsActive("property");
    } else if (path === "/dashboard/enquiry") {
      setIsActive("enquiry");
    } else {
      setIsActive("");
    }
  }, [path]);

  return (
    <div className="sticky">
      <div className="app-sidebar__overlay"></div>
      <aside
        className="app-sidebar"
        onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}
      >
        {User ? (
          <>
            <Scrollbars>
              <div className="header side-header">
                <Link
                  to={`${process.env.PUBLIC_URL}/dashboard/`}
                  className="header-brand1"
                >
                  <img
                    src={require("../../assets/custom-logo/logo.png")}
                    className="header-brand-img desktop-logo"
                    alt={"logo"}
                  />
                  <img
                    src={require("../../assets/custom-logo/logo2.png")}
                    className="header-brand-img light-logo"
                    alt={"logo-2"}
                  />
                  <img
                    src={require("../../assets/custom-logo/logo.png")}
                    className="header-brand-img light-logo1"
                    alt={"logo-3"}
                  />
                </Link>
              </div>

              <div className="main-sidemenu">
                <div className="slide-left disabled" id="slide-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                  </svg>
                </div>
                <div className="slide-leftRTL disabled" id="slide-leftRTL">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                  </svg>
                </div>
                <ul className="side-menu" id="sidebar-main">
                  <Fragment>
                    {User?.role === "Super Admin" ? <></> : ""}
                    <li className="sub-category">
                      <h3>Main</h3>
                    </li>
                    <li
                      className={`slide ${
                        activeIndex === 0 ? "is-expanded" : ""
                      }`}
                      onClick={() => toggleActiveIndex(0)}
                    >
                      <NavLink to={"/dashboard"} className={`side-menu__item`}>
                        <i className={`side-menu__icon fe fe-home`}></i>
                        <span className="side-menu__label">Dashboard</span>
                      </NavLink>
                    </li>
                    <li className="sub-category">
                      <h3>Pages</h3>
                    </li>
                    {User?.role === "Super Admin" ? (
                      <>
                        <li
                          className={`slide ${
                            activeIndex === 1 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(1)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "user" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-users`}></i>
                            <span className="side-menu__label">Users</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/user"}
                                className="slide-item"
                              >
                                User List
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 2 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(2)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "status" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-cpu`}></i>
                            <span className="side-menu__label">Status</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/status"}
                                className="slide-item"
                              >
                                Status List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/status/add"}
                                className="slide-item"
                              >
                                Add Status
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 3 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(3)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "course" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-database`}></i>
                            <span className="side-menu__label">Course</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/course"}
                                className="slide-item"
                              >
                                Course List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/course/add"}
                                className="slide-item"
                              >
                                Add Course
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 4 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(4)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "category" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-database`}></i>
                            <span className="side-menu__label">Category</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/category"}
                                className="slide-item"
                              >
                                Category List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/category/add"}
                                className="slide-item"
                              >
                                Add Category
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 5 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(5)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "property" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-grid`}></i>
                            <span className="side-menu__label">Property</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/property"}
                                className="slide-item"
                              >
                                Property List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/property/add"}
                                className="slide-item"
                              >
                                Add Property
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 6 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(6)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "enquiry" ? "active" : ""
                            }`}
                          >
                            <i
                              className={`side-menu__icon fe fe-align-justify`}
                            ></i>
                            <span className="side-menu__label">Enquiry</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/enquiry"}
                                className="slide-item"
                              >
                                Enquiry
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : User?.role === "Editor" ? (
                      <>
                        <li
                          className={`slide ${
                            activeIndex === 2 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(2)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "status" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-cpu`}></i>
                            <span className="side-menu__label">Status</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/status"}
                                className="slide-item"
                              >
                                Status List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/status/add"}
                                className="slide-item"
                              >
                                Add Status
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 3 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(3)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "course" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-database`}></i>
                            <span className="side-menu__label">Course</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/course"}
                                className="slide-item"
                              >
                                Course List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/course/add"}
                                className="slide-item"
                              >
                                Add Course
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 4 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(4)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "category" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-database`}></i>
                            <span className="side-menu__label">Category</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/category"}
                                className="slide-item"
                              >
                                Category List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/category/add"}
                                className="slide-item"
                              >
                                Add Category
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 5 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(5)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "property" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-grid`}></i>
                            <span className="side-menu__label">Property</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/property"}
                                className="slide-item"
                              >
                                Property List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/property/add"}
                                className="slide-item"
                              >
                                Add Property
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 6 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(6)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "enquiry" ? "active" : ""
                            }`}
                          >
                            <i
                              className={`side-menu__icon fe fe-align-justify`}
                            ></i>
                            <span className="side-menu__label">Enquiry</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/enquiry"}
                                className="slide-item"
                              >
                                Enquiry
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : User?.role === "Property Manager" ? (
                      <>
                        <li
                          className={`slide ${
                            activeIndex === 5 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(5)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "property" ? "active" : ""
                            }`}
                          >
                            <i className={`side-menu__icon fe fe-grid`}></i>
                            <span className="side-menu__label">Property</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/property"}
                                className="slide-item"
                              >
                                Property List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={"/dashboard/property/add"}
                                className="slide-item"
                              >
                                Add Property
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li
                          className={`slide ${
                            activeIndex === 6 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(6)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "enquiry" ? "active" : ""
                            }`}
                          >
                            <i
                              className={`side-menu__icon fe fe-align-justify`}
                            ></i>
                            <span className="side-menu__label">Enquiry</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/enquiry"}
                                className="slide-item"
                              >
                                Enquiry
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : User?.role === "User" ? (
                      <>
                        {" "}
                        <li
                          className={`slide ${
                            activeIndex === 6 ? "is-expanded" : ""
                          }`}
                          onClick={() => toggleActiveIndex(6)}
                        >
                          <div
                            className={`side-menu__item ${
                              isActive === "enquiry" ? "active" : ""
                            }`}
                          >
                            <i
                              className={`side-menu__icon fe fe-align-justify`}
                            ></i>
                            <span className="side-menu__label">Enquiry</span>
                            <i className={`fa angle fa-angle-right `}></i>
                          </div>
                          <ul className="slide-menu">
                            <li>
                              <NavLink
                                to={"/dashboard/enquiry"}
                                className="slide-item"
                              >
                                Enquiry
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </Fragment>
                </ul>
                <div className="slide-right" id="slide-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                  </svg>
                </div>
                <div className="slide-rightRTL" id="slide-rightRTL">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                  </svg>
                </div>
              </div>
            </Scrollbars>
          </>
        ) : (
          <>
            <div className="p-2">
              <Skeleton height={100} className="w-100 my-2 p-2" count={1} />
              <Skeleton height={20} className="w-100 my-2 p-2" count={15} />
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;

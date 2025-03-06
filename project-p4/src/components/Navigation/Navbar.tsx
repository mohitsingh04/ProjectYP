"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../img/logo.svg";
import { FaSun, FaTimes } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchModal from "./SearchModal";
import Link from "next/link";

export default function Navbar() {
  const [openedMeun, setOpenedMeun] = useState(false);
  const [show, setShow] = useState(false);
  const [openedDropDown, setOpenedDropDown] = useState<number | null>(null);
  const [openedSubDropDown, setOpenedSubDropDown] = useState<number | null>(
    null
  );
  const [scrollBg, setScrollBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      setScrollBg((prev) => {
        return scroll > 50;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${openedMeun ? "menu-opened" : ""}`}>
      <div className="header-fixed">
        <nav
          className={`navbar navbar-expand-lg header-nav scroll-sticky ${
            scrollBg && "add-header-bg"
          }`}
        >
          <div className="container">
            <div className="navbar-header">
              <button
                id="mobile_btn"
                className="btn"
                onClick={() => setOpenedMeun(!openedMeun)}
              >
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <Link href="/" className="navbar-brand logo">
                <Image src={logo} className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link href="/" className="menu-logo">
                  <Image src={logo} className="img-fluid" alt="Logo" />
                </Link>
                <button
                  id="menu_close"
                  className="menu-close btn"
                  onClick={() => setOpenedMeun(!openedMeun)}
                >
                  <FaTimes />
                </button>
              </div>
              <ul className="main-nav">
                <li className="active">
                  <Link href="/" className="submenu">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={`/properties`} className="submenu">
                    Properties
                  </Link>
                </li>
                <li className="has-submenu">
                  <a
                    className="submenu"
                    onClick={() =>
                      setOpenedDropDown(openedDropDown === 2 ? null : 2)
                    }
                  >
                    Student <BiChevronDown size={24} />
                  </a>
                  <ul
                    className={`${openedDropDown === 2 ? "submenu" : ""}`}
                    style={{ display: openedDropDown === 2 ? "block" : "none" }}
                  >
                    <li className="has-submenu">
                      <a
                        onClick={() =>
                          setOpenedSubDropDown(
                            openedSubDropDown === 1 ? null : 1
                          )
                        }
                      >
                        Student
                      </a>
                      <ul
                        className={`${
                          openedSubDropDown === 1 ? "submenu" : ""
                        }`}
                        style={{
                          display: openedSubDropDown === 1 ? "block" : "none",
                        }}
                      >
                        <li>
                          <a href="students-list.html">List</a>
                        </li>
                        <li>
                          <a href="students-grid.html">Grid</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="student-dashboard.html">Student Dashboard</a>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a
                    className="submenu"
                    onClick={() =>
                      setOpenedDropDown(openedDropDown === 3 ? null : 3)
                    }
                  >
                    Pages <BiChevronDown size={24} />
                  </a>
                  <ul
                    className={`${openedDropDown === 3 ? "submenu" : ""}`}
                    style={{ display: openedDropDown === 3 ? "block" : "none" }}
                  >
                    <li>
                      <a href="notifications.html">Notification</a>
                    </li>
                    <li className="has-submenu">
                      <a
                        onClick={() =>
                          setOpenedSubDropDown(
                            openedSubDropDown === 2 ? null : 2
                          )
                        }
                      >
                        Course
                      </a>
                      <ul
                        className={`${
                          openedSubDropDown === 2 ? "submenu" : ""
                        }`}
                        style={{
                          display: openedSubDropDown === 2 ? "block" : "none",
                        }}
                      >
                        <li>
                          <a href="add-course.html">Add Course</a>
                        </li>
                        <li>
                          <a href="course-list.html">Course List</a>
                        </li>
                        <li>
                          <a href="course-grid.html">Course Grid</a>
                        </li>
                        <li>
                          <a href="course-details.html">Course Details</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a
                    className="submenu"
                    onClick={() =>
                      setOpenedDropDown(openedDropDown === 4 ? null : 4)
                    }
                  >
                    Blog <BiChevronDown size={24} />
                  </a>
                  <ul
                    className={`${openedDropDown === 4 ? "submenu" : ""}`}
                    style={{ display: openedDropDown === 4 ? "block" : "none" }}
                  >
                    <li>
                      <a href="blog-list.html">Blog List</a>
                    </li>
                  </ul>
                </li>
                <li className="login-link">
                  <a href="login.html">Login / Signup</a>
                </li>
              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <div>
                  <button
                    id="dark-mode-toggle"
                    className="dark-mode-toggle activate justify-content-center"
                    onClick={() => setShow(!show)}
                  >
                    <FaMagnifyingGlass />
                  </button>
                  <button id="light-mode-toggle" className="dark-mode-toggle ">
                    <FaSun />
                  </button>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link header-sign" href="login.html">
                  Signin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header-login" href="register.html">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={`sidebar-overlay ${openedMeun ? "opened" : ""}`}></div>
      </div>
      <SearchModal show={show} setShow={setShow} />
    </header>
  );
}

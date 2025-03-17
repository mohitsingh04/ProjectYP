"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchModal from "./SearchModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [openedMeun, setOpenedMeun] = useState(false);
  const [show, setShow] = useState(false);
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
                <img
                  src={"/Images/logo.png"}
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link href="/" className="menu-logo">
                  <img
                    src={"/Images/logo.png"}
                    className="img-fluid"
                    alt="Logo"
                  />
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
                <li>
                  <Link href={`/`} className="submenu">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="submenu">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href={`/`} className="submenu">
                    Contact
                  </Link>
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
                </div>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link header-sign" href="login.html">
                  Signin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link header-login" href="register.html">
                  Signup
                </a>
              </li> */}
            </ul>
          </div>
        </nav>
        <div className={`sidebar-overlay ${openedMeun ? "opened" : ""}`}></div>
      </div>
      <SearchModal show={show} setShow={setShow} />
    </header>
  );
}

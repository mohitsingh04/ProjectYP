"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 align-content-center">
              <div className="footer-widget footer-about text-center">
                <div className="footer-logo">
                  <img
                    src={"/Images/logo.png"}
                    className="img-fluid"
                    alt="Logo"
                  />
                </div>
                <div>
                  <p>
                    Stay connected with us for expert-led yoga courses that
                    nurture your body, mind, and soul.
                  </p>
                </div>
                <div>
                  <FaFacebook size={24} className="me-3 text-info" />
                  <FaInstagram size={24} className="me-3 text-primary" />
                  <FaTwitter size={24} className="me-3 text-dark" />
                  <FaYoutube size={24} className="me-3 text-danger" />
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Quick Links</h2>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/properties">Properties</Link>
                  </li>
                  <li>
                    <Link href="/">About Us</Link>
                  </li>
                  <li>
                    <Link href="/">Courses</Link>
                  </li>
                  <li>
                    <Link href="/">Blog</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Useful Links</h2>
                <ul>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/">Disclaimers</Link>
                  </li>
                  <li>
                    <Link href="/">Faqs</Link>
                  </li>
                  <li>
                    <Link href="/">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">News letter</h2>
                <div className="news-letter">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email address"
                      name="email"
                      autoComplete="off"
                    />
                  </form>
                </div>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <img
                      src={"/img/icon/icon-20.svg"}
                      alt="Img"
                      className="img-fluid"
                    />
                    <p>Rishikesh, Dehradun</p>
                  </div>
                  <p>
                    <img
                      src={"/img/icon/icon-19.svg"}
                      alt="Img"
                      className="img-fluid"
                    />
                    <a href="mail:yogprerna@gmail.com" className="__cf_email__">
                      yogprerna@gmail.com
                    </a>
                  </p>
                  <p className="mb-0">
                    <img
                      src={"/img/icon/icon-21.svg"}
                      alt="Img"
                      className="img-fluid"
                    />
                    +91 9027028142
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    &copy; {new Date().getFullYear()} Yogprerna. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

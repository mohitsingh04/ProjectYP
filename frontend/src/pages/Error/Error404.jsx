import React from "react";
import logo from "../../img/logo.svg";
import error from "../../img/error-01.png";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="error-page">
      <div className="error-box">
        <div className="error-logo">
          <a href="index.html">
            <img src={logo} className="img-fluid" alt="Logo" />
          </a>
        </div>
        <div className="error-box-img">
          <img src={error} alt="Img" className="img-fluid" />
        </div>
        <h3 className="h2 mb-3"> Oh No! Error 404</h3>
        <p className="h4 font-weight-normal">
          This page you requested counld not found. May the force be with you!
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

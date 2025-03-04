import React from "react";

export default function BreadCrumbs() {
  return (
    <div className="breadcrumb-bar">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <div className="breadcrumb-list">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item">Pages</li>
                  <li className="breadcrumb-item">Instructors List</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

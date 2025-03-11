import Link from "next/link";
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
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Properties</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

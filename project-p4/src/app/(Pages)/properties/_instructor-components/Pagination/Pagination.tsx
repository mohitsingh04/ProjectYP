import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Pagination({ currentPage, changePage, totalPages }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="pagination lms-page lms-pagination flex-wrap gap-1">
          {currentPage !== 1 && (
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={() => changePage(currentPage - 1)}
              >
                <FaAngleLeft />
              </a>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          {totalPages > 1 && (
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => changePage(currentPage + 1)}
              >
                <FaAngleRight />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

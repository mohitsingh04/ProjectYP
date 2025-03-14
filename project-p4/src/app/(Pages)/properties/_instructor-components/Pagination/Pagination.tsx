import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  changePage,
  totalPages,
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="pagination lms-page lms-pagination flex-wrap gap-1">
          {currentPage !== 1 && (
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
              >
                <FaAngleLeft />
              </button>
            </li>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          {totalPages > 1 && currentPage !== totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
              >
                <FaAngleRight />
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;

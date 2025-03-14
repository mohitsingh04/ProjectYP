import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface SearchPaginationProps {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  changePage,
  totalPages,
}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="pagination lms-page lms-pagination flex-wrap gap-1">
          {currentPage > 1 && (
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage - 1);
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  changePage(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changePage(currentPage + 1);
                }}
              >
                <FaAngleRight />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchPagination;

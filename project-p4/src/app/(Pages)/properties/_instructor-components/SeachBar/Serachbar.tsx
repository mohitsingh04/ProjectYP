import React from "react";
import { FaList } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Serachbar({
  itemsPerPage,
  currentPage,
  filteredProperty,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="d-flex align-items-center">
          <div className="view-icons">
            <a className="list-view active">
              <FaList />
            </a>
          </div>
          <div className="show-result">
            <h4>
              Showing {itemsPerPage * (currentPage - 1) + 1}-
              {Math.min(itemsPerPage * currentPage, filteredProperty?.length)}{" "}
              of {filteredProperty?.length} results
            </h4>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="show-filter add-course-info">
          <form action="#">
            <div className="row gx-2 align-items-center">
              <div className="col-md-6 col-item">
                <div className="search-group">
                  <FaMagnifyingGlass className="icon" />
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith(" ")) return;
                      setSearchQuery(value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6 col-item">
                <div className="input-block select-form mb-0">
                  <select className="form-select select" name="sellist1">
                    <option>Newly published</option>
                    <option>Angular</option>
                    <option>React</option>
                    <option>Node.js</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

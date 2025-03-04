"use client";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./_instructor-components/BreadCrumbs";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaFilter,
  FaList,
} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import PropertyCard from "./_instructor-components/PropertyCards/PropertyCard";

export default function InstructorList() {
  const [property, setProperty] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allCategoires, setAllCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/property`);
      const data = response.data;
      const activeProperties = data.filter((item) => item.status === "Active");

      setProperty(activeProperties);
      setFilteredData(activeProperties);

      const categoryCountMap = activeProperties.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      const categoryObjects = Object.keys(categoryCountMap).map((category) => ({
        label: category,
        count: categoryCountMap[category],
      }));

      setAllCategories(categoryObjects);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allCategoires);

  useEffect(() => {
    getProperty();
  }, []);

  useEffect(() => {
    const filtered = property.filter((item) =>
      item.property_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, property]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <BreadCrumbs />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="showing-list">
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
                          {Math.min(
                            itemsPerPage * currentPage,
                            filteredData.length
                          )}{" "}
                          of {filteredData.length} results
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
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-item">
                            <div className="input-block select-form mb-0">
                              <select
                                className="form-select select"
                                name="sellist1"
                              >
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
              </div>

              <div className="row">
                {paginatedData.map((item, index) => (
                  <PropertyCard property={item} key={index} />
                ))}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <ul className="pagination lms-page lms-pagination flex-wrap gap-1">
                    {currentPage !== 1 && (
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
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
            </div>

            <div className="col-lg-3">
              <div className="filter-clear">
                <div className="clear-filter d-flex align-items-center">
                  <h4>
                    <FaFilter /> Filters
                  </h4>
                  <div className="clear-text">
                    <p>CLEAR</p>
                  </div>
                </div>

                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Property Categories</h4>
                        <FaAngleDown className="icon" />
                      </div>
                      {allCategoires.map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Instructor</h4>
                        <FaAngleDown className="icon" />
                      </div>
                      {[
                        { label: "Keny White", count: 10 },
                        { label: "Hinta Hyuga", count: 5 },
                        { label: "Frontend", count: 2 },
                        { label: "Johe Doe", count: 2 },
                        { label: "Nicole Brown", count: 0, checked: true },
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card search-filter">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Price</h4>
                        <FaAngleDown className="icon" />
                      </div>
                      {[
                        { label: "All", count: 18, checked: true },
                        { label: "Free", count: 3, checked: false },
                        { label: "Paid", count: 15, checked: false },
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="select_specialist"
                              defaultChecked={category.checked}
                            />
                            <span className="checkmark"></span> {category.label}{" "}
                            ({category.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

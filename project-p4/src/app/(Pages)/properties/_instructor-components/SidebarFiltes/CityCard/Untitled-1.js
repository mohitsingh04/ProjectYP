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


                import React from "react";
import { FaList } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Serachbar({
  itemsPerPage,
  currentPage,
  filteredData,
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
              {Math.min(itemsPerPage * currentPage, filteredData?.length)} of{" "}
              {filteredData?.length} results
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
import React from "react";
import { FaAngleDown } from "react-icons/fa";

export default function CategoryCard({
  allCategories,
  setSelectedCategories,
  handleFilterPropertyByCategory,
  selectedCategories,
}) {
  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Property Categories</h4>
            <FaAngleDown className="icon" />
          </div>
          {allCategories.map((category, index) => (
            <div key={index}>
              <label className="custom_check">
                <input
                  type="checkbox"
                  name="select_specialist"
                  value={category.label}
                  onChange={(e) => {
                    setSelectedCategories((prev: string[]) => {
                      const updatedSelection = e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((s) => s !== e.target.value);
                      handleFilterPropertyByCategory(updatedSelection);
                      return updatedSelection;
                    });
                  }}
                  checked={selectedCategories.includes(category.label)}
                />
                <span className="checkmark"></span> {category.label} (
                {category.count})
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { FaAngleDown } from "react-icons/fa";

export default function StatesCard({
  states,
  setSelectedState,
  handleFilterCities,
  selectedState,
}) {
  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>States ({states?.length})</h4>
            <FaAngleDown className="icon" />
          </div>
          <div
            className="overflow-auto"
            style={{ maxHeight: "200px", scrollbarWidth: "thin" }}
          >
            {states.map((state, index) => (
              <div key={index}>
                <label className="custom_check">
                  <input
                    type="checkbox"
                    name="select_specialist"
                    value={state?.label}
                    onChange={(e) => {
                      setSelectedState((prev: string[]) => {
                        const updatedSelection = e.target.checked
                          ? [...prev, e.target.value]
                          : prev.filter((s) => s !== e.target.value);
                        handleFilterCities(updatedSelection);
                        return updatedSelection;
                      });
                    }}
                    checked={selectedState.includes(state.label)}
                  />
                  <span className="checkmark"></span> {state?.label} (
                  {state.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { FaAngleDown } from "react-icons/fa";

export default function CityCard({
  filteredCities,
  handleFilterPropertyByCity,
  setSelectedCity,
  selectedCity,
}) {
  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Cities ({filteredCities?.length})</h4>
            <FaAngleDown className="icon" />
          </div>
          <div
            className="overflow-auto"
            style={{ maxHeight: "200px", scrollbarWidth: "thin" }}
          >
            {filteredCities.map((city, index) => (
              <div key={index}>
                <label className="custom_check">
                  <input
                    type="checkbox"
                    name="select_specialist"
                    value={city?.label}
                    onChange={(e) => {
                      setSelectedCity((prev: string[]) => {
                        const updatedSelection = e.target.checked
                          ? [...prev, e.target.value]
                          : prev.filter((s) => s !== e.target.value);
                        handleFilterPropertyByCity(updatedSelection);
                        return updatedSelection;
                      });
                    }}
                    checked={selectedCity.includes(city.label)}
                  />
                  <span className="checkmark"></span> {city?.label} (
                  {city.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

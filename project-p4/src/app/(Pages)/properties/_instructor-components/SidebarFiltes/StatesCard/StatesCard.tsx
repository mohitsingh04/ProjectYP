import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function StatesCard({
  filteredProperty,
  property,
  selectedState,
  setSelectedState,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Create a state map to store unique states
  const stateMap = {};
  property.forEach((item) => {
    const lowerCaseState = item.property_state.toLowerCase();
    if (!stateMap[lowerCaseState]) {
      stateMap[lowerCaseState] = item.property_state;
    }
  });

  // Count occurrences of states in filteredProperty
  const stateCounts = filteredProperty.reduce((acc, item) => {
    const stateLower = item.property_state.toLowerCase();
    acc[stateLower] = (acc[stateLower] || 0) + 1;
    return acc;
  }, {});

  // Sort states by count (descending) and filter out those with zero count
  const sortedStates = Object.keys(stateCounts)
    .sort((a, b) => stateCounts[b] - stateCounts[a])
    .filter((state) => stateCounts[state] > 0);

  // Apply search filter
  const filteredStates = sortedStates.filter((state) =>
    state.includes(searchQuery.toLowerCase())
  );

  const handleStateChange = (e) => {
    const { value, checked } = e.target;
    setSelectedState((prev) =>
      checked
        ? [...prev, value.toLowerCase()]
        : prev.filter((state) => state !== value.toLowerCase())
    );
  };

  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>States</h4>
            <FaAngleDown className="icon" />
          </div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search State"
            style={{ minHeight: "20px" }}
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              if (!value.startsWith(" ")) {
                setSearchQuery(value);
              }
            }}
          />
          <div
            className="overflow-auto"
            style={{ maxHeight: "150px", scrollbarWidth: "thin" }}
          >
            {filteredStates.length > 0 ? (
              filteredStates.map((state, idx) => (
                <div key={idx}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      name="state_filter"
                      value={state}
                      checked={selectedState?.includes(state)}
                      onChange={handleStateChange}
                    />
                    <span className="checkmark"></span> {stateMap[state]} (
                    {stateCounts[state]})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted">No states found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function CityCard({
  filteredProperty,
  property,
  selectedCity,
  setSelectedCity,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Create a mapping of lowercase cities to their original form
  const cityMap = property.reduce((acc, item) => {
    const city = item?.property_city?.trim(); // Trim to avoid accidental spaces
    if (city) acc[city.toLowerCase()] = city; // Only add if city is not empty
    return acc;
  }, {});

  // Get unique cities (lowercase for comparison)
  const uniqueCities = [...new Set(Object.keys(cityMap))];

  // Count occurrences of each city (using lowercase keys)
  const cityCounts = filteredProperty.reduce((acc, item) => {
    const cityLower = item?.property_city?.trim().toLowerCase();
    if (cityLower) acc[cityLower] = (acc[cityLower] || 0) + 1;
    return acc;
  }, {});

  // Sort cities based on frequency and exclude empty city names
  const sortedCities = uniqueCities
    .filter((city) => cityCounts[city] > 0 && city !== "") // Exclude empty city names
    .sort((a, b) => (cityCounts[b] || 0) - (cityCounts[a] || 0));

  // Filter cities based on search query
  const filteredCities = sortedCities.filter((city) =>
    city.includes(searchQuery.toLowerCase())
  );

  // Handle checkbox change
  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCity((prev) =>
      checked
        ? [...prev, value.toLowerCase()]
        : prev.filter((city) => city !== value.toLowerCase())
    );
  };

  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Cities</h4>
            <FaAngleDown className="icon" />
          </div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search City"
            style={{ minHeight: "20px" }}
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              if (value.startsWith(" ")) return;
              setSearchQuery(value);
            }}
          />
          <div
            className="overflow-auto"
            style={{ maxHeight: "150px", scrollbarWidth: "thin" }}
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <div key={idx}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      name="city_filter"
                      value={city}
                      checked={selectedCity?.includes(city)}
                      onChange={handleCityChange}
                    />
                    <span className="checkmark"></span> {cityMap[city]} (
                    {cityCounts[city]}) {/* Display original form */}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted">No cities found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

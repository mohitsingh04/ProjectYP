import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Property {
  property_city?: string;
}

interface CityCardProps {
  filteredProperty: Property[];
  property: Property[];
  selectedCity: string[];
  setSelectedCity: React.Dispatch<React.SetStateAction<string[]>>;
}

const CityCard: React.FC<CityCardProps> = ({
  filteredProperty,
  property,
  selectedCity,
  setSelectedCity,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const cityMap: Record<string, string> = property.reduce((acc, item) => {
    const city = item?.property_city?.trim();
    if (city) acc[city.toLowerCase()] = city;
    return acc;
  }, {} as Record<string, string>);

  const uniqueCities: string[] = [...new Set(Object.keys(cityMap))];

  const cityCounts: Record<string, number> = filteredProperty.reduce(
    (acc, item) => {
      const cityLower = item?.property_city?.trim().toLowerCase();
      if (cityLower) acc[cityLower] = (acc[cityLower] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedCities: string[] = uniqueCities
    .filter((city) => cityCounts[city] > 0 && city !== "")
    .sort((a, b) => (cityCounts[b] || 0) - (cityCounts[a] || 0));

  const filteredCities: string[] = sortedCities.filter((city) =>
    city.includes(searchQuery.toLowerCase())
  );

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                      checked={selectedCity.includes(city)}
                      onChange={handleCityChange}
                    />
                    <span className="checkmark"></span> {cityMap[city]} (
                    {cityCounts[city]})
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
};

export default CityCard;

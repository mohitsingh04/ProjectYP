import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function LevelCard({
  SelectedLevel = [],
  setSelectedLevel,
  properties = [],
  courses = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const levelCounts = levels.reduce((acc, level) => {
    const lowerCaseLevel = level.toLowerCase();
    const uniquePropertyIds = new Set();

    const count = courses.filter((course) => {
      const isMatchingLevel =
        course.course_level.toLowerCase() === lowerCaseLevel;
      const isMatchingProperty = properties.some(
        (property) => property.uniqueId === course.property_id
      );

      if (
        isMatchingLevel &&
        isMatchingProperty &&
        !uniquePropertyIds.has(course.property_id)
      ) {
        uniquePropertyIds.add(course.property_id);
        return true;
      }
      return false;
    }).length;

    if (count > 0) acc[lowerCaseLevel] = count; // Store only levels with count > 0
    return acc;
  }, {});

  const handleLevelChange = (level) => {
    const lowerCaseLevel = level.toLowerCase();
    setSelectedLevel((prev) =>
      prev.includes(lowerCaseLevel)
        ? prev.filter((l) => l !== lowerCaseLevel)
        : [...prev, lowerCaseLevel]
    );
  };

  const filteredLevels = Object.keys(levelCounts).filter((level) =>
    level.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Course Level</h4>
            <FaAngleDown className="icon" />
          </div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Level"
            style={{ minHeight: "20px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className="overflow-auto"
            style={{ maxHeight: "150px", scrollbarWidth: "thin" }}
          >
            {filteredLevels.length > 0 ? (
              filteredLevels.map((level, idx) => (
                <div key={idx}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      name="state_filter"
                      value={level}
                      checked={SelectedLevel.includes(level)}
                      onChange={() => handleLevelChange(level)}
                    />
                    <span className="checkmark"></span> {level.charAt(0).toUpperCase() + level.slice(1)} (
                    {levelCounts[level]})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted">No levels found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

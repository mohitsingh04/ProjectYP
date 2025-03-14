"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

// Define type for a course
interface Course {
  course_name: string;
  property_id: number;
}

// Define type for a property
interface Property {
  uniqueId: number;
}

// Define props type for the component
interface CourseCardProps {
  properties: Property[];
  selectedCourses: Set<any>;
  setSelectedCourses: React.Dispatch<React.SetStateAction<Set<any>>>;
  courses: Course[];
  setFilteredProperty: React.Dispatch<any>;
}

const CourseCard: React.FC<CourseCardProps> = ({
  properties,
  selectedCourses,
  setSelectedCourses,
  courses,
}) => {
  const [courseCounts, setCourseCounts] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (courses.length > 0 && properties.length > 0) {
      const counts: Record<string, number> = {};
      courses.forEach((course) => {
        const count = properties.filter(
          (property) => property.uniqueId === Number(course.property_id)
        ).length;

        counts[course.course_name] = count;
      });
      setCourseCounts(counts);
    }
  }, [courses, properties]);

  const handleCourseSelection = (course: string) => {
    const lowerCaseCourse = course.toLowerCase();
    setSelectedCourses((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(lowerCaseCourse)) {
        updatedSelection.delete(lowerCaseCourse);
      } else {
        updatedSelection.add(lowerCaseCourse);
      }
      return new Set(updatedSelection);
    });
  };

  const filteredCourses = Object.entries(courseCounts).filter(([course]) =>
    course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card search-filter">
      <div className="card-body">
        <div className="filter-widget mb-0">
          <div className="categories-head d-flex align-items-center">
            <h4>Courses</h4>
            <FaAngleDown className="icon" />
          </div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search Course"
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
            {filteredCourses.length > 0 ? (
              filteredCourses.map(([course, count], idx) => (
                <div key={idx}>
                  <label className="custom_check">
                    <input
                      type="checkbox"
                      name="course_filter"
                      value={course}
                      checked={selectedCourses.has(course.toLowerCase())}
                      onChange={() => handleCourseSelection(course)}
                    />
                    <span className="checkmark"></span> {course} ({count})
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted">No courses found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import PropertyResults from "./_SearchComponents/PropertyResults";
import CourseResults from "./_SearchComponents/CourseResults";

export default function SearchModal({ show, setShow }) {
  const [search, setSearch] = useState("");
  const [propertyResults, setPropertyResults] = useState([]);
  const [courseResults, setCourseResults] = useState([]);
  const [properties, setProperties] = useState([]);
  const [courses, setCourses] = useState([]);

  const trendingSearches = [
    "Luxury Apartments",
    "Beachfront Villas",
    "Online Marketing Course",
    "Data Science Bootcamp",
    "Downtown Offices",
    "Cybersecurity Training",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyRes = await fetch("http://localhost:5000/property");
        const propertyData = await propertyRes.json();
        setProperties(propertyData);

        const courseRes = await fetch("http://localhost:5000/course");
        const courseData = await courseRes.json();

        const uniqueCourses = Array.from(
          new Set(courseData.map((course) => course.course_name))
        ).map((name) =>
          courseData.find((course) => course.course_name === name)
        );

        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setSearch("");
    setPropertyResults([]);
    setCourseResults([]);
    setShow(false);
  };

  const handleSearch = (e) => {
    let query = e.target.value.replace(/\s+/g, " ");
    if (query.startsWith(" ")) query = query.trim();
    setSearch(query);

    if (query.length >= 3) {
      setPropertyResults(
        properties.filter(
          (item) =>
            item?.property_name?.toLowerCase().includes(query.toLowerCase()) ||
            item?.property_city?.toLowerCase().includes(query.toLowerCase()) ||
            item?.property_state?.toLowerCase().includes(query.toLowerCase()) ||
            item?.category?.toLowerCase().includes(query.toLowerCase())
        )
      );

      setCourseResults(
        courses.filter(
          (item) =>
            item.course_name.toLowerCase().includes(query.toLowerCase()) ||
            item.course_short_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setPropertyResults([]);
      setCourseResults([]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Body className="bg-white p-0">
        <div className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="border-0 fs-5 w-100 serachBarCustom bg-light rounded-0"
            autoFocus
          />

          <Button onClick={handleClose} className="border-0 p-0 modalCloseBtn">
            <FaX size={24} color="#333" />
          </Button>
        </div>

        {search.length < 3 && (
          <div className="m-4">
            <h4 className="fw-bold text-dark">Trending Searches</h4>
            <ul className="text-muted fs-5" style={{ listStyleType: "disc" }}>
              {trendingSearches.map((item, index) => (
                <li key={index} className="mt-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {search.length > 0 && search.length < 3 && (
          <div className="text-danger text-center mt-2 fs-5">
            Type at least 3 characters to search
          </div>
        )}

        {search.length >= 3 && propertyResults.length > 0 && (
          <PropertyResults
            Results={propertyResults}
            handleClose={handleClose}
          />
        )}

        {search.length >= 3 && courseResults.length > 0 && (
          <CourseResults Results={courseResults} handleClose={handleClose} />
        )}

        {search.length >= 3 &&
          propertyResults.length === 0 &&
          courseResults.length === 0 && (
            <div className="text-center text-muted mt-4 fs-5">
              <p>No results found</p>
            </div>
          )}
      </Modal.Body>
    </Modal>
  );
}

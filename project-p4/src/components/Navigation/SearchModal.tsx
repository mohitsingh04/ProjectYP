import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropertyResults from "./_SearchComponents/PropertyResults";
import CourseResults from "./_SearchComponents/CourseResults";
import { useRouter } from "next/navigation";
import { FaX } from "react-icons/fa6";
import API from "@/service/API/API";

interface SearchModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface Property {
  uniqueId: string;
  property_name: string;
  property_city: string;
  property_state: string;
  category: string;
  status: string;
}

interface Course {
  uniqueId: string;
  course_name: string;
  course_short_name: string;
  status: string;
}

export default function SearchModal({ show, setShow }: SearchModalProps) {
  const [search, setSearch] = useState("");
  const [propertyResults, setPropertyResults] = useState<Property[]>([]);
  const [courseResults, setCourseResults] = useState<Course[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const trendingSearches = [""];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyRes = await API.get("/property");
        const propertyData: Property[] = propertyRes.data;
        setProperties(
          propertyData.filter((item: Property) => item.status === "Active")
        );

        const courseRes = await API.get("/course");
        const courseData: Course[] = courseRes.data;

        const uniqueCourses: Course[] = Array.from(
          new Set(courseData.map((course: Course) => course.course_name))
        ).map(
          (name) =>
            courseData.find(
              (course: Course) => course.course_name === name
            ) as Course
        );

        setCourses(
          uniqueCourses.filter((item: Course) => item.status === "Active")
        );
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value.replace(/\s+/g, " ");
    if (query.startsWith(" ")) query = query.trim();
    setSearch(query);

    if (query.length >= 3) {
      setPropertyResults(
        properties.filter(
          (item: Property) =>
            item.property_name.toLowerCase().includes(query.toLowerCase()) ||
            item.property_city.toLowerCase().includes(query.toLowerCase()) ||
            item.property_state.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
      );

      setCourseResults(
        courses.filter(
          (item: Course) =>
            item.course_name.toLowerCase().includes(query.toLowerCase()) ||
            item.course_short_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setPropertyResults([]);
      setCourseResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.length >= 3) {
      router.push(`/search/${search}`);
      handleClose();
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
            onKeyDown={handleKeyDown}
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

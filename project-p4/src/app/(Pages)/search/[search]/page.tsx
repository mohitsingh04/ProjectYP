"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "../_searchcomponents/PropertyCard";
import { useParams } from "next/navigation";
import SearchPagination from "../_searchcomponents/searchPagination";
import CourseSearchCard from "../_searchcomponents/CourseSearchCard";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useParams();
  const [property, setProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [course, setCourse] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const getProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/property`);
      const data = response.data;
      setProperty(data.filter((item) => item.status === "Active"));
    } catch (error) {
      console.error(error);
    }
  };

  const getCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/course`);
      const data = response.data;
      setCourse(data.filter((item) => item.status === "Active"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
    getCourse();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredProperties(
        property.filter(
          (item) =>
            item?.property_name?.toLowerCase().includes(search.toLowerCase()) ||
            item?.property_city?.toLowerCase().includes(search.toLowerCase()) ||
            item?.property_state
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            item?.category?.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredCourses(
        course.filter(
          (item) =>
            item.course_name.toLowerCase().includes(search.toLowerCase()) ||
            item.course_short_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProperties(property);
      setFilteredCourses(course);
    }
    setCurrentPage(1);
  }, [property, course, search]);

  const totalPages = Math.ceil(
    Math.max(filteredProperties.length, filteredCourses.length) / itemsPerPage
  );
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="course-content">
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Search</li>
                    <li className="breadcrumb-item">{search}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {paginatedProperties.map((item, index) => (
                <PropertyCard property={item} key={index} />
              ))}
              {paginatedCourses.map((item, index) => (
                <CourseSearchCard course={item} key={index} />
              ))}
              <SearchPagination
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={changePage}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

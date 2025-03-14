"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "../_searchcomponents/PropertyCard";
import { useParams } from "next/navigation";
import SearchPagination from "../_searchcomponents/searchPagination";
import CourseSearchCard from "../_searchcomponents/CourseSearchCard";
import Link from "next/link";
import API from "@/service/API/API";

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
  course_type: string;
  course_level: string;
  duration: string;
}

export default function Page() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { search: rawSearch } = useParams();
  const search = Array.isArray(rawSearch) ? rawSearch[0] : rawSearch || "";
  const [property, setProperty] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const getProperty = async () => {
    try {
      const response = await API.get<Property[]>("/property");
      const data = response.data;
      setProperty(data.filter((item) => item.status === "Active"));
    } catch (error) {
      console.error(error);
    }
  };

  const getCourse = async () => {
    try {
      const response = await API.get<Course[]>("/course");
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
            item.property_name.toLowerCase().includes(search.toLowerCase()) ||
            item.property_city.toLowerCase().includes(search.toLowerCase()) ||
            item.property_state.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
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

  const changePage = (newPage: number) => {
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

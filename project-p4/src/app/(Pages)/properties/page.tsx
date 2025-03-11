"use client";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "./_instructor-components/BreadCrumbs";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import PropertyCard from "./_instructor-components/SidebarFiltes/PropertyCards/PropertyCard";
import Pagination from "./_instructor-components/Pagination/Pagination";
import Serachbar from "./_instructor-components/SeachBar/Serachbar";
import CategoryCard from "./_instructor-components/SidebarFiltes/CategoryCard/CategoryCard";
import StatesCard from "./_instructor-components/SidebarFiltes/StatesCard/StatesCard";
import CityCard from "./_instructor-components/SidebarFiltes/CityCard/CityCard";
import CourseCard from "./_instructor-components/SidebarFiltes/CourseCard/CourseCard";
import { useRouter } from "next/navigation";
import LevelCard from "./_instructor-components/SidebarFiltes/LevelCard/LevelCard";
import FilterTags from "./_instructor-components/SidebarFiltes/FilterTags/FilterTags";
import CourseTypeCard from "./_instructor-components/SidebarFiltes/CourseTypeCard/CourseTypeCard";

export default function InstructorList() {
  const [property, setProperty] = useState([]);
  const [filteredProperty, setFilteredProperty] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const itemsPerPage = 10;
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/property-course");
      const data = response.data;
      const activeCourses = data.filter((course) => course.status === "Active");
      setCourses(activeCourses);
      setFilteredCourses(activeCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (selectedLevel.length > 0) {
      filtered = courses.filter((item) =>
        selectedLevel.some(
          (level) => level.toLowerCase() === item.course_level.toLowerCase()
        )
      );
    }
    if (selectedType.length > 0) {
      filtered = courses.filter((item) =>
        selectedType.some(
          (type) => type.toLowerCase() === item.course_type.toLowerCase()
        )
      );
    }

    setFilteredCourses(filtered);
  }, [selectedLevel, selectedType]);

  const getProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/property`);
      const data = response.data;
      setProperty(
        data?.filter((item: { status: string }) => item.status === "Active")
      );
      setFilteredProperty(data.filter((item) => item.status === "Active"));
      setCategoryData(data.filter((item) => item.status === "Active"));
      setCityData(data.filter((item) => item.status === "Active"));
      setStateData(data.filter((item) => item.status === "Active"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);
  const router = useRouter();

  const updateQueryParams = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.searchQuery)
      params.set("search", newFilters.searchQuery.toLowerCase());
    if (newFilters.selectedCategory.length)
      params.set(
        "category",
        newFilters.selectedCategory.map((cat) => cat.toLowerCase()).join(",")
      );
    if (newFilters.selectedState.length)
      params.set(
        "state",
        newFilters.selectedState.map((state) => state.toLowerCase()).join(",")
      );
    if (newFilters.selectedCity.length)
      params.set(
        "city",
        newFilters.selectedCity.map((city) => city.toLowerCase()).join(",")
      );
    if (Array.from(newFilters.selectedCourses).length)
      params.set(
        "courses",
        Array.from(newFilters.selectedCourses)
          .map((course) => course.toLowerCase())
          .join(",")
      );
    if (newFilters.selectedLevel.length)
      params.set(
        "level",
        newFilters.selectedLevel.map((level) => level.toLowerCase()).join(",")
      );
    if (newFilters.selectedType.length)
      params.set(
        "type",
        newFilters.selectedType.map((type) => type.toLowerCase()).join(",")
      );
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    updateQueryParams({
      searchQuery,
      selectedCategory,
      selectedState,
      selectedCity,
      selectedCourses,
      selectedLevel,
      selectedType,
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedState,
    selectedCity,
    selectedCourses,
    selectedLevel,
    selectedType,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search")
      ? params.get("search").toLowerCase()
      : "";
    const category = params.get("category")
      ? params.get("category").toLowerCase().split(",")
      : [];
    const state = params.get("state")
      ? params.get("state").toLowerCase().split(",")
      : [];
    const city = params.get("city")
      ? params.get("city").toLowerCase().split(",")
      : [];
    const course = params.get("courses")
      ? new Set(params.get("courses").toLowerCase().split(","))
      : new Set();
    const level = params.get("level")
      ? params.get("level").toLowerCase().split(",")
      : [];
    const type = params.get("type")
      ? params.get("type").toLowerCase().split(",")
      : [];
    setSearchQuery(search);
    setSelectedCategory(category);
    setSelectedState(state);
    setSelectedCity(city);
    setSelectedCourses(course);
    setSelectedLevel(level);
    setSelectedType(type);
  }, []);

  useEffect(() => {
    let filtered = property.filter((item) => {
      const matchesSearch = searchQuery
        ? item.property_name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory =
        selectedCategory.length > 0
          ? selectedCategory.some(
              (category) =>
                category.toLowerCase() === item.category.toLowerCase()
            )
          : true;

      const matchesState =
        selectedState.length > 0
          ? selectedState.some(
              (state) =>
                state.toLowerCase() === item.property_state.toLowerCase()
            )
          : true;

      const matchesCity =
        selectedCity.length > 0
          ? selectedCity.some(
              (city) => city.toLowerCase() === item.property_city.toLowerCase()
            )
          : true;

      const matchesCourses =
        selectedCourses.size > 0
          ? courses.some(
              (course) =>
                selectedCourses.has(course.course_name.toLowerCase()) &&
                course.property_id === item.uniqueId
            )
          : true;

      const matchesLevel =
        selectedLevel.length > 0
          ? courses.some(
              (course) =>
                selectedLevel.includes(course.course_level?.toLowerCase()) &&
                course.property_id === item.uniqueId
            )
          : true;
      const matchesTypes =
        selectedType.length > 0
          ? courses.some(
              (course) =>
                selectedType.includes(course.course_type?.toLowerCase()) &&
                course.property_id === item.uniqueId
            )
          : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesState &&
        matchesCity &&
        matchesCourses &&
        matchesLevel &&
        matchesTypes
      );
    });

    setFilteredProperty(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    property,
    selectedState,
    selectedCategory,
    selectedCity,
    selectedCourses,
    selectedLevel,
    selectedType,
    courses,
  ]);

  useEffect(() => {
    let filtered = property;
    if (selectedState.length > 0) {
      filtered = filtered.filter((item) =>
        selectedState.some(
          (state) => state.toLowerCase() === item.property_state.toLowerCase()
        )
      );
    }
    if (selectedCity.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCity.some(
          (city) => city.toLowerCase() === item.property_city.toLowerCase()
        )
      );
    }
    setCategoryData(filtered);
  }, [selectedCity, selectedState]);
  useEffect(() => {
    let filtered = property;
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategory.some(
          (category) => category.toLowerCase() === item.category.toLowerCase()
        )
      );
    }
    if (selectedCity.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCity.some(
          (city) => city.toLowerCase() === item.property_city.toLowerCase()
        )
      );
    }
    setStateData(filtered);
  }, [selectedCity, selectedCategory]);

  useEffect(() => {
    let filtered = property;
    if (selectedState.length > 0) {
      filtered = filtered.filter((item) =>
        selectedState.some(
          (state) => state.toLowerCase() === item.property_state.toLowerCase()
        )
      );
    }
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategory.some(
          (category) => category.toLowerCase() === item.category.toLowerCase()
        )
      );
    }
    setCityData(filtered);
  }, [selectedCategory, selectedState]);

  const totalPages = Math.ceil(filteredProperty.length / itemsPerPage);

  const paginatedData = filteredProperty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory([]);
    setSelectedCity([]);
    setSelectedState([]);
    setSelectedCourses(new Set());
    setSelectedLevel([]);
    setSelectedType([]);
    setSearchQuery("");
    router.push("?", { scroll: false });
  };

  return (
    <>
      <div className="page-content">
        <BreadCrumbs />
        <div className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="filter-clear">
                  <div className="clear-filter d-flex align-items-center">
                    <h4>
                      <FaFilter /> Filters
                    </h4>
                    <div className="clear-text">
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={handleClearFilters}
                      >
                        CLEAR
                      </p>
                    </div>
                  </div>
                  <FilterTags
                    selectedCategory={selectedCategory}
                    selectedCity={selectedCity}
                    selectedCourses={selectedCourses}
                    selectedLevel={selectedLevel}
                    selectedState={selectedState}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedCity={setSelectedCity}
                    setSelectedLevel={setSelectedLevel}
                    setSelectedCourses={setSelectedCourses}
                    setSelectedState={setSelectedState}
                  />

                  {/* <CategoryCard
                    filteredProperty={filteredProperty}
                    property={categoryData}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  /> */}
                  <CourseCard
                    properties={filteredProperty}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    setFilteredProperty={setFilteredProperty}
                    courses={filteredCourses}
                    allCourses={courses}
                  />
                  <LevelCard
                    properties={filteredProperty}
                    courses={filteredCourses}
                    SelectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                  />
                  <CourseTypeCard
                    allCourses={courses}
                    properties={filteredProperty}
                    courses={filteredCourses}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                  />
                  <StatesCard
                    filteredProperty={filteredProperty}
                    property={stateData}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                  />
                  <CityCard
                    filteredProperty={filteredProperty}
                    property={cityData}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                  />
                </div>
              </div>
              <div className="col-lg-9 ">
                <div className="showing-list">
                  <Serachbar
                    itemsPerPage={itemsPerPage}
                    filteredProperty={filteredProperty}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    currentPage={currentPage}
                  />
                </div>
                <div className="row">
                  {paginatedData.map((item, index) => (
                    <PropertyCard property={item} key={index} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  changePage={changePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

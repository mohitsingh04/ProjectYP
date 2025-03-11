"use client";
import React, { cloneElement, useCallback, useEffect, useState } from "react";
import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import axios from "axios";
import PropertyBanner from "../../../_propertyComponents/PropertyBanner/PropertyBanner";
import { Tab, Table, Tabs } from "react-bootstrap";
import FAQs from "../../../_propertyComponents/FAQs/FAQs";
import Review from "../../../_propertyComponents/Review/Review";
import Gallery from "../../../_propertyComponents/Gallery/Gallery";
import Achievements from "../../../_propertyComponents/Achievements/Achievements";
import Hostel from "../../../_propertyComponents/Hostels/Hostel";
import Amenities from "../../../_propertyComponents/Amenities/Amenities";
import Courses from "../../../_propertyComponents/Courses/Courses";
import Teachers from "../../../_propertyComponents/Teachers/Teachers";
import BusinessHours from "../../../_propertyComponents/BussinessHours/BussinessHours";
import dynamic from "next/dynamic";
import CategorySugesstions from "../../../_propertyComponents/Suggestions/CategorySugesstions";
import Link from "next/link";
import EnrollmentForm from "../../../_propertyComponents/Enrollment/EnrollmentForm";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

interface Property {
  uniqueId: string;
  property_logo?: string[];
  property_name: string;
  property_address: string;
  property_city: string;
  property_pincode: string;
  property_state: string;
  property_description?: string;
  property_hostel_type: string[];
}

export default function CourseDetails() {
  const [property, setProperty] = useState<Property | null>(null);
  const [allProperties, setAllProperties] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bussinessHours, setBussinessHours] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [courses, setCourses] = useState([]);
  const { uniqueId, property_name, property_city } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "overview";

  const handleTabSelect = (selectedTab) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", selectedTab);

    router.push(`${pathname}?${params.toString()}`);
  };

  const options: Record<string, unknown> = {
    margin: 10,
    nav: false,
    dots: true,
    lazyLoad: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 3 },
    },
  };

  const getProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/uniqueId/${uniqueId}`
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const name = property_name.replace(/-/g, " ");
  const city = property_city?.replace(/-/g, " ");
  useEffect(() => {
    if (property?.property_name) {
      const formattedName = property.property_name.toLowerCase();
      const formattedCity = property?.property_city?.toLowerCase();
      if (formattedName !== name.toLowerCase()) {
        notFound();
      }
      if (formattedCity !== city.toLowerCase()) {
        notFound();
      }
    }
  }, [property?.property_name]);

  const getFaqs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/faq/${property?.uniqueId}`
      );
      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/teacher/${property?.uniqueId}`
      );
      setTeachers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    const response = await axios.get(
      `http://localhost:5000/review/property/${property?.uniqueId}`
    );
    setReviews(response.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getBussinessHours = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/business-hours/${property?.uniqueId}`
      );
      setBussinessHours(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGallery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/gallery/${property?.uniqueId}`
      );
      setGallery(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAchievements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/achievements/${property?.uniqueId}`
      );
      setAchievements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAmenities = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/amenities/${property?.uniqueId}`
      );
      setAmenities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/property-course/${property?.uniqueId}`
      );
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  const getAllProperties = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/property");
      let filteredData = response.data;

      if (property) {
        filteredData = filteredData.filter(
          (item) =>
            item?.category === property.category &&
            item?.uniqueId !== property?.uniqueId &&
            item?.status === "Active"
        );
      }

      const randomProperties = filteredData
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      setAllProperties(randomProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }, [property]);

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  useEffect(() => {
    if (property) {
      getFaqs();
      getTeachers();
      getReviews();
      getBussinessHours();
      getGallery();
      getAchievements();
      getAmenities();
      getCourses();
    }
  }, [property]);

  return (
    <>
      <section className="page-content course-sec">
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
                      <li className="breadcrumb-item" aria-current="page">
                        <Link href="/properties">Properties</Link>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        {property?.property_name}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PropertyBanner property={property} />
        <div className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 category-tab">
                <Tabs
                  variant="Tabs"
                  defaultActiveKey={activeTab}
                  id=" tab-51"
                  onSelect={handleTabSelect}
                  className="tab-content tabesbody"
                >
                  <Tab eventKey="overview" title="Overview">
                    <div className="tab-pane show">
                      <div className="card overview-sec">
                        <div className="card-body">
                          <h5 className="subs-title">Property Description</h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: property?.property_description ?? "",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="courses" title="Courses">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="subs-title">Courses</h5>
                        <div className="row">
                          {courses.map((course, index) => (
                            <Courses course={course} key={index} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="gallery" title="Gallery">
                    <h5>Gallery</h5>
                    {gallery.map((item, index) => (
                      <Gallery gallery={item} key={index} />
                    ))}
                  </Tab>
                  <Tab eventKey="amenities" title="Amenities">
                    <h5>Amenities</h5>
                    <Amenities amenities={amenities} />
                  </Tab>
                  <Tab eventKey="accommodation" title="Accommodation">
                    <Hostel property={property} />
                  </Tab>
                  <Tab eventKey="achievements" title="Achievements">
                    <Achievements achievements={achievements} />
                  </Tab>
                  <Tab eventKey="teachers" title="Teachers">
                    <div className="owl-theme">
                      <h5>Teachers</h5>
                      <OwlCarousel {...(options as any)}>
                        {teachers?.map((teacher, index) => (
                          <Teachers teacher={teacher} key={index} />
                        ))}
                      </OwlCarousel>
                    </div>
                  </Tab>
                  <Tab eventKey="working-hours" title="Working Hours">
                    <BusinessHours bussinessHours={bussinessHours} />
                  </Tab>
                  <Tab eventKey="faqs" title="Faqs">
                    <div className="card content-sec">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="subs-title">Property FAQs</h5>
                          </div>
                          <div className="col-sm-6 text-sm-end">
                            <h6>92 Lectures 10:56:11</h6>
                          </div>
                        </div>
                        {faqs.map((item, index) => (
                          <FAQs key={index} faq={item} />
                        ))}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="review" title="Review">
                    <h5>Reviews</h5>
                    {reviews.map((review, index) => (
                      <div className="card review-sec" key={index}>
                        <Review review={review} />
                      </div>
                    ))}
                  </Tab>
                </Tabs>
              </div>

              <div className="col-lg-4">
                <div className="sidebar-sec">
                  <div className="video-sec vid-bg">
                    <EnrollmentForm property={property} />
                  </div>
                  {allProperties.length > 0 && (
                    <div className="card include-sec">
                      <div className="card-body">
                        <h5>Related Institutes</h5>
                        <Table responsive borderless>
                          <tbody>
                            {allProperties.map((suggestion, index) => (
                              <CategorySugesstions
                                key={index}
                                suggestion={suggestion}
                              />
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

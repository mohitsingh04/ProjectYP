"use client";
import React, { useEffect, useState } from "react";
import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import PropertyBanner from "../../../_propertyComponents/PropertyBanner/PropertyBanner";
import { Tab, Tabs } from "react-bootstrap";
import FAQs from "../../../_propertyComponents/FAQs/FAQs";
import Review from "../../../_propertyComponents/Review/Review";
import Gallery from "../../../_propertyComponents/Gallery/Gallery";
import Achievements from "../../../_propertyComponents/Achievements/Achievements";
import Hostel from "../../../_propertyComponents/Hostels/Hostel";
import Amenities from "../../../_propertyComponents/Amenities/Amenities";
import Courses from "../../../_propertyComponents/Courses/Courses";
import Teachers from "../../../_propertyComponents/Teachers/Teachers";
import BusinessHours from "../../../_propertyComponents/BussinessHours/BussinessHours";
import CategorySugesstions from "../../../_propertyComponents/Suggestions/CategorySugesstions";
import Link from "next/link";
import EnrollmentForm from "../../../_propertyComponents/Enrollment/EnrollmentForm";
import API from "@/service/API/API";

interface Property {
  uniqueId: string;
  featured_image?: string;
  property_logo?: string[];
  property_name: string;
  property_address: string;
  property_city: string;
  property_pincode: string;
  property_state: string;
  property_description?: string;
  property_hostel_type: string[];
  category: string;
  property_hostel_description: string;
}

export default function CourseDetails() {
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState([]);
  const { uniqueId, property_name, property_city } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "overview";

  const handleTabSelect = (selectedTab: string | null) => {
    if (selectedTab) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", selectedTab);

      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const getProperty = async () => {
    try {
      const response = await API.get(`/property/uniqueId/${uniqueId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const name =
    typeof property_name === "string" ? property_name.replace(/-/g, " ") : "";
  const city =
    typeof property_city === "string" ? property_city.replace(/-/g, " ") : "";

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

  const getReviews = async () => {
    const response = await API.get(`/review/property/${property?.uniqueId}`);
    setReviews(response.data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  useEffect(() => {
    if (property) {
      getReviews();
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
        <PropertyBanner property={property} reviews={reviews} />
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
                    <Courses property={property} />
                  </Tab>
                  <Tab eventKey="gallery" title="Gallery">
                    <h5>Gallery</h5>
                    <Gallery property={property} />
                  </Tab>
                  <Tab eventKey="amenities" title="Amenities">
                    <h5>Amenities</h5>
                    <Amenities property={property} />
                  </Tab>
                  <Tab eventKey="accommodation" title="Accommodation">
                    <Hostel property={property} />
                  </Tab>
                  <Tab eventKey="achievements" title="Achievements">
                    <Achievements property={property} />
                  </Tab>
                  <Tab eventKey="teachers" title="Teachers">
                    <Teachers property={property} />
                  </Tab>
                  <Tab eventKey="working-hours" title="Working Hours">
                    <BusinessHours property={property} />
                  </Tab>
                  <Tab eventKey="faqs" title="Faqs">
                    <FAQs property={property} />
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
                  <CategorySugesstions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

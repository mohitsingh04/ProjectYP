import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { API } from "../../context/API";
import Skeleton from "react-loading-skeleton";
import ALLImages from "../../common/Imagesdata";
import ViewProfileSkeleton from "../../components/Skeletons/ViewProfileSkeleton";
import BasicDetails from "./PropertyComponents/BasicDetails/BasicDetails";
import LocationDetails from "./PropertyComponents/Location/LocationDetails";
import Faq from "./PropertyComponents/Faq/Faq";
import Reviews from "./PropertyComponents/Reviews/Reviews";
import Seo from "./PropertyComponents/SEO/Seo";
import Teacher from "./PropertyComponents/Teacher/Teacher";
import Course from "./PropertyComponents/Course/Course";
import Achievements from "./PropertyComponents/Achievements/Achievements";
import Gallery from "./PropertyComponents/Gallery/Gallery";
import Businesshours from "./PropertyComponents/BussinessHours/BussinessHours";
import Enquiry from "./PropertyComponents/Enquiry/Enquiry";
import Amenities from "./PropertyComponents/Amenities/Amenities";
import AdditionalDetails from "./PropertyComponents/AdditionalDetails/AdditionalDetails";
import Hostel from "./PropertyComponents/Hostel/Hostel";

const tabsData = [
  {
    key: "enquiry",
    label: "Enquiry",
    icon: "ri-file-list-line",
    component: <Enquiry />,
  },
  {
    key: "basic-details",
    label: "Basic Details",
    icon: "ri-profile-line",
    component: <BasicDetails />,
  },
  {
    key: "location",
    label: "Location",
    icon: "ri-map-pin-line",
    component: <LocationDetails />,
  },
  {
    key: "working-hours",
    label: "Working Hours",
    icon: "ri-map-pin-line",
    component: <Businesshours />,
  },
  {
    key: "accomodation",
    label: "Accomodation",
    icon: "ri-hotel-line",
    component: <Hostel />,
  },
  {
    key: "amenties",
    label: "Amenties",
    icon: "ri-hotel-line",
    component: <Amenities />,
  },
  {
    key: "teachers",
    label: "Teachers",
    icon: "ri-user-star-line",
    component: <Teacher />,
  },
  {
    key: "course",
    label: "Course",
    icon: "ri-book-line",
    component: <Course />,
  },
  {
    key: "gallery",
    label: "Gallery",
    icon: "ri-image-line",
    component: <Gallery />,
  },
  {
    key: "review",
    label: "Review",
    icon: "ri-chat-quote-line",
    component: <Reviews />,
  },
  {
    key: "faq",
    label: "FAQ's",
    icon: "ri-question-line",
    component: <Faq />,
  },
  {
    key: "achievements",
    label: "Achievements",
    icon: "ri-trophy-line",
    component: <Achievements />,
  },
  {
    key: "additional-details",
    label: "Additional Details",
    icon: "ri-file-info-line",
    component: <AdditionalDetails />,
  },
  {
    key: "seo",
    label: "SEO",
    icon: "ri-search-line",
    component: <Seo />,
  },
];

export default function ViewProperty() {
  const navigate = useNavigate();
  const { objectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "basic-details";

  const [property, setProperty] = useState("");
  const [loading, setLoading] = useState(true);

  const getProperty = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`/property/${objectId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <div>
          <h1 className="page-title fw-semibold fs-20 mb-0">Property</h1>
          <div>
            {!loading ? (
              <Breadcrumb className="mb-0">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item>Property</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  {property.property_name}
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
        <div className="ms-auto pageheader-btn">
          <Button onClick={() => navigate(-1)}>
            <i className="fe fe-arrow-left"></i> Back
          </Button>
        </div>
      </div>
      <Row>
        <Col>
          {!loading ? (
            <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
              <Card>
                <Card.Body>
                  <div className="wideget-user">
                    <Row>
                      <Col lg={12} md={12} xl={6}>
                        <div className="wideget-user-desc d-sm-flex">
                          <div className="wideget-user-img">
                            <img
                              className="profile-ratio profile-100 shadow-sm"
                              src={
                                property?.property_logo?.[0]
                                  ? `${import.meta.env.VITE_MEDIA_URL}/${
                                      property?.property_logo?.[0]
                                    }`
                                  : ALLImages("face8")
                              }
                              alt="img"
                            />
                          </div>
                          <div className="user-wrap mt-auto">
                            <h4>{property?.property_name}</h4>
                            <h6 className="text-muted mb-3">
                              {property?.category}
                            </h6>
                            <Button className="mt-1 mb-1 me-1">
                              <i className="fe fe-heart"></i> Follow
                            </Button>
                            <a
                              href={`mailto:${property?.property_email}`}
                              className="btn btn-secondary mt-1 mb-1"
                            >
                              <i className="fe fe-mail"></i> E-mail
                            </a>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} md={12} xl={6}>
                        <div className="text-xl-right mt-4 mt-xl-0">
                          <div>
                            {/* <Button variant="danger">
                              <i className="fe fe-trash-2 me-1"></i>Delete
                              Property
                            </Button> */}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Nav
                    variant="pills"
                    className="tab-style-2 nav-style-2 nav-pills"
                  >
                    {tabsData.map((tab, index) => (
                      <Nav.Item key={index} className="mt-2">
                        <Nav.Link
                          className="text-nowrap text-center p-2"
                          eventKey={tab.key}
                          onClick={() => handleTabChange(tab.key)}
                        >
                          <i
                            className={`${tab.icon} me-1 align-middle text-center`}
                          ></i>
                          {tab.label}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Card.Footer>
              </Card>
              <Row>
                <Col>
                  <Tab.Content className="mb-3">
                    {tabsData.map((tab) => (
                      <Tab.Pane
                        eventKey={tab.key}
                        key={tab.key}
                        className="p-0 border-0"
                      >
                        {tab.component}
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          ) : (
            <ViewProfileSkeleton />
          )}
        </Col>
      </Row>
    </div>
  );
}

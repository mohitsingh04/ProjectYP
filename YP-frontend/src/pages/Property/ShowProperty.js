import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import Teachers from "./PropertyComponents/Teachers";
import Gallery from "./PropertyComponents/Gallery";
import Hostel from "./PropertyComponents/Hostel";
import Reviews from "./PropertyComponents/Reviews";
import Faqs from "./PropertyComponents/Faqs";
import Courses from "./PropertyComponents/Courses";
import Achievements from "./PropertyComponents/Achievements";
import Seo from "./PropertyComponents/Seo";
import Location from "./PropertyComponents/Location";
import BasicDetails from "./PropertyComponents/BasicDetails";
import { toast } from "react-toastify";
import OtherDetails from "./PropertyComponents/OtherDetails";
import DataRequest from "../../context/DataRequest";
import Amenities from "./PropertyComponents/Amenities";
import defaultLogo from "../../Images/defaultPropertyLogo.jpeg";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function ShowProperty() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [icon, setIcon] = useState("");
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getProperty = useCallback(async () => {
    try {
      const { data } = await API.get(`/property/${objectId}`);
      setProperty(data);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    if (property?.property_logo?.length) {
      setIcon(property.property_logo[0]);
    }
  }, [property]);

  const deleteProperty = (objectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          API.delete(`/property/${objectId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              navigate(`/dashboard/property`);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (authPermissions?.length >= 0) {
    const hasPermission = authPermissions?.some(
      (item) => item.value === "Read Property"
    );

    if (!hasPermission) {
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <h2 className="text-danger fw-bold">Access Denied</h2>
          <p>You do not have the required permissions to access this page.</p>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Property</h1>
          {!loading ? (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: "/dashboard/property/" }}
              >
                Property
              </Breadcrumb.Item>
              <Breadcrumb.Item active>View</Breadcrumb.Item>
              <Breadcrumb.Item active>{property.property_name}</Breadcrumb.Item>
            </Breadcrumb>
          ) : (
            <Skeleton width={200} />
          )}
        </div>
        <div className="ms-auto pageheader-btn">
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            <span>
              <i className="fe fe-arrow-left"></i>&nbsp;
            </span>
            Back
          </button>
        </div>
      </div>

      <Row id="user-profile">
        <Col lg={12}>
          <Card className=" bg-transparent shadow-none border-0">
            <Card.Body className=" bg-white">
              <div className="wideget-user">
                <Row>
                  <Col lg={12} md={12} xl={6}>
                    <div className="wideget-user-desc d-sm-flex">
                      <div className="wideget-user-img">
                        {!loading ? (
                          <img
                            src={
                              !icon
                                ? defaultLogo
                                : `http://localhost:5000/${icon}`
                            }
                            width={120}
                            height={120}
                            alt="img"
                          />
                        ) : (
                          <Skeleton
                            width={120}
                            height={120}
                            circle={true}
                            className="mx-2"
                          />
                        )}
                      </div>
                      {!loading ? (
                        <div className="user-wrap">
                          <h4>{property.property_name}</h4>
                          <h6 className="text-muted mb-3">
                            Member Since: November 2017
                          </h6>
                          <a href={`tel:${property.property_mobile_no}`}>
                            <button className="btn btn-primary">
                              <i className="fa fa-phone"></i> call
                            </button>
                          </a>
                          <a href={`mailto:${property.property_email}`}>
                            <button className="btn btn-secondary mt-1 mb-1 ms-1">
                              <i className="fa fa-envelope"></i> E-mail
                            </button>
                          </a>
                        </div>
                      ) : (
                        <Skeleton
                          count={3}
                          height={25}
                          width={150}
                          className="my-2"
                        />
                      )}
                    </div>
                  </Col>
                  <Col lg={12} md={12} xl={6}>
                    <div className="text-xl-right mt-4 mt-xl-0">
                      <button
                        className="btn btn-danger me-1"
                        onClick={() => deleteProperty(objectId)}
                      >
                        Delete Property
                      </button>
                    </div>
                    <div className="mt-5">
                      <div className="main-profile-contact-list float-md-end d-md-flex">
                        <div className="me-5">
                          {!loading ? (
                            <div className="media">
                              <div className="media-icon bg-primary  me-3 mt-1">
                                <i className="fe fe-file-plus fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">Enquiry</span>
                                <div className="fw-semibold fs-25">328</div>
                              </div>
                            </div>
                          ) : (
                            <Skeleton height={50} width={100} />
                          )}
                        </div>
                        <div className="me-5 mt-5 mt-md-0">
                          {!loading ? (
                            <div className="media">
                              <div className="media-icon bg-success me-3 mt-1">
                                <i className="fe fe-users  fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">SEO Rank</span>
                                <div className="fw-semibold fs-25">937k</div>
                              </div>
                            </div>
                          ) : (
                            <Skeleton height={50} width={100} />
                          )}
                        </div>
                        <div className="me-0 mt-5 mt-md-0">
                          {!loading ? (
                            <div className="media">
                              <div className="media-icon bg-orange me-3 mt-1">
                                <i className="fe fe-wifi fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">Following</span>
                                <div className="fw-semibold fs-25">2,876</div>
                              </div>
                            </div>
                          ) : (
                            <Skeleton height={50} width={100} />
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>

            <div className="border-top ">
              <div className="wideget-user-tab">
                {!loading ? (
                  <div className="tab-menu-heading">
                    <div className="tabs-menu1 profiletabs">
                      <Tabs
                        variant="Tabs"
                        defaultActiveKey="Profile"
                        id=" tab-51"
                        className="tab-content tabesbody "
                      >
                        <Tab eventKey="Profile" title="Basic Details">
                          <BasicDetails />
                        </Tab>
                        <Tab eventKey="Other Details" title="Other Details">
                          <OtherDetails />
                        </Tab>
                        <Tab eventKey="Location" title="Location">
                          <Location />
                        </Tab>
                        <Tab eventKey="Teachers" title="Teachers">
                          <Teachers />
                        </Tab>
                        <Tab eventKey="Gallery" title="Gallery">
                          <Gallery />
                        </Tab>
                        <Tab eventKey="Hostel" title="Hostel">
                          <Hostel />
                        </Tab>
                        <Tab eventKey="Amenities" title="Amenities">
                          <Amenities />
                        </Tab>
                        <Tab eventKey="Reviews" title="Reviews ">
                          <Reviews />
                        </Tab>
                        <Tab eventKey="FAQ'S" title="FAQ'S">
                          <Faqs />
                        </Tab>
                        <Tab eventKey="Courses" title="Courses">
                          <Courses />
                        </Tab>
                        <Tab eventKey="Achievements" title="Achievements">
                          <Achievements />
                        </Tab>
                        <Tab eventKey="Seo" title="Seo">
                          <Seo />
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                ) : (
                  <Card className="mt-2">
                    <Card.Body>
                      <Skeleton count={4} height={25} className="my-2" />
                    </Card.Body>
                  </Card>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../../context/Api";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
  const [user, setUser] = useState("");
  const [category, setCategory] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = () => {
      API.get("/category").then(({ data }) => {
        setCategory(data);
      });
    };
    const getProfile = () => {
      API.get("/profile").then(({ data }) => {
        setUser(data.user);
        setProfileImg(data.user.profile[0]);
        setLoading(false);
      }, []);
    };
    getCategory();
    getProfile();
  }, []);

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Profile</h1>
            {!loading ? (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item" href="#">
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item className="breadcrumb-item" href="#">
                  My Profile
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {user.name}
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <Skeleton width={200} />
            )}
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
                                !user?.profile?.[0]
                                  ? require("../../Images/DefaultProfile.jpg")
                                  : `http://localhost:5000/${profileImg}`
                              }
                              alt="profile-user"
                              width={128}
                              height={128}
                              className=""
                            />
                          ) : (
                            <Skeleton
                              circle={true}
                              width={128}
                              height={128}
                              className="mx-2"
                            />
                          )}
                        </div>
                        {!loading ? (
                          <div className="user-wrap">
                            <h4>{user.name}</h4>
                            <h6 className="text-muted mb-3">{user.email}</h6>
                            <Link to="#" className="btn btn-primary mt-1 mb-1 ">
                              <i className="fa fa-rss"></i> Follow
                            </Link>
                            <Link
                              to={`${process.env.PUBLIC_URL}/pages/mailInbox/`}
                              className="btn btn-secondary mt-1 mb-1 ms-1"
                            >
                              <i className="fa fa-envelope"></i> E-mail
                            </Link>
                          </div>
                        ) : (
                          <Skeleton
                            width={150}
                            height={25}
                            count={3}
                            className="my-2"
                          />
                        )}
                      </div>
                    </Col>
                    <Col lg={12} md={12} xl={6}>
                      <div className="text-xl-right mt-4 mt-xl-0">
                        <Link
                          to="/dashboard/edit/my-profile"
                          className="btn btn-primary me-1"
                        >
                          Edit Profile
                        </Link>
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
                                  <span className="text-muted">Categories</span>
                                  <div className="fw-semibold fs-25">
                                    {category.length}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Skeleton width={150} height={25} />
                            )}
                          </div>
                          <div className="me-5 mt-5 mt-md-0">
                            {!loading ? (
                              <div className="media">
                                <div className="media-icon bg-success me-3 mt-1">
                                  <i className="fe fe-users  fs-20 text-white"></i>
                                </div>
                                <div className="media-body">
                                  <span className="text-muted">Followers</span>
                                  <div className="fw-semibold fs-25">937k</div>
                                </div>
                              </div>
                            ) : (
                              <Skeleton width={150} height={25} />
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
                              <Skeleton width={150} height={25} />
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
              <Card.Body className="bg-white">
                {!loading ? (
                  <div className="media-heading">
                    <h5>
                      <strong>Personal Information</strong>
                    </h5>
                    {user.verified === true ? null : (
                      <div className="alert alert-danger">
                        Verify your email,{" "}
                        <Link to="/verify-email">Click here</Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Skeleton width={150} height={25} />
                )}
                <div className="table-responsive p-1">
                  {!loading ? (
                    <Table className="table row table-borderless">
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Full Name :</strong> {user.name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Phone :</strong> {user.mobile_no}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Pincode :</strong> {user.pincode}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>State :</strong> {user.state}
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Email :</strong> {user.email}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Address :</strong> {user.address}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>City :</strong> {user.city}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Skeleton height={25} count={3} className="my-2" />
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

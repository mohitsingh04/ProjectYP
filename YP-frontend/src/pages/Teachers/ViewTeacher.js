import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";

export default function ViewTeacher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    (async () => {
      try {
        dispatch(showLoading());
        const response = await API.get(`/teacher/${uniqueId}`);
        setTeacher(response.data);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        toast.error("Something went wrong!");
      }
    })();
  }, [dispatch, uniqueId]);

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Teacher</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Dashbaord
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                View
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item">
                Teacher
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item breadcrumds"
                aria-current="page"
              >
                {teacher.property_name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                {teacher.uniqueId}
              </Breadcrumb.Item>
            </Breadcrumb>
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
                          {teacher.profile == null ? (
                            <img
                              src={require("../../assets/images/users/8.jpg")}
                              alt="profile-user"
                              className=""
                            />
                          ) : (
                            <img
                              src={`http://localhost:5000/images/${teacher.profile}`}
                              alt="profile-user"
                              width={128}
                              height={128}
                              className=""
                            />
                          )}
                        </div>
                        <div className="user-wrap">
                          <h4>{teacher.teacher_name}</h4>
                          <h6 className="text-muted mb-3">
                            {teacher.designation}
                          </h6>
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
                      </div>
                    </Col>
                    <Col lg={12} md={12} xl={6}>
                      <div className="mt-5">
                        <div className="main-profile-contact-list float-md-end d-md-flex">
                          <div className="me-5">
                            <div className="media">
                              <div className="media-icon bg-primary  me-3 mt-1">
                                <i className="fe fe-file-plus fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">Posts</span>
                                <div className="fw-semibold fs-25">328</div>
                              </div>
                            </div>
                          </div>
                          <div className="me-5 mt-5 mt-md-0">
                            <div className="media">
                              <div className="media-icon bg-success me-3 mt-1">
                                <i className="fe fe-users  fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">Followers</span>
                                <div className="fw-semibold fs-25">937k</div>
                              </div>
                            </div>
                          </div>
                          <div className="me-0 mt-5 mt-md-0">
                            <div className="media">
                              <div className="media-icon bg-orange me-3 mt-1">
                                <i className="fe fe-wifi fs-20 text-white"></i>
                              </div>
                              <div className="media-body">
                                <span className="text-muted">Following</span>
                                <div className="fw-semibold fs-25">2,876</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
              <Card.Body className="bg-white">
                <div className="media-heading">
                  <h5>
                    <strong>Personal Information</strong>
                  </h5>
                </div>
                <div className="table-responsive p-1">
                  <Table className="table row table-borderless">
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Teacher Name :</strong> {teacher.teacher_name}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Experience :</strong> {teacher.experience}{" "}
                          Years
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Designation :</strong> {teacher.designation}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <strong>Property Id :</strong> {property[0].property_name} */}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function ViewUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { objectId } = useParams();
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    try {
      API.get(`/user/${objectId}`).then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, [objectId]);

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Read User"
  );

  if (!hasPermission) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p>You do not have the required permissions to access this page.</p>
      </div>
    );
  }

  const UserInfoRow = ({ label, value, loading }) => (
    <tr>
      <td>
        {loading ? (
          <Skeleton width={200} height={20} />
        ) : (
          <>
            <strong>{label} :</strong> {value}
          </>
        )}
      </td>
    </tr>
  );

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">User</h1>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/" }}
                >
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/user/" }}
                >
                  User
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  View
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {user.name}
                </Breadcrumb.Item>
              </Breadcrumb>
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
                          {loading ? (
                            <Skeleton circle={true} width={128} height={128} />
                          ) : user?.profile?.[0] ? (
                            <img
                              src={`http://localhost:5000/${user?.profile?.[0]}`}
                              alt="profile-user"
                              width={128}
                              height={128}
                              className=""
                            />
                          ) : (
                            <img
                              src={require("../../Images/DefaultProfile.jpg")}
                              alt="profile-user"
                              className=""
                              width={128}
                              height={128}
                            />
                          )}
                        </div>
                        <div className="user-wrap">
                          <h4>
                            {loading ? (
                              <Skeleton
                                width={100}
                                height={20}
                                className="mx-2"
                              />
                            ) : (
                              user.name
                            )}
                          </h4>
                          <h6 className="text-muted mb-3">
                            {loading ? (
                              <Skeleton
                                width={100}
                                height={20}
                                className="mx-2"
                              />
                            ) : (
                              user.email
                            )}
                          </h6>
                          {loading ? (
                            <Skeleton
                              width={100}
                              height={20}
                              className="mx-2"
                            />
                          ) : (
                            <>
                              <Link
                                to="#"
                                className="btn btn-primary mt-1 mb-1 "
                              >
                                <i className="fa fa-rss"></i> Follow
                              </Link>
                              <Link
                                to={`${process.env.PUBLIC_URL}/pages/mailInbox/`}
                                className="btn btn-secondary mt-1 mb-1 ms-1"
                              >
                                <i className="fa fa-envelope"></i> E-mail
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} md={12} xl={6}>
                      <div className="text-xl-right mt-4 mt-xl-0">
                        {loading ? (
                          <Skeleton width={100} height={20} />
                        ) : (
                          <Link
                            to={`/dashboard/user/edit/${objectId}`}
                            className="btn btn-primary me-1"
                          >
                            Edit User
                          </Link>
                        )}
                      </div>
                      <div className="mt-5">
                        <div className="main-profile-contact-list float-md-end d-md-flex">
                          <div className="me-5">
                            {loading ? (
                              <Skeleton width={100} height={50} />
                            ) : (
                              <div className="media">
                                <div className="media-icon bg-primary  me-3 mt-1">
                                  <i className="fe fe-file-plus fs-20 text-white"></i>
                                </div>
                                <div className="media-body">
                                  <span className="text-muted">Posts</span>
                                  <div className="fw-semibold fs-25">328</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="me-5 mt-5 mt-md-0">
                            {loading ? (
                              <Skeleton width={100} height={50} />
                            ) : (
                              <div className="media">
                                <div className="media-icon bg-success me-3 mt-1">
                                  <i className="fe fe-users  fs-20 text-white"></i>
                                </div>
                                <div className="media-body">
                                  <span className="text-muted">Followers</span>
                                  <div className="fw-semibold fs-25">328k</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="me-0 mt-5 mt-md-0">
                            {loading ? (
                              <Skeleton width={100} height={50} />
                            ) : (
                              <div className="media">
                                <div className="media-icon bg-orange me-3 mt-1">
                                  <i className="fe fe-wifi fs-20 text-white"></i>
                                </div>
                                <div className="media-body">
                                  <span className="text-muted">Following</span>
                                  <div className="fw-semibold fs-25">3,585</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
              <Card.Body className="bg-white">
                <div className="media-heading">
                  {loading ? (
                    <Skeleton width={200} height={25} />
                  ) : (
                    <h5>
                      <strong>Personal Information</strong>
                    </h5>
                  )}
                </div>
                <div className="table-responsive p-1">
                  <Table className="table row table-borderless">
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <UserInfoRow
                        label="Full Name"
                        value={user?.name}
                        loading={loading}
                      />
                      <UserInfoRow
                        label="Phone"
                        value={user?.mobile_no}
                        loading={loading}
                      />
                      <UserInfoRow
                        label="Pincode"
                        value={user?.pincode}
                        loading={loading}
                      />
                      <UserInfoRow
                        label="State"
                        value={user?.state}
                        loading={loading}
                      />
                    </tbody>
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <UserInfoRow
                        label="Email"
                        value={user?.email}
                        loading={loading}
                      />
                      <UserInfoRow
                        label="Address"
                        value={user?.address}
                        loading={loading}
                      />
                      <UserInfoRow
                        label="City"
                        value={user?.city}
                        loading={loading}
                      />
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

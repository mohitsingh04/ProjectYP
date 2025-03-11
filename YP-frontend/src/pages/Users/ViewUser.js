import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function ViewUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { objectId } = useParams();
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(`/user/${mainUser?.User?._id}`);
      setAuthUser(response.data);
      setAuthLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [mainUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setAuthPermissions(authUser?.permissions);
  }, [authUser]);

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

  const deleteUser = (uniqueId) => {
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
          API.delete(`/user/${uniqueId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              navigate("/dashboard/user");
            } else if (response.data.error) {
              toast.error(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
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
    }
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
                <Breadcrumb.Item>View</Breadcrumb.Item>
                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left me-1"></i>
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
                          ) : (
                            <img
                              src={
                                user?.profile?.[0]
                                  ? `http://localhost:5000/${user?.profile?.[0]}`
                                  : require("../../Images/DefaultProfile.jpg")
                              }
                              alt="profile-user"
                              width={128}
                              height={128}
                              className=""
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
                              <Link to="#" className="btn btn-primary">
                                <i className="fa fa-rss"></i> Follow
                              </Link>
                              <Link
                                to={`${process.env.PUBLIC_URL}/pages/mailInbox/`}
                                className="btn btn-secondary ms-1"
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
                          <>
                            <Link
                              to={`/dashboard/user/edit/${objectId}`}
                              className="btn btn-primary me-1"
                            >
                              Edit User
                            </Link>
                            <button
                              className="btn btn-danger me-1"
                              onClick={() => {
                                deleteUser(objectId);
                              }}
                            >
                              Delete User
                            </button>
                          </>
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

import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function ViewStatus() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
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
      API.get(`/status/${objectId}`).then(({ data }) => {
        // setStatus(data.filter(status => status.uniqueId == uniqueId))
        setStatus(data);
        setLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, [objectId]);

  const [isExpanded, setIsExpended] = useState(false);
  const toggleReadMore = () => {
    setIsExpended(!isExpanded);
  };

  const deleteStatus = (objectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await API.delete(`/status/${objectId}`);
          toast.success(response.data.message);
          navigate(`/dashboard/status`);
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
      const hasPermission = authPermissions?.some(
        (item) => item.value === "Read Status"
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

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Status</h1>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/" }}
                >
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/status/" }}
                >
                  Status
                </Breadcrumb.Item>
                <Breadcrumb.Item>View</Breadcrumb.Item>
                <Breadcrumb.Item>{status.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left me-1"></i>&nbsp;
              </span>
              Back
            </button>
          </div>
        </div>

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5 className="m-0 align-content-center">
                  <strong>View Status</strong>
                </h5>
                <div className="ms-auto">
                  <Link
                    to={`/dashboard/status/edit/${objectId}`}
                    className={`btn btn-primary me-1`}
                  >
                    Edit Status
                  </Link>
                  <button
                    className={`btn btn-danger me-1`}
                    onClick={() => deleteStatus(objectId)}
                  >
                    Delete Status
                  </button>
                </div>
              </Card.Header>

              <Card.Body className="bg-white">
                <div className="table-responsive p-1">
                  <Table className="table row table-borderless">
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          {loading ? (
                            <Skeleton width={100} height={25} />
                          ) : (
                            <>
                              <strong>Name : </strong> {status.name}
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          {loading ? (
                            <Skeleton width={100} height={25} />
                          ) : (
                            <>
                              <strong>Parent Status : </strong>
                              {status.parent_status}
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Row className="row profie-img">
                  <Col md={12}>
                    {loading ? (
                      <Skeleton width={100} height={25} />
                    ) : (
                      <>
                        <div className="mb-0">
                          {status.description ? (
                            <strong className="fs-6">Description: </strong>
                          ) : (
                            <strong className="fs-6">
                              Description: Not Available
                            </strong>
                          )}

                          {status.description && (
                            <span>
                              {status.description.length >= 1500 ? (
                                <>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: isExpanded
                                        ? status.description
                                        : status.description.substring(
                                            0,
                                            1200
                                          ) + "...",
                                    }}
                                  />
                                  <button
                                    onClick={toggleReadMore}
                                    className="text-primary m-0 p-0 text-decoration-underline"
                                  >
                                    {isExpanded ? "Read Less" : "Read More"}
                                  </button>
                                </>
                              ) : (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: status.description,
                                  }}
                                />
                              )}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

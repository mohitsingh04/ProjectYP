import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function ViewStatus() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { objectId } = useParams();
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

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

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Status</h1>
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
                  linkProps={{ to: "/dashboard/status/" }}
                >
                  Status
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  View
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {status.name}
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

        <Row>
          <Col md={12}>
            <Card>
              <Card.Body className="bg-white">
                <div className="media-heading">
                  {loading ? (
                    <Skeleton width={100} height={25} />
                  ) : (
                    <h5>
                      <strong>View Status</strong>
                    </h5>
                  )}
                </div>
                <hr className="mt-5" />
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
                              <strong>Color : </strong>
                              <input
                                type="color"
                                value={status.color}
                                disabled
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Row className="row profie-img">
                  <Col md={12}>
                    {" "}
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

import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";

export default function ViewStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { uniqueId } = useParams();
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    try {
      dispatch(showLoading());
      API.get(`/status/${uniqueId}`).then(({ data }) => {
        dispatch(hideLoading());
        // setStatus(data.filter(status => status.uniqueId == uniqueId))
        setStatus(data);
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  }, [dispatch, uniqueId]);

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
        USER DOES NOT HAVE THE RIGHT ROLES.
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Status</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                <Link to="/dashboard/status/">Status</Link>
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
                {status.uniqueId}
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

        <Row>
          <Col md={12}>
            <Card>
              <Card.Body className="bg-white">
                <div className="media-heading">
                  <h5>
                    <strong>View Status</strong>
                  </h5>
                </div>
                <hr className="mt-5" />
                <div className="table-responsive p-1">
                  <Table className="table row table-borderless">
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Name : </strong> {status.name}
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Color : </strong>
                          <input type="color" value={status.color} disabled />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Row className="row profie-img">
                  <Col md={12}>
                    <p className="mb-0">
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
                                    : status.description.substring(0, 1200) +
                                      "...",
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
                    </p>
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

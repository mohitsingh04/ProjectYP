import React, { useEffect, useState } from "react";
import DataRequest from "../../context/DataRequest";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import defaultCourse from "../../Images/defaultcourse.webp";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

export default function ViewCourse() {
  const navigate = useNavigate();
  const mainUser = DataRequest();
  const [course, setCourse] = useState("");
  const { objectId } = useParams();
  const [courseImage, setCourseImage] = useState("");
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    try {
      API.get(`/course/${objectId}`).then(({ data }) => {
        setCourse(data);
        setCourseImage(data?.image?.[0]);
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

  const deleteCourse = (uniqueId) => {
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
          API.delete(`/course/${uniqueId}`).then((response) => {
            toast.success(response.data.message);
            navigate(`/dashboard/course`);
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (authPermissions?.length >= 0) {
    const hasPermission = authPermissions?.some(
      (item) => item.value === "Read Course"
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
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
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
                  linkProps={{ to: "/dashboard/course/" }}
                >
                  Course
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  View
                </Breadcrumb.Item>
                <Breadcrumb.Item>{course?.course_name}</Breadcrumb.Item>
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
              {!loading ? (
                <>
                  <Card.Header>
                    <h5 className="m-0 align-content-center">
                      <strong>View Course</strong>
                    </h5>
                    <div className="ms-auto">
                      <Link
                        to={`/dashboard/course/edit/${objectId}`}
                        className={`btn btn-primary me-1`}
                      >
                        Edit Course
                      </Link>
                      <button
                        className={`btn btn-danger me-1`}
                        onClick={() => deleteCourse(objectId)}
                      >
                        Delete Course
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive p-1">
                      <div>
                        <img
                          src={
                            courseImage
                              ? `http://localhost:5000/${courseImage}`
                              : defaultCourse
                          }
                          width={`100%`}
                          height={`50%`}
                          alt="defaultCourse"
                        />
                      </div>
                      <Table className="table row table-borderless mt-3">
                        <tbody className="col-lg-12 col-xl-6 p-0">
                          <tr>
                            <td>
                              <strong>Name : </strong> {course.course_name}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Course Level : </strong>{" "}
                              {course.course_level}
                            </td>
                          </tr>
                        </tbody>
                        <tbody className="col-lg-12 col-xl-6 p-0">
                          <tr>
                            <td>
                              <strong>Short Name : </strong>
                              {course.course_short_name}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Duration : </strong>
                              {course.duration}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <Row className="row profie-img">
                      <Col md={12}>
                        <div className="mb-0">
                          {course.description ? (
                            <strong className="fs-6">Description: </strong>
                          ) : (
                            <strong className="fs-6">
                              Description: Not Available
                            </strong>
                          )}

                          {course.description && (
                            <span>
                              {course.description.length >= 1500 ? (
                                <>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: isExpanded
                                        ? course.description
                                        : course.description.substring(
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
                                    __html: course.description,
                                  }}
                                />
                              )}
                            </span>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              ) : (
                <>
                  <Card.Body>
                    <Skeleton height={250} />
                    <Row>
                      <Col md={6}>
                        <Skeleton count={3} height={20} className="my-2" />
                      </Col>
                      <Col md={6}>
                        <Skeleton count={2} height={20} className="my-2" />
                      </Col>
                    </Row>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

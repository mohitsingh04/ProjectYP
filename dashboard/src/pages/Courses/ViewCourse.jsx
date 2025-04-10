import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ALLImages from "../../common/Imagesdata";
import { API } from "../../context/API";
import Swal from "sweetalert2";

export default function ViewCourse() {
  const { objectId } = useParams();
  const navigator = useNavigate();
  const [course, setCourse] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getAuhtUser = async () => {
    setAuthLoading(true);
    try {
      const response = await API.get(`/profile`);
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    getAuhtUser();
  }, []);

  if (!authLoading) {
    if (!authUser?.permissions?.some((item) => item.value === "Read Course")) {
      navigator("/dashboard/access-denied");
    }
  }

  const deleteCourse = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await API.delete(`/course/${id}`);
        Swal.fire(
          "Deleted!",
          response?.data?.message || "Course removed.",
          "success"
        );
        navigator(`/dashboard/course`);
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.error || "Failed to delete!",
          "error"
        );
      }
    }
  };

  const getCourse = useCallback(async () => {
    try {
      const response = await API.get(`/course/${objectId}`);
      setCourse(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [objectId]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  return (
    <div>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <div>
          <h1 className="page-title fw-semibold fs-20 mb-0">Courses</h1>
          <Breadcrumb className="mb-0">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/dashboard/course" }}
            >
              Courses
            </Breadcrumb.Item>
            <Breadcrumb.Item>View</Breadcrumb.Item>
            <Breadcrumb.Item active>{course?.course_name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Button variant="primary" onClick={() => navigator(-1)}>
            <i className="fe fe-arrow-left"></i> Back
          </Button>
        </div>
      </div>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <h5 className="mb-0">Course Details</h5>
              {!authLoading && (
                <div>
                  {authUser?.permissions?.some(
                    (item) => item.value === "Update Course"
                  ) && (
                    <Link
                      to={`/dashboard/course/edit/${objectId}`}
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fe fe-cpu me-1"></i>Edit Course
                    </Link>
                  )}
                  {authUser?.permissions?.some(
                    (item) => item.value === "Delete Course"
                  ) && (
                    <button
                      onClick={() => deleteCourse(objectId)}
                      className="btn btn-danger ms-1 btn-sm"
                    >
                      <i className="fe fe-trash-2 me-1"></i>Delete Course
                    </button>
                  )}
                </div>
              )}
            </Card.Header>

            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <img
                    src={
                      course?.image?.[0]
                        ? `${import.meta.env.VITE_MEDIA_URL}/course/${
                            course?.image?.[0]
                          }`
                        : ALLImages("face8")
                    }
                    alt="Course"
                    className="img-fluid profile-ratio w-100 h-100"
                  />
                </Col>
                <Col md={6}>
                  <Table striped>
                    <tbody>
                      <tr>
                        <th>Course Name</th>
                        <td>{course.course_name}</td>
                      </tr>
                      {course.course_short_name && (
                        <tr>
                          <th>Course Short Name</th>
                          <td>{course.course_short_name}</td>
                        </tr>
                      )}
                      <tr>
                        <th>Duration</th>
                        <td>{course.duration}</td>
                      </tr>
                      <tr>
                        <th>Course Type</th>
                        <td>{course.course_type}</td>
                      </tr>
                      <tr>
                        <th>Certification Type</th>
                        <td>{course.certification_type}</td>
                      </tr>
                      <tr>
                        <th>Course Level</th>
                        <td>{course.course_level}</td>
                      </tr>
                      <tr>
                        <th>Course Status</th>
                        <td>
                          <span
                            className={`badge ${
                              course.status === "Active"
                                ? "bg-success"
                                : course.status === "Suspended"
                                ? "bg-danger"
                                : "bg-warning"
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>

              {/* Course Description Section */}
            </Card.Body>
            {course.description && (
              <Card.Footer>
                <div className="mt-4">
                  <h5>Course Description</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: showFullDescription
                        ? course.description
                        : course.description
                            .split(" ")
                            .slice(0, 300)
                            .join(" ") +
                            course.description.split(" ").length >
                            300 && "...",
                    }}
                  />
                  {course.description.split(" ").length > 300 && (
                    <Button
                      className="btn btn-secondary"
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                    >
                      {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

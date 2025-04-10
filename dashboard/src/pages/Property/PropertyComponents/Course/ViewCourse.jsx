import React, { useState } from "react";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import ALLImages from "../../../../common/Imagesdata";
import Swal from "sweetalert2";
import { API } from "../../../../context/API";

export default function ViewCourse({
  course,
  setIsViewing,
  setIsEditing,
  getPropertyCourses,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description = course?.description || "";
  const isLongDescription = description.length > 300;
  const mediaUrl = import.meta.env.VITE_MEDIA_URL || "";

  const handleDelete = async (id) => {
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
        const response = await API.delete(`/property-course/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: response?.data?.message || "Course deleted successfully.",
          icon: "success",
        });
        setIsViewing("");
        getPropertyCourses();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error || "Failed to delete course!",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">View Course</Card.Title>
              <div>
                <Button
                  variant="success"
                  className="me-1"
                  onClick={() => setIsEditing(course)}
                >
                  <i className="fe fe-edit me-1"></i>Edit
                </Button>
                <Button
                  variant="danger"
                  className="me-1"
                  onClick={() => handleDelete(course?._id)}
                >
                  <i className="fe fe-trash-2 me-1"></i>Delete
                </Button>
                <Button onClick={() => setIsViewing("")}>
                  <i className="fe fe-arrow-left me-1"></i>Back
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src={
                      course?.image?.[0]
                        ? `${mediaUrl}/course/${course.image[0]}`
                        : ALLImages("face8")
                    }
                    className="profile-ratio w-100"
                    alt={course?.course_name}
                  />
                </Col>

                <Col md={8}>
                  <Table striped>
                    <tbody>
                      <tr>
                        <th>Course Name</th>
                        <td>{course?.course_name}</td>
                      </tr>
                      <tr>
                        <th>Course Short Name</th>
                        <td>{course?.course_short_name}</td>
                      </tr>
                      <tr>
                        <th>Course Type</th>
                        <td>{course?.course_type}</td>
                      </tr>
                      <tr>
                        <th>Course Level</th>
                        <td>{course?.course_level}</td>
                      </tr>
                      <tr>
                        <th>Course Certification Type</th>
                        <td>{course?.certification_type}</td>
                      </tr>
                      <tr>
                        <th>Course Duration</th>
                        <td>{course?.duration}</td>
                      </tr>
                      <tr>
                        <th>Prices</th>
                        <td>
                          {Array.isArray(course?.prices) &&
                            course.prices.map((price, index) => (
                              <div key={index}>
                                {price.inr && <div>₹ {price.inr}</div>}
                                {price.dollar && <div>$ {price.dollar}</div>}
                              </div>
                            ))}
                        </td>
                      </tr>
                      <tr>
                        <th>Course Status</th>
                        <td>
                          <Badge
                            className={
                              course?.status === "Active"
                                ? "bg-success"
                                : course?.status === "Suspended"
                                ? "bg-danger"
                                : "bg-warning"
                            }
                          >
                            {course?.status}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>

            {description && (
              <Card.Footer>
                <div
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? description
                      : description.slice(0, 300) + "...",
                  }}
                />
                {description.length > 300 && (
                  <Button
                    className="p-0"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

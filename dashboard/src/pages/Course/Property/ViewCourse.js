import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ViewPropertyCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const { objectId, property_name } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/property-course/${objectId}`).then(({ data }) => {
      setCourse(data);
      setLoading(false);
    });
  }, [objectId]);

  const deletePropetyCourse = (id) => {
    try {
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
          API.delete(`/property-course/${id}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
          navigate(`/dashboard/property`);
        }
      });
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
            {!loading ? (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item" href="#">
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  View
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  Course
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  {course.property_name}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {course.course_name}
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <Skeleton width={200} />
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
              <Card.Header>
                <h5 className="m-0 align-content-center">
                  <strong>View Course</strong>
                </h5>
                <div className="ms-auto">
                  <Link
                    to={`/dashboard/edit/course/${property_name}/${objectId}`}
                    className={`btn btn-primary me-1`}
                  >
                    Edit Course
                  </Link>
                  <button
                    className={`btn btn-danger me-1`}
                    onClick={() => deletePropetyCourse(objectId)}
                  >
                    Delete Course
                  </button>
                </div>
              </Card.Header>
              <Card.Body className="bg-white">
                {!loading ? (
                  <div className="table-responsive p-1">
                    <div>
                      <img
                        src={
                          course?.image?.[0]
                            ? `${process.env.REACT_APP_BACKEND_URL}/${course?.image?.[0]}`
                            : require(`../../../Images/defaultcourse.webp`)
                        }
                        alt={course.course_name}
                        className="img-fluid"
                      />
                    </div>
                    <Table className="table row table-borderless">
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong className="fs-6">Course: </strong>{" "}
                            {course.course_name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong className="fs-6">Course Type: </strong>{" "}
                            {course.course_type}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong className="fs-6">Duration: </strong>
                            {course.duration}
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong className="fs-6">
                              Course Short Name:{" "}
                            </strong>{" "}
                            {course.course_short_name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong className="fs-6">Course Level: </strong>
                            {course.course_level}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <strong className="fs-6">Price: </strong>Rs.
                            {course.price}
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <td colSpan={`2`} className="px-0">
                            <strong className="fs-6">Description: </strong>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: course?.description,
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <Row>
                    <Skeleton height={200} />
                    <Skeleton height={25} count={3} className="my-1" />
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

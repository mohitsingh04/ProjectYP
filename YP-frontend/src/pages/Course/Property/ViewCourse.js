import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

export default function ViewPropertyCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState("");
  const { objectId } = useParams();

  useEffect(() => {
    dispatch(showLoading());
    API.get(`/property-course/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setCourse(data);
    });
  }, [dispatch, objectId]);

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                View
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Course
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                {course.property_name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                {course.course_name}
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
                    <strong>View Course</strong>
                  </h5>
                </div>
                <hr className="mt-5" />
                <div className="table-responsive p-1">
                  <Table className="table row table-borderless">
                    <tbody className="p-0">
                      <img
                        src={`http://localhost:5000/${course?.image?.[0]}`}
                        alt={course.course_name}
                        className="img-fluid w-100"
                      />
                    </tbody>
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
                          <strong className="fs-6">Course Short Name: </strong>{" "}
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

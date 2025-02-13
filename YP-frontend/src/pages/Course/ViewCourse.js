import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";

export default function ViewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState("");
  const { uniqueId } = useParams();
  const [courseImage, setCourseImage] = useState("");

  useEffect(() => {
    try {
      dispatch(showLoading());
      API.get(`/course/${uniqueId}`).then(({ data }) => {
        dispatch(hideLoading());
        setCourse(data);
        setCourseImage(data.image[0]);
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  }, [dispatch, uniqueId]);

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                <Link to="/dashboard/course/">Course</Link>
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
                {course.uniqueId}
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
                  <div>
                    <img
                      src={`http://localhost:5000/${courseImage}`}
                      width="100%"
                      height="50%"
                      alt={courseImage}
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
                          <strong>Course Level : </strong> {course.course_level}
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
                    <p className="mb-0">
                      {course.description ? (
                        <strong className="fs-6">Description: </strong>
                      ) : (
                        <strong className="fs-6">
                          Description: Not Available
                        </strong>
                      )}

                      {course.description && (
                        <span>
                          {course.description.replace(/<[^>]+>/g, "")}
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

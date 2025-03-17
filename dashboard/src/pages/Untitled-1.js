import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CoursesData from "../../assets/json/Courses.json";

const ShowProperty = () => {
  const [showCourseFields, setShowCourseFields] = useState({});
  const { id } = useParams();
  const courses = CoursesData.filter(coursesData => coursesData.property_id == id);

  const handleEditCourseField = (id) => {
    setShowCourseFields((prevFields) => ({
      ...prevFields,
      [id]: true,
    }));
  };

  const handleUpdateCourseField = (id) => {
    setShowCourseFields((prevFields) => ({
      ...prevFields,
      [id]: false,
    }));
  };

  const renderCourse = (items) => {
    const isEditing = showCourseFields[items.id];

    return (
      <Card className="border p-0 over-flow-hidden" key={items.id}>
        <Card.Body className="media media-xs overflow-visible">
          <i className="fa fa-question avatar brround avatar-md me-3"></i>
          <div className="media-body valign-middle">
            {!isEditing ? (
              <>
                <Link to="" className="fw-semibold text-dark">
                  {items.course_name}
                </Link>
                <span
                  onClick={() => handleEditCourseField(items.id)}
                  className="mx-3 py-2"
                >
                  <i className="fe fe-edit"></i>
                </span>
              </>
            ) : (
              <>
                <form className="d-flex">
                  <label htmlFor={`courseInput-${items.id}`} className="visually-hidden">
                    Enter Course...
                  </label>
                  <input
                    type="text"
                    id={`courseInput-${items.id}`}
                    name={`courseInput-${items.id}`}
                    className="form-control"
                    placeholder="Enter Course..."
                  />
                  <span className="mx-3 py-2 float-end">
                    <i className="fe fe-x"></i>
                  </span>
                  <span
                    onClick={() => handleUpdateCourseField(items.id)}
                    className="mx-3 py-2 float-end"
                  >
                    <i className="fe fe-check"></i>
                  </span>
                </form>
              </>
            )}
          </div>
          <div className="media-body valign-middle text-end overflow-visible mt-2"></div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Row className="profiletab">
      {courses.map((items) => (
        <Col lg={6} md={12} key={items.id}>
          {renderCourse(items)}
        </Col>
      ))}
    </Row>
  );
};

export default ShowProperty;
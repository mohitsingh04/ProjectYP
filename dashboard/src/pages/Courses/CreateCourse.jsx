import Swal from "sweetalert2";
import { useFormik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ALLImages from "../../common/Imagesdata";
import { API } from "../../context/API";
import { createCourseValidation } from "../../context/ValidationSchemas";

export default function CreateCourse() {
  const navigator = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
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
    if (
      !authUser?.permissions?.some((item) => item.value === "Create Course")
    ) {
      navigator("/dashboard/access-denied");
    }
  }

  const initialValues = {
    course_name: "",
    duration_value: "",
    duration_type: "",
    course_type: "",
    certification_type: "",
    status: "",
    course_level: "",
    course_short_name: "",
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("userId", authUser?.uniqueId);
    formData.append("course_name", values.course_name);
    formData.append("course_short_name", values.course_short_name);
    formData.append("course_type", values.course_type);
    formData.append("course_level", values.course_level);
    formData.append("certification_type", values.certification_type);
    formData.append("description", content);
    formData.append(
      "duration",
      `${values.duration_value} ${values.duration_type}`
    );
    if (values.image) {
      formData.append("image", values.image);
    }
    setBtnLoading(true);
    try {
      const response = await API.post(`/course`, formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Course added successfully.",
      }).then(() => {
        navigator(`/dashboard/course`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response.data.error ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCourseValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
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
            <Breadcrumb.Item active>Create</Breadcrumb.Item>
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
            <Card.Header>
              <h5 className="mb-0">Create Course</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Row className="gy-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Course Type</Form.Label>
                      <Form.Select
                        name="course_type"
                        value={formik.values.course_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.errors.course_type}
                      >
                        <option value="">Select Course</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Retreat">Retreat</option>
                        <option value="Teacher Training">
                          Teacher Training
                        </option>
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {formik.errors.course_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="course_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.course_name}
                        placeholder="Enter course name"
                        isInvalid={formik.errors.course_name}
                      />
                    </Form.Group>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.course_name}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Course Short Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="course_short_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.course_short_name}
                        placeholder="Enter short name"
                        isInvalid={formik.errors.course_short_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.course_short_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Duration</Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="duration_value"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration_value}
                            placeholder="Enter duration"
                            isInvalid={formik.errors.duration_value}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.duration_value}
                          </Form.Control.Feedback>
                        </Col>
                        <Col md={6}>
                          <Form.Select
                            name="duration_type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.duration_type}
                            isInvalid={formik.errors.duration_type}
                          >
                            <option value="">Select</option>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                            <option value="Weeks">Weeks</option>
                            <option value="Month">Month</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.duration_type}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Course Level</Form.Label>
                      <Form.Select
                        name="course_level"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.course_level}
                        isInvalid={formik.errors.course_level}
                      >
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.course_level}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Certification Type</Form.Label>
                      <Form.Select
                        name="certification_type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.certification_type}
                        isInvalid={formik.errors.certification_type}
                      >
                        <option value="">Select</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Degree">Degree</option>
                        <option value="Bachlore">Bachlore</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.certification_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>Course Description</Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        className="overflow-auto"
                        onChange={(newContent) => setContent(newContent)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <p>
                      <strong>Course Image</strong>
                    </p>
                    <img
                      src={previewImage ? previewImage : ALLImages("face8")}
                      className="img-fluid w-100 mb-2"
                      width={`350px`}
                      alt=""
                    />
                    <Form.Group className="text-end">
                      <Form.Control
                        type="file"
                        onChange={handleImageChange}
                        accept=".jpg,.png"
                        id={`course_image`}
                        className="d-none"
                      />
                      <Form.Label
                        htmlFor="course_image"
                        className="btn btn-primary"
                      >
                        <i className="fe fe-upload me-1"></i> Upload Course
                        Image
                      </Form.Label>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={btnLoading}
                    >
                      <i className="fe fe-check-circle me-1"></i>
                      {btnLoading ? "Saving..." : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Breadcrumb, Col, Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Skeleton from "react-loading-skeleton";

export default function EditPropertyCourse() {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { objectId } = useParams();
  const [propertyCourse, setPropertyCourse] = useState("");
  const [courseTypes, setCourseTypes] = useState([]);
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(true);

  const getPropertyCourse = useCallback(() => {
    API.get(`/property-course/${objectId}`).then(({ data }) => {
      setPropertyCourse(data);
      setLoading(false);
    });
  }, [objectId]);

  useEffect(() => {
    getPropertyCourse();
    getCourse();
  }, [getPropertyCourse]);

  useEffect(() => {
    setDescription(propertyCourse?.description);
  }, [propertyCourse]);

  const getCourse = () => {
    API.get("/course").then(({ data }) => {
      const uniqueCourseTypes = [
        ...new Set(data.map((item) => item.course_type)),
      ];
      setCourseTypes(uniqueCourseTypes);
    });
  };

  const [durationValue, setDurationValue] = useState("");
  const [durationType, setDurationType] = useState("");

  useEffect(() => {
    if (propertyCourse) {
      const [value, type] = propertyCourse.duration.split(" ");
      setDurationValue(value);
      setDurationType(type);
    }
    setDescription(propertyCourse?.description);
  }, [propertyCourse]);

  const initialValues = {
    course_name: propertyCourse?.course_name || "",
    course_type: propertyCourse?.course_type || "",
    shortName: propertyCourse?.course_short_name || "",
    courseDuration: durationValue || "",
    durationType: durationType || "",
    course_level: propertyCourse?.course_level || "",
    course_price: propertyCourse?.price || "",
    price_rupee: propertyCourse?.price_rupee || "",
  };

  const validationSchema = Yup.object({
    course_type: Yup.string().required("Course type is required."),
    course_name: Yup.string().required("Course name is required."),
    shortName: Yup.string(),
    courseDuration: Yup.number()
      .typeError("Duration must be a number.")
      .required("Course duration is required.")
      .min(0, "Duration cannot be negative."),
    durationType: Yup.string().required("Duration type is required."),
    course_level: Yup.string().required("Course Level is required."),
    course_price: Yup.string()
      .required("Course price is required.")
      .min(0, "Course Price cannot be negative."),
    price_rupee: Yup.string()
      .required("Course price is required.")
      .min(0, "Course Price cannot be negative."),
  });

  const onSubmit = async (values) => {
    try {
      const data = {
        course_name: values.course_name,
        course_type: values.course_type,
        course_short_name: values.shortName,
        duration: `${values.courseDuration} ${values.durationType}`,
        price: values.course_price,
        price_rupee: values.price_rupee,
        course_level: values.course_level,
        description: description,
      };
      API.patch(`/property-course/${objectId}`, data).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate(
            `/dashboard/view/course/${propertyCourse?.property_name}/${objectId}`
          );
          window.location.reload();
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Course</h1>
          {!loading ? (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Course
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                {propertyCourse.property_name}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                {propertyCourse.uniqueId}
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
        <div className="col-md-12 col-lg-12">
          <Card>
            {!loading ? (
              <>
                {" "}
                <Card.Header>
                  <h3 className="card-title">Edit Course</h3>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="courseName">Course Full Name</label>
                          <input
                            type="text"
                            name="course_name"
                            id="courseName"
                            className="form-control bg-white"
                            value={formik.values.course_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled
                          />
                          {formik.errors.course_name &&
                          formik.touched.course_name ? (
                            <span className="text-danger">
                              {formik.errors.course_name}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="courseType">Course Type</label>
                          <select
                            type="select"
                            name="course_type"
                            id="courseType"
                            className="form-control"
                            value={formik.values.course_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">-- Select Course --</option>
                            {courseTypes.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          {formik.errors.course_type &&
                          formik.touched.course_type ? (
                            <span className="text-danger">
                              {formik.errors.course_type}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="shortName">Course Short Name</label>
                          <input
                            className="form-control"
                            id="shortName"
                            placeholder="Course Short Name"
                            name="shortName"
                            value={formik.values.shortName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.shortName &&
                          formik.touched.shortName ? (
                            <span className="text-danger">
                              {formik.errors.shortName}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="courseDuration">Duration</label>
                          <div className="d-flex">
                            <input
                              type="number"
                              placeholder="Course Duration"
                              className="form-control"
                              name="courseDuration"
                              value={formik.values.courseDuration}
                              min={0}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <select
                              id="courseDuration"
                              name="durationType"
                              className="form-control ms-3"
                              value={formik.values.durationType}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="">--Duration Type--</option>
                              {["Hours", "Days", "Weeks", "Month", "Year"].map(
                                (duration, index) => (
                                  <option
                                    key={index}
                                    value={duration}
                                    selected={
                                      duration === formik.values.durationType
                                    }
                                  >
                                    {duration}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          {formik.errors.courseDuration &&
                          formik.touched.courseDuration ? (
                            <span className="text-danger">
                              {formik.errors.courseDuration}
                            </span>
                          ) : (
                            <span />
                          )}
                          {formik.errors.durationType &&
                          formik.touched.durationType ? (
                            <span className="text-danger">
                              {formik.errors.durationType}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="courseLevel">Course Level</label>
                          <select
                            name="course_level"
                            className="form-control"
                            value={formik.values.course_level}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">--Select Level--</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                          {formik.errors.course_level &&
                          formik.touched.course_level ? (
                            <span className="text-danger">
                              {formik.errors.course_level}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="coursePrice">Course Price</label>
                          <div className="d-flex">
                            <div class="input-group mb-3">
                              <span class="input-group-text" id="basic-addon1">
                                $
                              </span>
                              <input
                                type="number"
                                id="coursePrice"
                                className="form-control"
                                name="course_price"
                                min={1}
                                placeholder="Enter Amount ₹"
                                value={formik.values.course_price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            <div class="input-group mb-3 ms-3">
                              <span class="input-group-text" id="basic-addon1">
                                ₹
                              </span>
                              <input
                                type="number"
                                class="form-control"
                                name="price_rupee"
                                placeholder="Price in Rupees"
                                value={formik.values.price_rupee}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                          {formik.errors.course_price &&
                          formik.touched.course_price ? (
                            <span className="text-danger">
                              {formik.errors.course_price}
                            </span>
                          ) : (
                            <span />
                          )}
                          {formik.errors.price_rupee &&
                          formik.touched.price_rupee ? (
                            <span className="text-danger">
                              {formik.errors.price_rupee}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                      <Col className="mb-3">
                        <label>Description</label>
                        <Editor
                          apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          onChange={() =>
                            setDescription(editorRef.current.getContent())
                          }
                          onBlur={formik.handleBlur}
                          name={"description"}
                          init={{
                            height: 200,
                            menubar: false,
                            plugins:
                              process.env.REACT_APP_TINYEDITORPLUGINS?.split(
                                " "
                              ),
                            toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                            content_style:
                              process.env.REACT_APP_TINYEDITORSTYLE,
                          }}
                          initialValue={description}
                        />
                      </Col>
                    </Row>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </Card.Body>
              </>
            ) : (
              <Card.Body>
                <Skeleton height={25} count={8} className="my-2" />
              </Card.Body>
            )}
          </Card>
        </div>
      </Row>
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Breadcrumb, Col, Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { Editor } from "@tinymce/tinymce-react";

export default function EditPropertyCourse() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { objectId } = useParams();
  const [propertyCourse, setPropertyCourse] = useState("");
  const [courseTypes, setCourseTypes] = useState([]);
  const [description, setDescription] = useState();

  const getPropertyCourse = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property-course/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setPropertyCourse(data);
    });
  }, [objectId, dispatch]);

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
  };

  const validationSchema = Yup.object({
    course_type: Yup.string().required("Course type is required."),
    course_name: Yup.string().required("Course name is required."),
    shortName: Yup.string().required("Course Short Name is required."),
    courseDuration: Yup.number()
      .typeError("Duration must be a number.")
      .required("Course duration is required.")
      .min(0, "Duration cannot be negative."),
    durationType: Yup.string().required("Duration type is required."),
    course_level: Yup.string().required("Course Level is required."),
    course_price: Yup.string()
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
        course_level: values.course_level,
        description: description,
      };
      dispatch(showLoading());
      API.patch(`/property-course/${objectId}`, data).then((response) => {
        dispatch(hideLoading());
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
      dispatch(hideLoading());
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
                      {formik.errors.shortName && formik.touched.shortName ? (
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
                          {["Days", "Weeks", "Month", "Year"].map(
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
                      <input
                        type="number"
                        id="coursePrice"
                        className="form-control"
                        name="course_price"
                        min={0}
                        placeholder="Enter Amount ₹"
                        value={formik.values.course_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.course_price &&
                      formik.touched.course_price ? (
                        <span className="text-danger">
                          {formik.errors.course_price}
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
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
          </Card>
        </div>
      </Row>
    </div>
  );
}

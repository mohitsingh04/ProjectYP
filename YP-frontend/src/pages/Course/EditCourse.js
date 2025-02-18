import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import DataRequest from "../../context/DataRequest";
import defaultCourse from "../../Images/defaultcourse.webp";

export default function EditCourse() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { objectId } = useParams();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [course, setCourse] = useState([]);
  const [status, setStatus] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [courseImage, setCourseImage] = useState("");

  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/course/${objectId}`);
        setCourse(data);
        setDescription(data.description);
        setCourseImage(data.image[0]);
      } catch (err) {
        setError("Failed to fetch course data");
      }
    };
    const getStatus = () => {
      API.get("/status").then(({ data }) => {
        setStatus(data);
      });
    };
    fetchCourse();
    getStatus();
  }, [objectId, dispatch]);

  const initialValues = {
    course_type: course.course_type || "",
    course_name: course.course_name || "",
    course_short_name: course.course_short_name || "",
    duration_value: course.duration ? course.duration.split(" ")[0] : "",
    duration_unit: course.duration ? course.duration.split(" ")[1] : "Days",
    image: course.image || "",
    course_level: course.course_level || "",
    status: course.status || "",
  };

  const validationSchema = Yup.object({
    course_type: Yup.string().required("Course type is required."),
    course_name: Yup.string().required("Course full name is required."),
    course_short_name: Yup.string().required("Course short name is required."),
    duration_value: Yup.string().required("Course duration is required."),
    duration_unit: Yup.string().required("Course duration unit is required."),
    course_level: Yup.string().required("Course level is required."),
    status: Yup.string().required("Status is required."),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("course_type", values.course_type);
      formData.append("course_name", values.course_name);
      formData.append("course_short_name", values.course_short_name);
      formData.append(
        "duration",
        `${values.duration_value} ${values.duration_unit}`
      );
      formData.append("description", description);
      formData.append("image", values.image);
      formData.append("course_level", values.course_level);
      formData.append("status", values.status);

      dispatch(showLoading());

      const response = await API.patch(`/course/${objectId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(hideLoading());
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/dashboard/course");
      } else if (response.data.error) {
        setError(response.data.error);
        toast.error(response.data.error);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Update Course"
  );

  if (!hasPermission) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        USER DOES NOT HAVE THE RIGHT ROLES.
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Course</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item">
              <Link to="/dashboard/">Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item breadcrumds"
              aria-current="page"
            >
              <Link to="/dashboard/course/">Course</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active"
              aria-current="page"
            >
              Edit
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active"
              aria-current="page"
            >
              {course.uniqueId}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/dashboard/course/"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-arrow-left"></i>&nbsp;
            </span>
            Back
          </Link>
        </div>
      </div>

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              <h3 className="card-title">Edit Course</h3>
              <div className="ms-auto pageheader-btn">
                <Link
                  to={`/dashboard/course-seo/add/${course.uniqueId}`}
                  className="btn btn-primary btn-icon text-white me-3"
                >
                  Add Course Seo
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {error && (
                  <div className="alert alert-danger">
                    <small>{error}</small>
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Course Type</Form.Label>
                      <select
                        name="course_type"
                        className="form-control"
                        value={values.course_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select Type--</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Degree">Degree</option>
                        <option value="Bachlore">Bachlore</option>
                      </select>
                      {errors.course_type && touched.course_type && (
                        <span className="text-danger">
                          {errors.course_type}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Course Full Name</Form.Label>
                      <input
                        type="text"
                        name="course_name"
                        className="form-control"
                        placeholder="Course Full Name"
                        value={values.course_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.course_name && touched.course_name && (
                        <span className="text-danger">
                          {errors.course_name}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Course Short Name</Form.Label>
                      <input
                        type="text"
                        name="course_short_name"
                        className="form-control"
                        placeholder="Course Short Name"
                        value={values.course_short_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.course_short_name &&
                        touched.course_short_name && (
                          <span className="text-danger">
                            {errors.course_short_name}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Course Duration</Form.Label>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <input
                          type="number"
                          name="duration_value"
                          className="form-control"
                          placeholder="Course Duration"
                          value={values.duration_value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ marginRight: "10px" }}
                        />
                        <select
                          name="duration_unit"
                          className="form-control"
                          value={values.duration_unit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="Hours">Hours</option>
                          <option value="Days">Days</option>
                          <option value="Weeks">Weeks</option>
                          <option value="Month">Month</option>
                        </select>
                      </div>
                      {errors.duration_value && touched.duration_value && (
                        <span className="text-danger">
                          {errors.duration_value}
                        </span>
                      )}
                      {errors.duration_unit && touched.duration_unit && (
                        <span className="text-danger">
                          {errors.duration_unit}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Course Level</Form.Label>
                      <select
                        name="course_level"
                        className="form-control"
                        placeholder="Course Level"
                        value={values.course_level}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select Level--</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      {errors.course_level && touched.course_level && (
                        <span className="text-danger">
                          {errors.course_level}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-12 mb-3">
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Editor
                        apiKey="2208d39gvqf0t85mghgd0dkeiea75lcrl5ffsyn3y8ulwsy8"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={() =>
                          setDescription(editorRef.current.getContent())
                        }
                        onBlur={handleBlur}
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
                        initialValue={course.description}
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <input
                        type="file"
                        name="image"
                        accept="image/jpeg, image/png"
                        className="form-control"
                        onChange={(e) => {
                          let file = e.target.files[0];
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setFieldValue("image", file);
                              setPreviewImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        onBlur={handleBlur}
                      />
                      {previewImage ? (
                        <img
                          src={previewImage}
                          className="mt-1"
                          width="100"
                          alt="Preview"
                        />
                      ) : courseImage === null ? (
                        <img
                          src={defaultCourse}
                          className="mt-1"
                          width="100"
                          alt="Course"
                        />
                      ) : (
                        <img
                          src={`http://localhost:5000/${courseImage}`}
                          className="mt-1"
                          width="100"
                          alt="Course"
                        />
                      )}
                      {errors.image && touched.image && (
                        <span className="text-danger">{errors.image}</span>
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <select
                        name="status"
                        className="form-control"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {status.map((item, key) => (
                          <option key={key} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.status && touched.status ? (
                        <small className="text-danger">{errors.status}</small>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="form-footer mt-2">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

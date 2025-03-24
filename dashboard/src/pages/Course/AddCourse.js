import React, { useState, useRef, useEffect, useCallback } from "react";
import DataRequest from "../../context/DataRequest";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { toast } from "react-toastify";

export default function AddCourse() {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const mainUser = DataRequest();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [authPermissions, setAuthPermissions] = useState([]);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(`/user/${mainUser?.User?._id}`);
      setAuthUser(response.data);
      setAuthLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [mainUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setAuthPermissions(authUser?.permissions);
  }, [authUser]);

  const initialValues = {
    course_type: "",
    course_name: "",
    course_short_name: "",
    duration_value: "",
    duration_unit: "",
    image: "",
    certification_type: "",
    course_level: "",
  };

  const validationSchema = Yup.object({
    course_type: Yup.string().required("Course type is required."),
    certification_type: Yup.string().required(
      "Certification type is required."
    ),
    course_name: Yup.string()
      .min(3, "Course Name must be at least 3 characters long.")
      .required("Course Name is required."),

    course_short_name: Yup.string(),
    duration_value: Yup.number()
      .typeError("Duration must be a number.")
      .required("Course duration is required.")
      .min(0, "Duration cannot be negative."),

    duration_unit: Yup.string().required("Course duration unit is required."),
    course_level: Yup.string().required("Course level is required."),
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
      formData.append("certification_type", values.certification_type);

      const response = await API.post("/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/dashboard/course");
      } else if (response.data.error) {
        setError(response.data.error);
        toast.error(response.data.error);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
      const hasPermission = authPermissions?.some(
        (item) => item.value === "Create Course"
      );

      if (!hasPermission) {
        return (
          <div className="position-absolute top-50 start-50 translate-middle">
            <h2 className="text-danger fw-bold">Access Denied</h2>
            <p>You do not have the required permissions to access this page.</p>
          </div>
        );
      }
    }
  }
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Course</h1>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/dashboard/course" }}
            >
              Course
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/dashboard/course/" className="btn btn-primary">
            <span>
              <i className="fe fe-arrow-left me-1"></i>
            </span>
            Back to Course
          </Link>
        </div>
      </div>

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              <h3 className="card-title">Add Course</h3>
            </Card.Header>
            <Card.Body>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                {error && (
                  <div className="alert alert-danger">
                    <small>{error}</small>
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="course_type">Course Type</Form.Label>
                      <select
                        name="course_type"
                        id="course_type"
                        className="form-control"
                        value={formik.values.course_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">--Select Type--</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Retreat">Retreat</option>
                        <option value="Teacher Traning">Teacher Traning</option>
                      </select>
                      {formik.errors.course_type &&
                        formik.touched.course_type && (
                          <span className="text-danger">
                            {formik.errors.course_type}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="course_name">
                        Course Full Name
                      </Form.Label>
                      <input
                        type="text"
                        name="course_name"
                        id="course_name"
                        className="form-control"
                        placeholder="Course Full Name"
                        value={formik.values.course_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.course_name &&
                        formik.touched.course_name && (
                          <span className="text-danger">
                            {formik.errors.course_name}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="course_short_name">
                        Course Short Name
                      </Form.Label>
                      <input
                        type="text"
                        name="course_short_name"
                        id="course_short_name"
                        className="form-control"
                        placeholder="Course Short Name"
                        value={formik.values.course_short_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.course_short_name &&
                        formik.touched.course_short_name && (
                          <span className="text-danger">
                            {formik.errors.course_short_name}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="duration_value">
                        Course Duration
                      </Form.Label>
                      <div className="d-flex justify-content-between">
                        <input
                          type="number"
                          name="duration_value"
                          id="duration_value"
                          className="form-control"
                          placeholder="Course Duration"
                          value={formik.values.duration_value}
                          onChange={formik.handleChange}
                          min={0}
                          onBlur={formik.handleBlur}
                          style={{ marginRight: "10px" }}
                        />
                        <select
                          name="duration_unit"
                          className="form-control"
                          value={formik.values.duration_unit}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">--Select Type--</option>
                          <option value="Hours">Hours</option>
                          <option value="Days">Days</option>
                          <option value="Weeks">Weeks</option>
                          <option value="Month">Month</option>
                          <option value="Year">Year</option>
                        </select>
                      </div>
                      {formik.errors.duration_value &&
                        formik.touched.duration_value && (
                          <span className="text-danger">
                            {formik.errors.duration_value}
                          </span>
                        )}
                      {formik.errors.duration_unit &&
                        formik.touched.duration_unit && (
                          <span className="text-danger float-end">
                            {formik.errors.duration_unit}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="course_level">
                        Course Level
                      </Form.Label>
                      <select
                        name="course_level"
                        id="course_level"
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
                        formik.touched.course_level && (
                          <span className="text-danger">
                            {formik.errors.course_level}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="certification_type">
                        Certification Type
                      </Form.Label>
                      <select
                        name="certification_type"
                        id="certification_type"
                        className="form-control"
                        value={formik.values.certification_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">--Select Level--</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Degree">Degree</option>
                        <option value="Bachlore">Bachlore</option>
                      </select>
                      {formik.errors.certification_type &&
                        formik.touched.certification_type && (
                          <span className="text-danger">
                            {formik.errors.certification_type}
                          </span>
                        )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-12 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="description">Description</Form.Label>
                      <Editor
                        apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                        id="description"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={() =>
                          setDescription(editorRef.current.getContent())
                        }
                        onBlur={formik.handleBlur}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins:
                            process.env.REACT_APP_TINYEDITORPLUGINS?.split(" "),
                          toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                          content_style: process.env.REACT_APP_TINYEDITORSTYLE,
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="course_image">Image</Form.Label>
                      <input
                        type="file"
                        name="image"
                        id="course_image"
                        accept="image/jpeg, image/png"
                        className="form-control"
                        onChange={(e) => {
                          let file = e.target.files[0];
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              formik.setFieldValue("image", file);
                              setPreviewImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      {previewImage && (
                        <div className="col-md-3 p-0">
                          <img src={previewImage} alt="Preview" />
                        </div>
                      )}
                      {formik.errors.image && formik.touched.image && (
                        <span className="text-danger">
                          {formik.errors.image}
                        </span>
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="form-footer mt-2">
                  <button type="submit" className="btn btn-primary">
                    Add
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

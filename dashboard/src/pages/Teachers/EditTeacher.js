import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import * as Yup from "yup";
import { useFormik } from "formik";
import defaultProfile from "../../Images/DefaultProfile.jpg";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

export default function EditTeacher() {
  const navigate = useNavigate();
  const { property_name, objectId } = useParams();
  const [previewProfile, setPreviewProfile] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTeacher = useCallback(() => {
    API.get(`/teacher/${objectId}`).then(({ data }) => {
      setTeacher(data);
      setLoading(false);
    });
  }, [objectId]);

  const getStatus = useCallback(() => {
    API.get(`/status/`).then(({ data }) => {
      setStatus(data);
      const mainStatus = data.filter((item) => item.name === "Category");
      if (mainStatus) {
        setStatus(mainStatus);
      }
    });
  }, []);

  useEffect(() => {
    getTeacher();
    getStatus();
  }, [getTeacher, getStatus]);

  const exp = teacher?.experience?.split(" ");
  const expValue = exp?.[0];
  const expType = exp?.[1];

  const initialValues = {
    teacher_name: teacher.teacher_name || "",
    profile: teacher?.profile?.[0] || "",
    designation: teacher?.designation || "",
    experience_value: expValue || "",
    experience_type: expType || "",
    status: teacher?.status || "",
  };

  const validationSchema = Yup.object({
    teacher_name: Yup.string()
      .min(3, "Teacher Name must be at least 3 characters long.")
      .required("Teacher Name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Teacher Name can only contain alphabets and spaces."
      ),
    profile: Yup.string(),
    designation: Yup.string().required("Designation is required."),
    experience_value: Yup.number()
      .required("Experience Value is required.")
      .min(0, "Experience cannot be negative."),
    experience_type: Yup.string().required("Experience Type is required."),
    status: Yup.string().required("Status is required."),
  });

  const onSubmit = async (values) => {
    let formData = new FormData();
    formData.append("teacher_name", values.teacher_name);
    formData.append("designation", values.designation);
    formData.append(
      "experience",
      `${values.experience_value} ${values.experience_type}`
    );
    formData.append("status", values.status);
    if (values.profile) {
      formData.append("profile", values.profile);
    }

    API.patch(`/teacher/${objectId}`, formData).then((response) => {
      if (response.data.message) {
        toast.success(response.data.message);
        navigate(`/dashboard/view/teacher/${property_name}/${objectId}`);
      } else if (response.data.error) {
        toast.error(response.data.message);
      }
    });
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Teacher</h1>
            {!loading ? (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  Edit
                </Breadcrumb.Item>
                <Breadcrumb.Item className="breadcrumb-item">
                  Teacher
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item breadcrumds"
                  aria-current="page"
                >
                  {property_name}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {teacher.teacher_name}
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

        <Card className="border p-0">
          {!loading && (
            <Card.Header>
              <h4 className="fs-16 text-dark fw-semibold">Edit Teacher</h4>
            </Card.Header>
          )}
          {!loading ? (
            <>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Card.Body className="">
                  <Row>
                    <Col md="6">
                      <div className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <input
                          type="text"
                          name="teacher_name"
                          className="form-control"
                          placeholder="Enter Teacher Name..."
                          value={values.teacher_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.teacher_name && touched.teacher_name ? (
                          <span className="text-danger">
                            {errors.teacher_name}
                          </span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="mb-3">
                        <Form.Label>Designation</Form.Label>
                        <input
                          type="text"
                          name="designation"
                          className="form-control"
                          placeholder="Enter Teacher Designation..."
                          value={values.designation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.designation && touched.designation ? (
                          <span className="text-danger">
                            {errors.designation}
                          </span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="mb-3">
                        <Form.Label>Experience</Form.Label>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <input
                            type="number"
                            name="experience_value"
                            id="experience_value"
                            className="form-control"
                            placeholder="Experence ..."
                            value={values.experience_value}
                            onChange={handleChange}
                            min={0}
                            onBlur={handleBlur}
                            style={{ marginRight: "10px" }}
                          />
                          <select
                            name="experience_type"
                            className="form-control"
                            value={values.experience_type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">--Select Type--</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                          </select>
                        </div>
                        {errors.experience_value && touched.experience_value ? (
                          <span className="text-danger">
                            {errors.experience_value}
                          </span>
                        ) : (
                          <span />
                        )}
                        {errors.experience_type && touched.experience_type ? (
                          <span className="text-danger float-end">
                            {errors.experience_type}
                          </span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <select
                          name="status"
                          className="form-control"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select Status--</option>
                          {status.map((item, key) => (
                            <option key={key} value={item.parent_status}>
                              {item.parent_status}
                            </option>
                          ))}
                        </select>
                        {errors.status && touched.status ? (
                          <span className="text-danger">{errors.status}</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="mb-3">
                        <Form.Label>Profile</Form.Label>
                        <input
                          type="file"
                          name="profile"
                          className="form-control"
                          accept="image/jpeg, image/png"
                          onChange={(e) => {
                            let reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setFieldValue("profile", e.target.files[0]);
                                setPreviewProfile(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                          onBlur={handleBlur}
                        />
                        <img
                          className="mt-1"
                          src={
                            previewProfile
                              ? previewProfile
                              : teacher?.profile?.[0]
                              ? `${process.env.REACT_APP_MEDIA_URL}/${teacher?.profile?.[0]}`
                              : defaultProfile
                          }
                          width="100"
                          alt=""
                        />
                        {errors.profile && touched.profile ? (
                          <span className="text-danger">{errors.profile}</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </Card.Footer>
              </form>
            </>
          ) : (
            <Card.Body>
              <Skeleton className="my-2" count={8} height={25} />
            </Card.Body>
          )}
        </Card>
      </div>
    </>
  );
}

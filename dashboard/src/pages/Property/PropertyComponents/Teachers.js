import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import defaultProfile from "../../../Images/DefaultProfile.jpg";

export default function Teachers() {
  const navigate = useNavigate();
  const { objectId } = useParams();
  const { User } = DataRequest();
  const [teachers, setTeachers] = useState([]);
  const [property, setProperty] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const [showTeacherForm, setShowTeacherForm] = useState(true);

  const getProperty = useCallback(() => {
    API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
    });
  }, [objectId]);

  const getTeachers = useCallback(() => {
    API.get("/teacher").then(({ data }) => {
      setTeachers(data);
      setTeachers(
        data.filter(
          (teachers) => teachers.property_id === parseInt(property?.uniqueId)
        )
      );
    });
  }, [property]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  const handleAddTeacher = () => {
    setShowTeacherForm(!showTeacherForm);
  };

  const handleHideTeacherForm = () => {
    setShowTeacherForm(true);
  };

  const initialValues = {
    teacher_name: "",
    profile: "",
    designation: "",
    experience_value: "",
    experience_type: "",
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
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      values = {
        ...values,
        userId: User.uniqueId,
        property_id: property.uniqueId,
        property_name: property.property_name,
      };
      let formData = new FormData();
      formData.append("teacher_name", values.teacher_name);
      formData.append("property_id", values.property_id);
      formData.append("property_name", values.property_name);
      formData.append("userId", values.userId);
      formData.append("designation", values.designation);
      formData.append(
        "experience",
        `${values.experience_value} ${values.experience_type}`
      );
      if (
        typeof values.profile == "object" ||
        typeof values.profile != "object"
      ) {
        formData.append("profile", values.profile);
        API.post("/teacher", formData).then((response) => {
          if (response.data.message) {
            toast.success(response.data.message);
            resetForm();
            setShowTeacherForm(true);
            getTeachers();
            setPreviewProfile("");
            window.location.reload();
          } else if (response.data.error) {
            toast.error(response.data.message);
          }
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
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
  });

  const deleteTeacher = (id) => {
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
          const deleteResponse = await API.delete(`/teacher/${id}`);
          toast.success(deleteResponse.data.message);
          getTeachers();
        }
      });
    } catch (error) {
      console.error(error?.message);
    }
  };

  const columns = [
    {
      name: "S.NO",
      selector: (row) => row.uniqueId,
      sortable: true,
    },
    {
      name: "Teacher Name",
      selector: (row) =>
        !row.profile[0] ? (
          <img src={defaultProfile} width={53} alt={row.profile} />
        ) : (
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/${row.profile[0]}`}
            width={53}
            alt={row.profile}
          />
        ),
      sortable: true,
    },
    {
      name: "Teacher Name",
      selector: (row) => row.teacher_name,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <>
          <button
            data-bs-toggle="tooltip"
            title="View"
            onClick={() =>
              navigate(
                `/dashboard/view/teacher/${property?.property_name}/${row._id}`
              )
            }
          >
            <i className="fe fe-eye"></i>
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Edit"
            onClick={() =>
              navigate(
                `/dashboard/edit/teacher/${property?.property_name}/${row._id}`
              )
            }
          >
            <i className="fe fe-edit"></i>
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Delete"
            onClick={() => deleteTeacher(row._id)}
          >
            <i className="fe fe-trash-2"></i>
          </button>
        </>
      ),
    },
  ];

  const data = teachers;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      {showTeacherForm ? (
        <>
          {teachers != null ? (
            <>
              <Row>
                <Col md={12}>
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                      <h5>
                        <strong>Teachers</strong>
                      </h5>
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowTeacherForm(false)}
                      >
                        Add Teacher
                      </button>
                    </Card.Header>
                    <Card.Body>
                      <div className="tab-pane " id="tab-61">
                        <span className="widget-users row profiletab  mb-5">
                          <DataTableExtensions {...tableData}>
                            <DataTable
                              columns={columns}
                              data={data}
                              noHeader
                              defaultSortField="id"
                              defaultSortAsc={false}
                              striped
                              center
                              persistTableHead
                              pagination
                              highlightOnHover
                            />
                          </DataTableExtensions>
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <div className="tab-pane " id="tab-61">
                <span className="widget-users row profiletab  mb-5">
                  <li className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <Card className="border p-0">
                      <Button onClick={handleAddTeacher} variant="default">
                        <Card.Body className="text-center">
                          <img
                            className="avatar avatar-xxl brround cover-image mt-2"
                            src="data:image/png;base64,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"
                            alt=""
                          />
                          <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                            Add a New Teacher
                          </h4>
                        </Card.Body>
                      </Button>
                    </Card>
                  </li>
                </span>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Card className="border p-0">
              <Card.Header>
                <h4 className="fs-16 text-dark fw-semibold">
                  Add a New Teacher
                </h4>
              </Card.Header>
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
                  <Col md="12">
                    <div className="mb-3">
                      <Form.Label>Profile</Form.Label>
                      <input
                        type="file"
                        name="profile"
                        className="form-control"
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
                        src={previewProfile}
                        className="mt-1"
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
                  Add
                </Button>
                <Button
                  onClick={handleHideTeacherForm}
                  variant="danger"
                  className="ms-1"
                >
                  Cancel
                </Button>
              </Card.Footer>
            </Card>
          </form>
        </>
      )}
    </>
  );
}

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { API } from "../../context/Api";
import Dropdown from "react-dropdown-select";

export default function CreateUser() {
  const [error, setError] = useState("");
  const [btnText, setBtnText] = useState("Add");
  const [permissionData, setPermissionData] = useState([]);
  const navigate = useNavigate();

  const initialValues = { name: "", email: "", mobile_no: "", role: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters long.")
      .required("Full name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabets and spaces."),

    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),

    mobile_no: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be a positive 10-digit number."
      )
      .required("Mobile number is required."),

    role: Yup.string().required("Role is Required"),
  });

  useEffect(() => {
    API.get("/permissions").then(({ data }) => {
      setPermissionData(data);
    }, []);
  }, []);

  const handleAddUser = async (values) => {
    try {
      setBtnText("Sending Mail...");
      const response = await API.post("/user/new", values);
      toast.success(response.data.message);
      resetForm();
      navigate("/dashboard/user");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleAddUser,
  });
  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">User</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Add
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                User
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link
              to="/dashboard/user/"
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
                <h3 className="card-title">Add User</h3>
              </Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {error ? (
                    <div className="alert alert-danger">
                      <small>{error}</small>
                    </div>
                  ) : (
                    <span />
                  )}
                  <div className="form-row">
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="name">User Name</Form.Label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="User Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                        />
                        {errors.name && touched.name ? (
                          <span className="text-danger">{errors.name}</span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="email">User Email</Form.Label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="User Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                        />
                        {errors.email && touched.email ? (
                          <span className="text-danger">{errors.email}</span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="mobile_no">
                          Phone Number
                        </Form.Label>
                        <input
                          type="text"
                          name="mobile_no"
                          id="mobile_no"
                          className="form-control"
                          placeholder="User Phone Number"
                          value={values.mobile_no}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.mobile_no && touched.mobile_no ? (
                          <span className="text-danger">
                            {errors.mobile_no}
                          </span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="role">User Role</Form.Label>
                        <select
                          name="role"
                          className="form-control"
                          id="role"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select Role--</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Property Manager">
                            Property Manager
                          </option>
                          <option value="User">User</option>
                        </select>
                        {errors.role && touched.role ? (
                          <small className="text-danger">{errors.role}</small>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col mb-3">
                      <Form.Group className="mb-3">
                        <Form.Label>Permission</Form.Label>
                        <Dropdown
                          options={permissionData.map((group) => ({
                            label: group.name,
                            value: group.name,
                          }))}
                          keepSelectedInList={false}
                          name="permissions"
                          id="permissions"
                          multi={true}
                          placeholder="Choose Permissions"
                          value={values.permission}
                          onChange={(value) =>
                            setFieldValue("permission", value)
                          }
                          onBlur={handleBlur}
                        />
                        {errors.permission && touched.permission ? (
                          <small className="text-danger">
                            {errors.permission}
                          </small>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                  </div>
                  <div className="form-footer mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={btnText !== "Add"}
                    >
                      {btnText}
                    </button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
}

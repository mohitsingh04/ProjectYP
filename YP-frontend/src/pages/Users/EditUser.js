import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Card, Form, FormGroup, Breadcrumb } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/Api";
import { toast } from "react-toastify";

export default function EditUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [status, setStatus] = useState([]);
  const [previewProfile, setPreviewProfile] = useState("");
  const { uniqueId } = useParams();

  useEffect(() => {
    API.get(`/user/${uniqueId}`).then(({ data }) => {
      setUser(data);
    }, []);
    API.get(`/status/`).then(({ data }) => {
      setStatus(data);
    }, []);
  }, []);

  const initialValues = {
    uniqueId: user.uniqueId,
    name: user.name || "",
    email: user.email || "",
    mobile_no: user.mobile_no || "",
    pincode: user.pincode || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    profile: user.profile || "",
    role: user.role || "",
    status: user.status || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name must be alphabets only!"),
    mobile_no: Yup.string()
      .min(10, "Please enter a valid mobile number!")
      .max(10, "Please enter a valid mobile number!")
      .required("Mobile number is required."),
    status: Yup.string().required("Status is required."),
    role: Yup.string().required("Role is required."),
    profile: Yup.string().required("Profile is required."),
  });

  const onSubmit = async (values) => {
    if (
      typeof values.profile == "object" ||
      typeof values.profile != "object"
    ) {
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      await API.patch(`/user/${user.uniqueId}`, formData).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/users");
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
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
    enableReinitialize: true,
  });

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">User</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item">
                <Link to="/dashboard/user/">User</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active"
                aria-current="page"
              >
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item active" href="#">
                {user.uniqueId}
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
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <form onSubmit={handleSubmit}>
                <Card.Header>
                  <Card.Title as="h3">Edit User</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex mb-3">
                    {previewProfile == "" ? (
                      <img
                        src={`http://localhost:5000/images/${user.profile}`}
                        className="rounded-circle avatar-lg me-2"
                        alt="user avatar"
                      />
                    ) : (
                      <img
                        src={previewProfile}
                        className="rounded-circle avatar-lg me-2"
                        alt="user avatar"
                      />
                    )}
                    <div className="ms-auto mt-xl-2 mt-lg-0 me-lg-2">
                      <input
                        type="file"
                        name="profile"
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
                      {errors.profile && touched.profile ? (
                        <small className="text-danger">{errors.profile}</small>
                      ) : (
                        <span />
                      )}
                      {/* <Link to="#" className="btn btn-danger btn-sm mt-1 mb-1 me-2">
                                                <i className="fe fe-camera-off me-1"></i>Delete profile
                                            </Link> */}
                    </div>
                  </div>
                  <br />
                  <Row>
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">First Name</label>
                        <Form.Control
                          type="text"
                          name="name"
                          className="form-control"
                          id="exampleInputname"
                          placeholder="First Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name ? (
                          <small className="text-danger">{errors.name}</small>
                        ) : (
                          <span />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="mt-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                    {/* {errors.email && touched.email ? <small className='text-danger'>{errors.email}</small> : <span />} */}
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <label htmlFor="exampleInputnumber">Contact Number</label>
                    <Form.Control
                      type="number"
                      name="mobile_no"
                      className="form-control"
                      id="exampleInputnumber"
                      placeholder="mobile number"
                      value={values.mobile_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                    {errors.mobile_no && touched.mobile_no ? (
                      <small className="text-danger">{errors.mobile_no}</small>
                    ) : (
                      <span />
                    )}
                  </FormGroup>
                  <Row className="mt-3">
                    <Col lg={8} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputaddress">Address</label>
                        <Form.Control
                          type="text"
                          name="address"
                          className="form-control"
                          id="exampleInputaddress"
                          placeholder="Address *"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.address && touched.address ? (
                          <small className="text-danger">
                            {errors.address}
                          </small>
                        ) : (
                          <span />
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={4} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputpincode">Pincode</label>
                        <Form.Control
                          type="number"
                          name="pincode"
                          className="form-control"
                          id="exampleInputpincode"
                          placeholder="Pincode *"
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputcity">City</label>
                        <Form.Control
                          type="text"
                          name="city"
                          className="form-control"
                          id="exampleInputcity"
                          placeholder="City *"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputstate">State</label>
                        <Form.Control
                          type="text"
                          name="state"
                          className="form-control"
                          id="exampleInputstate"
                          placeholder="State *"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                      <FormGroup>
                        <label htmlFor="exampleInputstatus">Status</label>
                        <select
                          name="status"
                          className="form-control"
                          id="exampleInputstatus"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select--</option>
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
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12} className="mt-2">
                      <FormGroup>
                        <label htmlFor="exampleInputRole">Role</label>
                        <select
                          name="role"
                          className="form-control"
                          id="exampleInputRole"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select Role--</option>
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="User">User</option>
                        </select>
                        {errors.role && touched.role ? (
                          <small className="text-danger">{errors.role}</small>
                        ) : (
                          <span />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="">
                  <button type="submit" className="btn btn-success mt-1 me-2">
                    Update
                  </button>
                </Card.Footer>
              </form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

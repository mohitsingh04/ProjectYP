import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Form,
  FormGroup,
  ListGroup,
  Breadcrumb,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/Api";
import ChangePassword from "../Auth/Password/ChangePassword";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";

export default function EditProfile() {
  const [user, setUser] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const navigate = useNavigate();
  const { User } = DataRequest();
  const [profileImg, setProfileImg] = useState("");

  const getUser = useCallback(async () => {
    if (User) {
      await API.get(`/user/${User?._id}`).then(({ data }) => {
        setUser(data);
        setProfileImg(data?.profile?.[0]);
      });
    }
  }, [User]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const initialValues = {
    uniqueId: user?._id,
    name: user?.name || "",
    email: user?.email || "",
    mobile_no: user?.mobile_no || "",
    pincode: user?.pincode || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    profile: profileImg,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name must be alphabets only!"),
    mobile_no: Yup.string()
      .min(10, "Please enter a valid mobile number!")
      .max(10, "Please enter a valid mobile number!")
      .required("Mobile number is required."),
    pincode: Yup.string().required("Pincode is required."),
    address: Yup.string().required("Address is required."),
    city: Yup.string().required("City is required."),
    state: Yup.string().required("State is required."),
    profile: Yup.string().required("Profile image is required."),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "email" && key !== "mobile_no") {
        formData.append(key, values[key]);
      }
    });
    try {
      const response = await API.patch(`/user/${User?._id}`, formData);
      console.log(response, User._id);
      toast.success(response.data.message);
      navigate(`/dashboard/my-profile`);
    } catch (err) {
      console.log(err);
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
    enableReinitialize: true,
  });

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Profile</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                href="#"
              >
                My Profile
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link
              to="/dashboard/my-profile"
              className="btn btn-primary btn-icon text-white me-3"
            >
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back to Profile
            </Link>
          </div>
        </div>

        <Row>
          <Col lg={12} xl={4} md={12} sm={12}>
            <ChangePassword />
            <Card className="panel-theme">
              <Card.Header>
                <div className="float-start">
                  <Card.Title as="h3">Contact</Card.Title>
                </div>
                <div className="clearfix"></div>
              </Card.Header>
              <Card.Body className="no-padding">
                <ListGroup className="no-margin">
                  <ListGroup.Item className="list-group-item">
                    <i className="fa fa-envelope list-contact-icons border text-center br-100"></i>
                    <span className="contact-icons">{user.email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <i className="fa fa-globe list-contact-icons border text-center br-100"></i>
                    <span className="contact-icons">
                      {user.address}, {user.city}, {user.state}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="list-group-item">
                    <i className="fa fa-phone list-contact-icons border text-center br-100"></i>
                    <span className="contact-icons">{user.mobile_no}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} xl={8} md={12} sm={12}>
            <Card>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Card.Header>
                  <Card.Title as="h3">Edit Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex mb-3">
                    {previewProfile === "" ? (
                      <img
                        src={`http://localhost:5000/${profileImg}`}
                        className="rounded-circle avatar-lg me-2"
                        alt="avatar"
                      />
                    ) : (
                      <img
                        src={previewProfile}
                        className="rounded-circle avatar-lg me-2"
                        alt="avatar"
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
                    </div>
                  </div>
                  <br />
                  <Row>
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="userName">First Name</label>
                        <Form.Control
                          type="text"
                          name="name"
                          className="form-control"
                          id="userName"
                          placeholder="First Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
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
                    <label htmlFor="email">Email address</label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      autoComplete="off"
                    />
                    {errors.email && touched.email ? (
                      <small className="text-danger">{errors.email}</small>
                    ) : (
                      <span />
                    )}
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <label htmlFor="mobile_no">Contact Number</label>
                    <Form.Control
                      type="number"
                      name="mobile_no"
                      className="form-control"
                      id="mobile_no"
                      placeholder="mobile number"
                      value={values.mobile_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                      autoComplete="off"
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
                        <label htmlFor="address">Address</label>
                        <Form.Control
                          type="text"
                          name="address"
                          className="form-control"
                          id="address"
                          placeholder="Address *"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
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
                        <label htmlFor="pincode">Pincode</label>
                        <Form.Control
                          type="number"
                          name="pincode"
                          className="form-control"
                          id="pincode"
                          placeholder="Pincode *"
                          value={values.pincode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />
                        {errors.pincode && touched.pincode ? (
                          <small className="text-danger">
                            {errors.pincode}
                          </small>
                        ) : (
                          <span />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <label htmlFor="city">City</label>
                        <Form.Control
                          type="text"
                          name="city"
                          className="form-control"
                          id="city"
                          placeholder="City *"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />
                        {errors.city && touched.city ? (
                          <small className="text-danger">{errors.city}</small>
                        ) : (
                          <span />
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg={6} md={12}>
                      <FormGroup>
                        <label htmlFor="state">State</label>
                        <Form.Control
                          type="text"
                          name="state"
                          className="form-control"
                          id="state"
                          placeholder="State *"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                        />
                        {errors.state && touched.state ? (
                          <small className="text-danger">{errors.state}</small>
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

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
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/authAction";
import DataRequest from "../../context/DataRequest";

export default function EditProfile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const navigate = useNavigate();
  const { User } = DataRequest();
  const [profileImg, setProfileImg] = useState("");

  const getUser = useCallback(async () => {
    await API.get(`/user/${User.uniqueId}`).then(({ data }) => {
      setUser(data);
      setProfileImg(data?.profile[0]);
    });
  }, [User]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  const initialValues = {
    uniqueId: user.uniqueId,
    name: user.name || "",
    email: user.email || "",
    mobile_no: user.mobile_no || "",
    pincode: user.pincode || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
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
    try {
      if (
        typeof values.profile == "object" ||
        typeof values.profile != "object"
      ) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
          console.log(value, values[value]);
        }
        navigate(`/dashboard/my-profile`);
        dispatch(updateUser(formData));
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
    enableReinitialize: true,
  });

  // const deleteUserProfile = (uniqueId) => {
  //     Swal.fire({
  //         title: "Are you sure?",
  //         text: "You won't be able to revert this!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes delete it!",
  //     })
  //         .then((result) => {
  //             if (result.isConfirmed) {
  //                 API.delete(`/user/profile/${uniqueId}`).then((response) => {
  //                     if (response.data.message) {
  //                         toast.success(response.data.message);
  //                     } else if (response.data.error) {
  //                         toast.error(response.data.error);
  //                     }
  //                 })
  //             }
  //             getUser();
  //         }).catch((error) => {
  //             console.log(error.message)
  //         })
  // }

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
                    <span className="contact-icons"> www.abcd.com</span>
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
                      {/* <i onClick={() => deleteUserProfile(user.uniqueId)} data-bs-toggle="tooltip" title="Remove Profile" className="fe fe-camera-off me-1 btn btn-danger btn-sm mt-1 mb-1 me-2"></i> */}
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
                    {errors.email && touched.email ? (
                      <small className="text-danger">{errors.email}</small>
                    ) : (
                      <span />
                    )}
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
                        {errors.city && touched.city ? (
                          <small className="text-danger">{errors.city}</small>
                        ) : (
                          <span />
                        )}
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

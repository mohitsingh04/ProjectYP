import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { User } = DataRequest();

  if (User.verified === "True") {
    navigate("/dashboard");
  }

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
  });

  const onSubmit = async (values) => {
    try {
      API.post(`/verify-email`, values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate(`/send/verify-email/success/${values.email}`);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="login-img">
        <div className="page">
          <div className="dropdown float-end custom-layout"></div>
          <div className="">
            <div className="col col-login mx-auto">
              <div className="text-center">
                <Link to="/home">
                  <img
                    src={require("../../../assets/custom-logo/logo.png")}
                    className="header-brand-img"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="container-login100">
              <Row>
                <Col className=" col-login mx-auto">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="card shadow-none"
                  >
                    <Card.Body>
                      <div className="text-center">
                        <span className="login100-form-title">
                          Verify Email
                        </span>
                        <p className="text-muted">
                          Enter the email address, to verify your email
                        </p>
                      </div>
                      <div className="pt-3" id="forgot">
                        <div className="form-group">
                          <label className="form-label">E-Mail</label>
                          <input
                            className="form-control"
                            placeholder="Enter Your Email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <small className="text-danger">
                              {formik.errors.email}
                            </small>
                          ) : (
                            <span />
                          )}
                        </div>
                        <div className="submit">
                          <button
                            type="submit"
                            className="login100-form-btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                        {/* <div className="text-center mt-4">
                                                    <p className="text-dark mb-0">
                                                        Forgot It?
                                                        <Link className="text-primary ms-1" to="/login">
                                                            Send me Back
                                                        </Link>
                                                    </p>
                                                </div> */}
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex justify-content-center my-3">
                        <Link to="#" className="social-login  text-center me-4">
                          <i className="fa fa-google"></i>
                        </Link>
                        <Link to="#" className="social-login  text-center me-4">
                          <i className="fa fa-facebook"></i>
                        </Link>
                        <Link to="#" className="social-login  text-center">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </div>
                    </Card.Footer>
                  </form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

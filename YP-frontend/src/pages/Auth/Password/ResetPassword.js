import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await API.get(`/reset/${token}`);
        if (response.data.error) {
          toast.error(response.data.error);
          setTokenValid(false);
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again later.");
        setTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [token]);

  const initialValues = {
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    new_password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must have at least 6 characters."),
    confirm_password: Yup.string()
      .required("Please re-type your password.")
      .oneOf([Yup.ref("new_password"), null], "Passwords don't match"),
  });

  const onSubmit = async (values) => {
    if (!tokenValid) {
      toast.error("Invalid or expired token.");
      return;
    }
    try {
      values = { ...values, token: token };
      const response = await API.post("/reset", values);
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  if (!tokenValid) {
    return (
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
                <Col className="col-login w-100 mx-5">
                  <Card className="shadow-none">
                    <Card.Body>
                      <div className="text-center">
                        <span className="login100-form-title">
                          Reset Password
                        </span>
                        <p className="text-muted">
                          Your password reset token is invalid or has expired.
                          Please request a new one.
                        </p>
                        <Link to="/forgot-password">
                          <button className="login100-form-btn btn-primary">
                            Request New Password Reset
                          </button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
              <Col className="col-login w-100 mx-5">
                <form
                  onSubmit={formik.handleSubmit}
                  className="card shadow-none"
                >
                  <Card.Body>
                    <div className="text-center">
                      <span className="login100-form-title">
                        Reset Password
                      </span>
                      <p className="text-muted">
                        Enter the password to reset your password
                      </p>
                    </div>
                    <div className="pt-3" id="forgot">
                      <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          name="new_password"
                          value={formik.values.new_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span
                          className="text-gray show-hide-reset-password-1"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <i className="fe fe-eye"></i>
                          ) : (
                            <i className="fe fe-eye-off"></i>
                          )}
                        </span>
                        {formik.errors.new_password &&
                        formik.touched.new_password ? (
                          <small className="text-danger">
                            {formik.errors.new_password}
                          </small>
                        ) : (
                          <span />
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                          name="confirm_password"
                          value={formik.values.confirm_password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span
                          className="text-gray show-hide-reset-password-2"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <i className="fe fe-eye"></i>
                          ) : (
                            <i className="fe fe-eye-off"></i>
                          )}
                        </span>
                        {formik.errors.confirm_password &&
                        formik.touched.confirm_password ? (
                          <small className="text-danger">
                            {formik.errors.confirm_password}
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
                          Reset
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import logo from "../../assets/custom-logo/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sending, setSending] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    mobile_no: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters long.")
      .required("Full Name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Full Name can only contain alphabets and spaces."
      ),

    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),

    mobile_no: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be a positive 10-digit number."
      )
      .required("Mobile number is required."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),

    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Please confirm your password."),
  });

  const onSubmit = async (values) => {
    setSending(true);
    try {
      const response = await API.post("/register", values);

      if (response.data.message) {
        setSending(false);
        toast.success(response.data.message);
        navigate(`/send/verify-email/success/${values.email}`);
      } else {
        setError(response.data.error);
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

  return (
    <div className="login-img">
      <div className="page">
        <div className="">
          <div className="col col-login mx-auto">
            <div className="text-center">
              <Link to="/home">
                <img src={logo} className="header-brand-img" alt="" />
              </Link>
            </div>
          </div>
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <form
                  onSubmit={formik.handleSubmit}
                  className="login100-form validate-form"
                >
                  <span className="login100-form-title">Registration</span>
                  {error && (
                    <div className="alert alert-danger">
                      <small>{error}</small>
                    </div>
                  )}
                  <div className="wrap-input100 validate-input">
                    <input
                      type="text"
                      name="name"
                      className="input100"
                      placeholder="Full Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="mdi mdi-account"></i>
                    </span>
                    {formik.errors.name && formik.touched.name ? (
                      <small className="text-danger">
                        {formik.errors.name}
                      </small>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      type="email"
                      name="email"
                      className="input100"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email"></i>
                    </span>
                    {formik.errors.email && formik.touched.email ? (
                      <small className="text-danger">
                        {formik.errors.email}
                      </small>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      type="number"
                      name="mobile_no"
                      className="input100"
                      placeholder="Mobile number"
                      value={formik.values.mobile_no}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-phone"></i>
                    </span>
                    {formik.errors.mobile_no && formik.touched.mobile_no ? (
                      <small className="text-danger">
                        {formik.errors.mobile_no}
                      </small>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input100"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="text-gray show-hide-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fe fe-eye"></i>
                      ) : (
                        <i className="fe fe-eye-off"></i>
                      )}
                    </span>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock"></i>
                    </span>
                    {formik.errors.password && formik.touched.password ? (
                      <small className="text-danger">
                        {formik.errors.password}
                      </small>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      className="input100"
                      placeholder="Confirm Password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="text-gray show-hide-password"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <i className="fe fe-eye"></i>
                      ) : (
                        <i className="fe fe-eye-off"></i>
                      )}
                    </span>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock " aria-hidden="true"></i>
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
                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      className={`login100-form-btn btn-primary ${
                        sending && "opacity-75"
                      }`}
                      disabled={sending}
                    >
                      {!sending ? "Register" : "Verifing..."}
                    </button>
                  </div>
                  <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Already have account?
                      <Link
                        to={`${process.env.PUBLIC_URL}/login`}
                        className="text-primary ms-1"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </Card.Body>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

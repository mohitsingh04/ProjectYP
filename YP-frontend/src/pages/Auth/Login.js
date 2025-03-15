import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import logo from "../../assets/custom-logo/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
  });

  const onSubmit = async (values) => {
    try {
      const response = await API.post("/login", values);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
      toast.error(error?.response?.data?.error);
      if (error?.response?.data?.error === "You are Not Verified.") {
        navigate(`/verify-email`);
      }
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

  return (
    <>
      <div className="login-img">
        <div className="page">
          <div className="dropdown float-end custom-layout"></div>
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
                    <span className="login100-form-title">Login</span>
                    {error && (
                      <div className="alert alert-danger">
                        <small>{error}</small>
                      </div>
                    )}
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="input100"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="off"
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        <i className="zmdi zmdi-lock"></i>
                      </span>
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
                      {formik.errors.password && formik.touched.password ? (
                        <small className="text-danger">
                          {formik.errors.password}
                        </small>
                      ) : (
                        <span />
                      )}
                    </div>
                    <div className="text-end pt-1">
                      <p className="mb-0">
                        <Link
                          to="/forgot-password"
                          className="text-primary ms-1"
                        >
                          Forgot Password?
                        </Link>
                      </p>
                    </div>
                    <div className="container-login100-form-btn">
                      <button
                        type="submit"
                        className="login100-form-btn btn-primary"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center pt-3">
                      <p className="text-dark mb-0">
                        Not a member?
                        <Link
                          to={`${process.env.PUBLIC_URL}/register`}
                          className="text-primary ms-1"
                        >
                          Create an Account
                        </Link>
                      </p>
                    </div>
                  </form>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

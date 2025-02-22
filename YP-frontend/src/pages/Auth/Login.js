import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function Login() {
  const dispatch = useDispatch();
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
      dispatch(showLoading());
      const response = await API.post("/login", values, {
        withCredentials: true,
      });
      console.log(response);
      toast.success(response.data.message);
      navigate("/dashboard");
      window.location.reload();
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      setError(error.response.data.error);
      toast.error(error.response.data.error);
      if (error.response.data.error === "You are Not Verified.") {
        navigate(`/verify-email`);
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
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
                  <img
                    src={require("../../assets/custom-logo/logo.png")}
                    className="header-brand-img"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="container-login100">
              <div className="wrap-login100 p-0">
                <Card.Body>
                  <form
                    onSubmit={handleSubmit}
                    className="login100-form validate-form"
                  >
                    <span className="login100-form-title">Login</span>
                    {error ? (
                      <div className="alert alert-danger">
                        <small>{error}</small>
                      </div>
                    ) : (
                      <span />
                    )}
                    <div className="wrap-input100 validate-input">
                      <input
                        type="email"
                        name="email"
                        className="input100"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        {errors.email && touched.email ? (
                          <i
                            className="zmdi zmdi-email"
                            style={{ marginBottom: "20px" }}
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i className="zmdi zmdi-email" aria-hidden="true"></i>
                        )}
                      </span>
                      {errors.email && touched.email ? (
                        <small className="text-danger">{errors.email}</small>
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
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      <span className="focus-input100"></span>
                      <span className="symbol-input100">
                        {errors.password && touched.password ? (
                          <i
                            className="zmdi zmdi-lock fixed-icon"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                        )}
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
                      {errors.password && touched.password ? (
                        <small className="text-danger">{errors.password}</small>
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

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { accessToken, API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const initialValues = {
    name: "",
    email: "",
    mobile_no: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name must be alphabets only!"),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    mobile_no: Yup.string()
      .min(10, "Please enter a valid mobile number!")
      .max(10, "Please enter a valid mobile number!")
      .required("Mobile number is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must have at least 6 characters."),
    confirm_password: Yup.string()
      .required("Please re-type your password.")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),
  });

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      API.post("/register", values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate(`/send/verify-email/success/${values.email}`);
        } else {
          setError(response.data.error);
        }
        dispatch(hideLoading());
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.success(err.message);
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
                  <span className="login100-form-title">Registration</span>
                  {error ? (
                    <div className="alert alert-danger">
                      <small>{error}</small>
                    </div>
                  ) : (
                    <span />
                  )}
                  <div className="wrap-input100 validate-input">
                    <input
                      type="text"
                      name="name"
                      className="input100"
                      placeholder="User name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      {errors.name && touched.name ? (
                        <i
                          className="mdi mdi-account fixed-icon"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i className="mdi mdi-account" aria-hidden="true"></i>
                      )}
                    </span>
                    {errors.name && touched.name ? (
                      <small className="text-danger">{errors.name}</small>
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
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      {errors.email && touched.email ? (
                        <i
                          className="zmdi zmdi-email fixed-icon"
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
                      type="number"
                      name="mobile_no"
                      className="input100"
                      placeholder="Mobile number"
                      value={values.mobile_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      {errors.mobile_no && touched.mobile_no ? (
                        <i
                          className="zmdi zmdi-phone fixed-icon"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i className="zmdi zmdi-phone" aria-hidden="true"></i>
                      )}
                    </span>
                    {errors.mobile_no && touched.mobile_no ? (
                      <small className="text-danger">{errors.mobile_no}</small>
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
                      {errors.password && touched.password ? (
                        <i
                          className="zmdi zmdi-lock fixed-icon"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                      )}
                    </span>
                    {errors.password && touched.password ? (
                      <small className="text-danger">{errors.password}</small>
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
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      {errors.confirm_password && touched.confirm_password ? (
                        <i
                          className="zmdi zmdi-lock fixed-icon"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                      )}
                    </span>
                    {errors.confirm_password && touched.confirm_password ? (
                      <small className="text-danger">
                        {errors.confirm_password}
                      </small>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="container-login100-form-btn">
                    <button
                      type="submit"
                      className="login100-form-btn btn-primary"
                    >
                      Register
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

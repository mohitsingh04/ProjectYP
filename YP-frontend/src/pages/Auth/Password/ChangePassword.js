import React, { useState } from "react";
import { Card, Form, FormGroup, FormControl } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { User } = DataRequest();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    current_password: Yup.string()
      .required("Enter Current Password.")
      .min(6, "Password must have at least 6 characters."),
    new_password: Yup.string()
      .required("Enter New Password.")
      .min(6, "Password must have at least 6 characters."),
    confirm_password: Yup.string()
      .required("Please re-type new your password.")
      .oneOf([Yup.ref("new_password"), null], "Passwords don't match"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      values = { ...values, id: User._id };
      dispatch(showLoading());
      API.post("/change-password").then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.error);
        }
      });
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Card className="profile-edit">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Card.Header>
          <Card.Title>Edit Password</Card.Title>
        </Card.Header>
        <Card.Body>
          <FormGroup>
            <Form.Label className="form-label">Old Password</Form.Label>
            <FormControl
              type={showOldPassword ? "text" : "password"}
              name="current_password"
              placeholder="******"
              value={values.current_password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <span
              className="text-gray show-hide-change-password-1"
              onClick={toggleOldPasswordVisibility}
            >
              {showOldPassword ? (
                <i className="fe fe-eye"></i>
              ) : (
                <i className="fe fe-eye-off"></i>
              )}
            </span>
            {errors.current_password && touched.current_password ? (
              <small className="text-danger">{errors.current_password}</small>
            ) : (
              <span />
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label className="form-label">New Password</Form.Label>
            <Form.Control
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              placeholder="******"
              value={values.new_password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <span
              className="text-gray show-hide-change-password-2"
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? (
                <i className="fe fe-eye"></i>
              ) : (
                <i className="fe fe-eye-off"></i>
              )}
            </span>
            {errors.new_password && touched.new_password ? (
              <small className="text-danger">{errors.new_password}</small>
            ) : (
              <span />
            )}
          </FormGroup>
          <FormGroup>
            <Form.Label className="form-label">Confirm Password</Form.Label>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="******"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <span
              className="text-gray show-hide-change-password-3"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <i className="fe fe-eye"></i>
              ) : (
                <i className="fe fe-eye-off"></i>
              )}
            </span>
            {errors.confirm_password && touched.confirm_password ? (
              <small className="text-danger">{errors.confirm_password}</small>
            ) : (
              <span />
            )}
          </FormGroup>
        </Card.Body>
        <Card.Footer className="">
          <button type="submit" className="btn btn-primary">
            Change
          </button>
        </Card.Footer>
      </form>
    </Card>
    // <div className="login-img">
    //     <div className="page">
    //         <div className="">
    //             <div className="col col-login mx-auto">
    //                 <div className="text-center">
    //                     <Link to={`/dashboard`}>
    //                         <h2 className="text-light">YP</h2>
    //                     </Link>
    //                 </div>
    //             </div>
    //             <div className="container-login100">
    //                 <div className="wrap-login100 p-0">
    //                     <Card.Body>
    //                         <form onSubmit={handleSubmit} className="login100-form validate-form">
    //                             <span className="login100-form-title">Change Password</span>
    //                             {error ? <div className="alert alert-danger"><small>{error}</small></div> : <span />}
    //                             <div className="wrap-input100 validate-input">
    //                                 <input
    //                                     type="password"
    //                                     name="current_password"
    //                                     className="input100"
    //                                     placeholder="Current Password"
    //                                     value={values.current_password}
    //                                     onChange={handleChange}
    //                                     onBlur={handleBlur}
    //                                 />
    //                                 <span className="focus-input100"></span>
    //                                 <span className="symbol-input100">
    //                                     <i className="zmdi zmdi-lock" aria-hidden="true"></i>
    //                                 </span>
    //                                 {errors.current_password && touched.current_password ? <small className='text-danger'>{errors.current_password}</small> : <span />}
    //                             </div>
    //                             <div className="wrap-input100 validate-input">
    //                                 <input
    //                                     type="password"
    //                                     name="new_password"
    //                                     className="input100"
    //                                     placeholder="New Password"
    //                                     value={values.new_password}
    //                                     onChange={handleChange}
    //                                     onBlur={handleBlur}
    //                                 />
    //                                 {errors.new_password && touched.new_password ? <small className='text-danger'>{errors.new_password}</small> : <span />}
    //                                 <span className="focus-input100"></span>
    //                                 <span className="symbol-input100">
    //                                     <i className="zmdi zmdi-lock" aria-hidden="true"></i>
    //                                 </span>
    //                             </div>
    //                             <div className="wrap-input100 validate-input">
    //                                 <input
    //                                     type="password"
    //                                     name="confirm_password"
    //                                     className="input100"
    //                                     placeholder="Confirm Password"
    //                                     value={values.confirm_password}
    //                                     onChange={handleChange}
    //                                     onBlur={handleBlur}
    //                                 />
    //                                 {errors.confirm_password && touched.confirm_password ? <small className='text-danger'>{errors.confirm_password}</small> : <span />}
    //                                 <span className="focus-input100"></span>
    //                                 <span className="symbol-input100">
    //                                     <i className="zmdi zmdi-lock" aria-hidden="true"></i>
    //                                 </span>
    //                             </div>
    //                             <div className="container-login100-form-btn">
    //                                 <button
    //                                     type="submit"
    //                                     className="login100-form-btn btn-primary">
    //                                     Change Password
    //                                 </button>
    //                             </div>
    //                         </form>
    //                     </Card.Body>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}

import React, { useState } from "react";
import { Card, Form, FormGroup, FormControl } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function ChangePassword({ loading }) {
  const { User } = DataRequest();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const onSubmit = async (values) => {
    try {
      values = { ...values, id: User?._id };
      API.post("/change-password", values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/my-profile");
        } else {
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
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Card.Header>
          <Card.Title>Edit Password</Card.Title>
        </Card.Header>
        {!loading ? (
          <>
            <Card.Body>
              <FormGroup>
                <Form.Label className="form-label" htmlFor="current_password">
                  Old Password
                </Form.Label>
                <FormControl
                  type={showOldPassword ? "text" : "password"}
                  name="current_password"
                  id="current_password"
                  placeholder="******"
                  value={formik.values.current_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.errors.current_password &&
                formik.touched.current_password ? (
                  <small className="text-danger">
                    {formik.errors.current_password}
                  </small>
                ) : (
                  <span />
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label className="form-label" htmlFor="new_password">
                  New Password
                </Form.Label>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  name="new_password"
                  id="new_password"
                  placeholder="******"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.errors.new_password && formik.touched.new_password ? (
                  <small className="text-danger">
                    {formik.errors.new_password}
                  </small>
                ) : (
                  <span />
                )}
              </FormGroup>
              <FormGroup>
                <Form.Label className="form-label" htmlFor="confirm_password">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="******"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                {formik.errors.confirm_password &&
                formik.touched.confirm_password ? (
                  <small className="text-danger">
                    {formik.errors.confirm_password}
                  </small>
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
          </>
        ) : (
          <Card.Body>
            <Skeleton count={3} height={25} className="my-2" />
          </Card.Body>
        )}
      </form>
    </Card>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";

const EditReview = (props) => {
  const reviewId = props.isUpdating;
  const [review, setReviews] = useState("");

  const getReviews = useCallback(async () => {
    const response = await API.get(`review/${reviewId}`);
    setReviews(response.data);
  }, [reviewId]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const initialValues = {
    name: review?.name || "",
    email: review?.email || "",
    phone_number: review?.phone_number || "",
    gender: review?.gender || "",
    rating: review?.rating || "",
    review: review?.review || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long.")
      .required("Name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabets and spaces."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),

    phone_number: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be a positive 10-digit number."
      )
      .required("Mobile number is required."),
    gender: Yup.string().required("Gender is Required"),
    rating: Yup.number().required("Rating is Required"),
    review: Yup.string().required("Review is Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await API.patch(`/review/${review?.uniqueId}`, values);
      toast.success(response.data.message);
      props.setIsUpdating(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <Card.Body>
              <h5 className="mb-3">
                <strong>Edit Review</strong>
              </h5>
              <hr />
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="name"
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <span className="text-danger">
                          {formik.errors.name}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Email</Form.Label>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        name="email"
                        className="form-control bg-white"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="email"
                        disabled
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <span className="text-danger">
                          {formik.errors.email}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Label htmlFor="phone_number">Phone</Form.Label>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="number"
                        id="phone_number"
                        name="phone_number"
                        className="form-control bg-white"
                        placeholder="Enter Phone Number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled
                      />
                      {formik.errors.phone_number &&
                      formik.touched.phone_number ? (
                        <span className="text-danger">
                          {formik.errors.phone_number}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Label>Gender</Form.Label>
                    <Form.Group className="form-group d-flex gap-3">
                      <Form.Check
                        type="radio"
                        label="Male"
                        name="gender"
                        value="male"
                        id="male"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === "male"}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="gender"
                        value="female"
                        id="female"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === "female"}
                      />
                      <Form.Check
                        type="radio"
                        label="Others"
                        name="gender"
                        value="others"
                        id="others"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === "others"}
                      />
                      {formik.errors.gender && formik.touched.gender ? (
                        <span className="text-danger">
                          {formik.errors.gender}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Rating
                      name="simple-controlled"
                      value={formik.values.rating}
                      onChange={(_event, newValue) => {
                        formik.setFieldValue("rating", newValue);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: "0.55" }}
                          fontSize="inherit"
                        />
                      }
                    />
                  </Form.Group>
                  {formik.errors.rating && formik.touched.rating ? (
                    <span className="text-danger">{formik.errors.rating}</span>
                  ) : (
                    <span />
                  )}
                </div>
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="review"
                      placeholder="Review"
                      value={formik.values.review}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.review && formik.touched.review ? (
                      <span className="text-danger">
                        {formik.errors.review}
                      </span>
                    ) : (
                      <span />
                    )}
                  </Form.Group>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Review
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => props.setIsUpdating(null)}
                >
                  cancel
                </button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditReview;

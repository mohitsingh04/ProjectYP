import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// import * as rating from "../../../data/Rating/rating";
import user4 from "../../../assets/images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import DataRequest from "../../../context/DataRequest";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import Swal from "sweetalert2";
import EditReview from "./ReviewComponents/EditReview";

export default function Reviews() {
  const { objectId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [property, setProperty] = useState("");
  const { User } = DataRequest();
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(null);

  const getProperty = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  }, [objectId, dispatch]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const getReviews = useCallback(async () => {
    if (property.uniqueId) {
      dispatch(showLoading());
      const get = await API.get(`/review/property/${property.uniqueId}`);
      dispatch(hideLoading());
      setReviews(get.data);
    }
  }, [dispatch, property]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const handleIsUpdating = () => {
    if (isUpdating) {
      setIsUpdating(null);
      getReviews();
    }
  };

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    rating: "",
    review: "",
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
      values = {
        ...values,
        property_id: property.uniqueId,
        property_name: property.property_name,
        userId: User.uniqueId,
      };

      const response = await API.post("/review", values);
      toast.success(response.data.message);
      getReviews();
      formik.resetForm();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleDeleteReview = (uniqueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(showLoading());
          API.delete(`/review/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
              getReviews();
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="tab-pane" id="tab-81">
        {!isUpdating ? (
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>
                  <h5>
                    <strong>Reviews</strong>
                  </h5>
                </Card.Header>
                <Card.Body>
                  {reviews.map((items, key) => (
                    <div className="tab-pane" id="tab3" key={key}>
                      <div className="media mb-5">
                        <div className=" me-3">
                          <Link to="#">
                            <img
                              className="media-object rounded-circle thumb-sm"
                              alt="64x64"
                              src={user4}
                            />
                          </Link>
                        </div>
                        <div className="media-body">
                          <h5 className="mt-0 mb-0 ">{items.name}</h5>
                          <div>
                            <span
                              className="mx-2 float-end"
                              onClick={() => handleDeleteReview(items.uniqueId)}
                            >
                              <i className="fe fe-trash"></i>
                            </span>
                            <span
                              className="mx-2 float-end"
                              onClick={() => setIsUpdating(items.uniqueId)}
                            >
                              <i className="fe fe-edit"></i>
                            </span>
                            <div className="text-warning mb-0">
                              <span className="me-2">{items.rating}</span>
                              {[...Array(items.rating)].map((_, index) => (
                                <i key={index} className="me-1 fa fa-star"></i>
                              ))}
                              {[...Array(5 - items.rating)].map((_, index) => (
                                <i
                                  key={index}
                                  className="me-1 fa fa-star-o"
                                ></i>
                              ))}
                            </div>
                            <p className="font-13 text-muted mb-0">
                              {items.review}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h5 className="mb-3">
                    <strong>Add a New Review</strong>
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
                            className="form-control"
                            placeholder="Enter Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="email"
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
                            className="form-control"
                            placeholder="Enter Phone Number"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        <span className="text-danger">
                          {formik.errors.rating}
                        </span>
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
                      Add Review
                    </button>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <EditReview
            isUpdating={isUpdating}
            setIsUpdating={handleIsUpdating}
          />
        )}
      </div>
    </>
  );
}

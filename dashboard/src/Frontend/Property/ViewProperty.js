import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Row, Col, Card, FormGroup, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomHeader from "../../layouts/Header/CustomHeader";
import CustomFooter from "../../layouts/Footer/CustomFooter";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataRequest from "../../context/DataRequest";

export default function ViewProperty() {
  const editorRef = useRef(null);
  const { uniqueId } = useParams();
  const { User } = DataRequest();
  const [property, setProperty] = useState("");
  const [reviews, setReviews] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getProperty();
    getReview();
  }, []);

  const getProperty = () => {
    API.get(`/property/${uniqueId}`).then(({ data }) => {
      setProperty(data);
    });
  };

  const getReview = () => {
    API.get(`review`).then(({ data }) => {
      setReviews(data);
    });
  };

  const initialValues = {
    name: "",
    email: "",
    review: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name must be alphabets only!"),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    review: Yup.string().required("Review is required."),
  });

  const onSubmit = async (values) => {
    values = { ...values, category_description: description };
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <CustomHeader />
      <div className="container">
        <Row>
          <Col lg={12} md={12}>
            <Card className="productdesc">
              <Card.Body>
                <div className="productdec text-center">
                  <div className="bg-light-gray p-6 text-center br-5">
                    <img
                      alt="Product"
                      src={`${process.env.REACT_APP_BACKEND_URL}/images/${property.featured_image}`}
                    />
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <h3>{property.property_name}</h3>
                  <h5 className="mb-3 mt-2">Description</h5>
                  <p>{property.property_description}</p>
                </div>
                <div className="panel panel-primary">
                  <div className="tab-menu-heading border ">
                    <div className="tabs-menu ">
                      <Tabs
                        variant="info"
                        defaultActiveKey="Specification"
                        id="uncontrolled-tab-example"
                        className="nav panel-tabs "
                      >
                        <Tab
                          eventKey="Specification"
                          title="Specification"
                          className="me-2"
                        >
                          <hr />
                          <div className="tab-pane active" id="tab1">
                            <h4 className="mb-5 mt-3">General</h4>
                            <ul className="list-unstyled mb-0">
                              <li className="row">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted "
                                >
                                  Brand
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  CASAMOTION
                                </Col>
                              </li>
                              <li className="row">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Model Number
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  AHLF016
                                </Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Model Name
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  casamotion
                                </Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Suitable For
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  Table, Floor
                                </Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Material
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  Wood
                                </Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Color
                                </Col>
                                <Col sm={3} lg={8} xl={3}>
                                  Brown
                                </Col>
                              </li>
                            </ul>
                          </div>
                        </Tab>
                        &nbsp;
                        <Tab
                          eventKey="Dimensions"
                          title="Dimensions"
                          className=" me-2"
                        >
                          <hr />
                          <div className="tab-pane" id="tab2">
                            <ul className="list-unstyled mb-0">
                              <li className="row">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Width
                                </Col>
                                <Col sm={3}>6.1 inch</Col>
                              </li>
                              <li className="row">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Height
                                </Col>
                                <Col sm={3}>24 inch</Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Depth
                                </Col>
                                <Col sm={3}>6.1 inch</Col>
                              </li>
                              <li className="row p-b-20">
                                <Col
                                  sm={3}
                                  lg={4}
                                  xl={3}
                                  className="text-muted"
                                >
                                  Other Dimensions
                                </Col>
                                <Col sm={3}>15.5*15.5*24CM</Col>
                              </li>
                            </ul>
                          </div>
                        </Tab>
                        &nbsp;
                        <Tab
                          eventKey="Reviews"
                          title="Reviews "
                          className="me-2"
                        >
                          <hr />
                          <form onSubmit={handleSubmit}>
                            <h5 className="my-3">
                              <strong>Review</strong>
                            </h5>
                            <Row>
                              <Col md={6}>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    placeholder="Your Name*"
                                    name="name"
                                    className="form-control"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.name && touched.name ? (
                                    <span className="text-danger">
                                      {errors.name}
                                    </span>
                                  ) : (
                                    <span />
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="mb-3">
                                  <input
                                    type="email"
                                    placeholder="Email*"
                                    name="email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.email && touched.email ? (
                                    <span className="text-danger">
                                      {errors.email}
                                    </span>
                                  ) : (
                                    <span />
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="rating-css mb-3">
                                  <div className="star-icon">
                                    <input
                                      type="radio"
                                      name="review"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value="1"
                                      id="star1"
                                    />
                                    <label
                                      htmlFor="star1"
                                      className="fa fa-star me-2"
                                    ></label>
                                    <input
                                      type="radio"
                                      name="review"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value="2"
                                      id="star2"
                                    />
                                    <label
                                      htmlFor="star2"
                                      className="fa fa-star me-2"
                                    ></label>
                                    <input
                                      type="radio"
                                      name="review"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value="3"
                                      id="star3"
                                    />
                                    <label
                                      htmlFor="star3"
                                      className="fa fa-star me-2"
                                    ></label>
                                    <input
                                      type="radio"
                                      name="review"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value="4"
                                      id="star4"
                                    />
                                    <label
                                      htmlFor="star4"
                                      className="fa fa-star me-2"
                                    ></label>
                                    <input
                                      type="radio"
                                      name="review"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value="5"
                                      id="star5"
                                    />
                                    <label
                                      htmlFor="star5"
                                      className="fa fa-star me-2"
                                    ></label>
                                  </div>
                                </div>
                              </Col>
                              <Col md={12}>
                                <div className="mb-3">
                                  <label className="form-label">
                                    Write Review <i>(Optional)</i>
                                  </label>
                                  <Editor
                                    apiKey={
                                      process.env.REACT_APP_TINYEDITORAPIKEY
                                    }
                                    onInit={(evt, editor) =>
                                      (editorRef.current = editor)
                                    }
                                    onChange={() =>
                                      setDescription(
                                        editorRef.current.getContent()
                                      )
                                    }
                                    onBlur={handleBlur}
                                    init={{
                                      height: 200,
                                      menubar: false,
                                      plugins:
                                        process.env.REACT_APP_TINYEDITORPLUGINS?.split(
                                          " "
                                        ),
                                      toolbar:
                                        process.env.REACT_APP_TINYEDITORTOOLBAR,
                                      content_style:
                                        process.env.REACT_APP_TINYEDITORSTYLE,
                                    }}
                                    initialValue={reviews.description}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <button type="submit" className="btn btn-primary">
                              Add Review
                            </button>
                          </form>
                        </Tab>
                        &nbsp;
                      </Tabs>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <CustomFooter />
    </>
  );
}

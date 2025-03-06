import React, { useState, useRef, useEffect, useCallback } from "react";
import DataRequest from "../../context/DataRequest";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { API } from "../../context/Api";

export default function CreateProperty() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { User } = DataRequest();
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [category, setCategory] = useState([]);
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(User?.permissions);
  }, [User]);

  const getCategory = useCallback(async () => {
    API.get("/category").then(({ data }) => {
      setCategory(data);
      const mainCategory = data.filter((item) => item.status === "Active");
      if (mainCategory) {
        setCategory(mainCategory);
      }
    });
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const initialValues = {
    property_name: "",
    property_email: "",
    property_mobile_no: "",
    category: "",
    property_logo: "",
    featured_image: "",
  };

  const validationSchema = Yup.object({
    property_name: Yup.string()
      .min(3, "Property Name must be at least 3 characters long.")
      .required("Property Name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Property Name can only contain alphabets and spaces."
      ),
    property_email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email address is required."),
    property_mobile_no: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Mobile number must be a positive 10-digit number."
      )
      .required("Mobile number is required."),
    property_logo: Yup.string(),
    featured_image: Yup.string(),
    category: Yup.string().required("Category is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        property_description: description,
        userId: User.uniqueId,
      };
      let formData = new FormData();
      formData.append("property_name", values.property_name);
      formData.append("property_email", values.property_email);
      formData.append("property_mobile_no", values.property_mobile_no);
      formData.append("category", values.category);
      formData.append("property_description", description);
      formData.append("userId", User.uniqueId);
      if (values.property_logo) {
        formData.append("property_logo", values.property_logo);
      }
      if (values.featured_image) {
        formData.append("featured_image", values.featured_image);
      }

      await API.post(`/property`, formData).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/property");
        } else if (response.data.error) {
          setError(response.data.error);
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

  if (authPermissions?.length >= 0) {
    const hasPermission = authPermissions?.some(
      (item) => item.value === "Create Property"
    );

    if (!hasPermission) {
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <h2 className="text-danger fw-bold">Access Denied</h2>
          <p>You do not have the required permissions to access this page.</p>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Property</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/dashboard/property" }}
            >
              Property
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/dashboard/property" className="btn btn-primary">
            <span>
              <i className="fe fe-arrow-left"></i>&nbsp;
            </span>
            Back
          </Link>
        </div>
      </div>

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              <h3 className="card-title">Property Details</h3>
            </Card.Header>
            <Card.Body>
              {category.length === 0 && (
                <Row>
                  <Col className="d-flex">
                    <div>
                      <p className="text-danger">
                        No categories available. Please add a category to
                        continue.
                      </p>
                    </div>
                    <div className="ms-auto">
                      <Link
                        to={`/dashboard/category/add`}
                        className="btn btn-primary"
                      >
                        Add Category
                      </Link>
                    </div>
                  </Col>
                </Row>
              )}
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                {error ? (
                  <div className="alert alert-danger">
                    <small>{error}</small>
                  </div>
                ) : (
                  <span />
                )}
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="property_name">
                      Property Name
                    </label>
                    <input
                      type="text"
                      name="property_name"
                      id="property_name"
                      className="form-control"
                      placeholder="Property Name"
                      value={formik.values.property_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.property_name &&
                    formik.touched.property_name ? (
                      <span className="text-danger">
                        {formik.errors.property_name}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="property_email">
                        Email
                      </label>
                      <input
                        type="text"
                        name="property_email"
                        id="property_email"
                        className="form-control"
                        placeholder="Email"
                        value={formik.values.property_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.property_email &&
                      formik.touched.property_email ? (
                        <span className="text-danger">
                          {formik.errors.property_email}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="property_mobile_no"
                      >
                        Mobile
                      </label>
                      <input
                        type="text"
                        name="property_mobile_no"
                        id="property_mobile_no"
                        className="form-control"
                        placeholder="Mobile no."
                        value={formik.values.property_mobile_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.property_mobile_no &&
                      formik.touched.property_mobile_no ? (
                        <span className="text-danger">
                          {formik.errors.property_mobile_no}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="category">
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">--Select Category--</option>
                        {category.map((item, key) => (
                          <option key={key} value={item.category_name}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                      {formik.errors.category && formik.touched.category ? (
                        <span className="text-danger">
                          {formik.errors.category}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="property_description"
                      >
                        Description
                      </label>
                      <Editor
                        apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={(e) =>
                          setDescription(editorRef.current.getContent())
                        }
                        onBlur={formik.handleBlur}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins:
                            process.env.REACT_APP_TINYEDITORPLUGINS?.split(" "),
                          toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                          content_style: process.env.REACT_APP_TINYEDITORSTYLE,
                        }}
                      />
                      {formik.errors.property_description &&
                      formik.touched.property_description ? (
                        <span className="text-danger">
                          {formik.errors.property_description}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="property_logo">
                        Property Logo
                      </label>
                      <input
                        type="file"
                        name="property_logo"
                        accept="image/jpeg, image/png"
                        id="property_logo"
                        className="form-control"
                        onChange={(e) => {
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              formik.setFieldValue(
                                "property_logo",
                                e.target.files[0]
                              );
                              setPreviewLogo(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <div className="col-md-3 p-0 pt-1">
                        <img src={previewLogo} alt="" />
                      </div>
                      {formik.errors.property_logo &&
                      formik.touched.property_logo ? (
                        <span className="text-danger">
                          {formik.errors.property_logo}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  {/* Featured Image */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="featured_image">
                        Featured Image
                      </label>
                      <input
                        type="file"
                        name="featured_image"
                        id="featured_image"
                        className="form-control"
                        onChange={(e) => {
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              formik.setFieldValue(
                                "featured_image",
                                e.target.files[0]
                              );
                              setPreviewFeaturedImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <div className="col-md-3">
                        <img src={previewFeaturedImage} alt="" />
                      </div>
                      {formik.errors.featured_image &&
                      formik.touched.featured_image ? (
                        <span className="text-danger">
                          {formik.errors.featured_image}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Property
                </button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

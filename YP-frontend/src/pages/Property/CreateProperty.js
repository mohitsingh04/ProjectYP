import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import DataRequest from "../../context/DataRequest";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function CreateProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { User } = DataRequest();
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [category, setCategory] = useState([]);
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(User?.permissions);
  }, [User]);

  const getCategory = useCallback(async () => {
    dispatch(showLoading());
    API.get("/category").then(({ data }) => {
      dispatch(hideLoading());
      setCategory(data);
    });
  }, [dispatch]);

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

      dispatch(showLoading());
      await API.post(`/property`, formData).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/property");
        } else if (response.data.error) {
          setError(response.data.error);
        }
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
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

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Create Property"
  );

  if (!hasPermission) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        USER DOES NOT HAVE THE RIGHT ROLES.
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Property</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              <Link to="/dashboard/">Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item breadcrumds"
              ria-current="page"
            >
              <Link to="/dashboard/property/">Property</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active"
              ria-current="page"
            >
              Add
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/dashboard/property"
            className="btn btn-primary btn-icon text-white me-3"
          >
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
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {error ? (
                  <div className="alert alert-danger">
                    <small>{error}</small>
                  </div>
                ) : (
                  <span />
                )}
                <div className="row">
                  {/* Property Name */}
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
                      value={values.property_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.property_name && touched.property_name ? (
                      <span className="text-danger">
                        {errors.property_name}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                  {/* Property Email */}
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
                        value={values.property_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.property_email && touched.property_email ? (
                        <span className="text-danger">
                          {errors.property_email}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  {/* Property Mobile */}
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
                        value={values.property_mobile_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.property_mobile_no &&
                      touched.property_mobile_no ? (
                        <span className="text-danger">
                          {errors.property_mobile_no}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  {/* Property Alternate Mobile */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="category">
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select Category--</option>
                        {category.map((item, key) => (
                          <option key={key} value={item.category_name}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                      {errors.category && touched.category ? (
                        <span className="text-danger">{errors.category}</span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  {/* Property Description */}
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
                        onBlur={handleBlur}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                      {errors.property_description &&
                      touched.property_description ? (
                        <span className="text-danger">
                          {errors.property_description}
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                  {/* Property Icon */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="property_logo">
                        Property Icon
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
                              setFieldValue("property_logo", e.target.files[0]);
                              setPreviewIcon(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      <img
                        src={previewIcon}
                        className="mt-1"
                        width="100"
                        alt=""
                      />
                      {errors.property_logo && touched.property_logo ? (
                        <span className="text-danger">
                          {errors.property_logo}
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
                              setFieldValue(
                                "featured_image",
                                e.target.files[0]
                              );
                              setPreviewFeaturedImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      <img
                        src={previewFeaturedImage}
                        className="mt-1"
                        width="100"
                        alt=""
                      />
                      {errors.featured_image && touched.featured_image ? (
                        <span className="text-danger">
                          {errors.featured_image}
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

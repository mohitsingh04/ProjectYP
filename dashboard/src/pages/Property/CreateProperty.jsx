import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import JoditEditor from "jodit-react";
import ALLImages from "../../common/Imagesdata";
import { API } from "../../context/API";
import { CreatePropertyValidation } from "../../context/ValidationSchemas";
import Swal from "sweetalert2";

export default function CreateProperty() {
  const navigator = useNavigate();
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [btnResponse, setBtnResponse] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getAuhtUser = async () => {
    setAuthLoading(true);
    try {
      const response = await API.get(`/profile`);
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    getAuhtUser();
  }, []);

  if (!authLoading) {
    if (
      !authUser?.permissions?.some((item) => item.value === "Create Property")
    ) {
      navigator("/dashboard/access-denied");
    }
  }

  const getCategories = async () => {
    setCategoryLoading(true);
    try {
      const response = await API.get("/category");
      const data = response.data;
      setCategories(data.filter((item) => item.status === "Active"));
    } catch (error) {
      console.log(error);
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      property_name: "",
      email: "",
      contact: "",
      category: "",
      property_type: "",
      description: "",
      property_logo: null,
      featured_image: null,
    },
    validationSchema: CreatePropertyValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setBtnResponse(true);
      try {
        const formData = new FormData();
        formData.append("userId", authUser?.uniqueId);
        formData.append("property_name", values.property_name);
        formData.append("property_email", values.email);
        formData.append("property_mobile_no", values.contact);
        formData.append("category", values.category);
        formData.append("property_type", values.property_type);
        formData.append("property_description", values.description);

        if (values.property_logo) {
          formData.append("property_logo", values.property_logo);
        }
        if (values.featured_image) {
          formData.append("featured_image", values.featured_image);
        }

        const response = await API.post("/property", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message || "Property Added Successfully",
          });
          navigator("/dashboard/property");
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.error || "Failed to Add Propertu",
        });
      } finally {
        setBtnResponse(false);
      }
    },
  });

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (field === "property_logo") {
          setLogoPreview(reader.result);
        } else {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      formik.setFieldValue(field, file);
    }
  };

  return (
    <div>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <div>
          <h1 className="page-title fw-semibold fs-20 mb-0">Property</h1>
          <Breadcrumb className="mb-0">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/dashboard/property" }}
            >
              Property
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Button variant="primary" onClick={() => navigator(-1)}>
            <i className="fe fe-arrow-left"></i> Back
          </Button>
        </div>
      </div>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Create Property</h5>
            </Card.Header>
            <Card.Body>
              {!categoryLoading && categories.length <= 0 && (
                <Row>
                  <Col>
                    <Alert
                      variant="danger"
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <p className="m-0">There are no categories. Please.</p>
                      <Link
                        to="/dashboard/category/create"
                        className="btn btn-danger btn-sm"
                      >
                        Add Category
                      </Link>
                    </Alert>
                  </Col>
                </Row>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Property Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter property name"
                        {...formik.getFieldProps("property_name")}
                        isInvalid={formik.errors.property_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.property_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                        isInvalid={formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact</Form.Label>
                      <PhoneInput
                        country={"in"}
                        value={formik.values.contact}
                        onChange={(mobile_no) =>
                          formik.setFieldValue("contact", mobile_no)
                        }
                        inputClass="input100 w-100 border"
                        inputStyle={{ height: "45px" }}
                        buttonClass="bg-white border"
                        isValid={!formik.errors.contact}
                      />
                      {formik.errors.contact && (
                        <p className="text-danger">{formik.errors.contact}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        {...formik.getFieldProps("category")}
                        isInvalid={formik.errors.category}
                      >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                          <option value={item.category_name} key={index}>
                            {item.category_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        {...formik.getFieldProps("property_type")}
                        isInvalid={formik.errors.property_type}
                      >
                        <option value="">--Select Type--</option>
                        <option value="Goverment">Goverment</option>
                        <option value="Semigoverment">Semigoverment</option>
                        <option value="private">private</option>
                        <option value="Organization">Organization</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.property_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <JoditEditor
                    value={formik.values.description}
                    onChange={(content) =>
                      formik.setFieldValue("description", content)
                    }
                  />
                </Form.Group>

                <Row className="my-3">
                  <Col md={6}>
                    <div className="d-flex justify-content-between">
                      <p>
                        <strong>Property Logo</strong>
                      </p>
                      <Form.Group className="mb-3">
                        <Form.Label
                          htmlFor="property_logo"
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fe fe-upload me-1"></i>Upload Property
                          Logo
                        </Form.Label>
                        <Form.Control
                          hidden
                          type="file"
                          id="property_logo"
                          onChange={(event) =>
                            handleImageChange(event, "property_logo")
                          }
                        />
                      </Form.Group>
                    </div>
                    <img
                      src={logoPreview || ALLImages("face8")}
                      alt="Property Logo"
                      width="100"
                      className="mt-2 rounded-circle profile-ratio"
                    />
                  </Col>
                  <Col md={6}>
                    <div className="d-flex justify-content-between">
                      <p>
                        <strong>Featured Image</strong>
                      </p>
                      <Form.Group className="mb-3">
                        <Form.Label
                          htmlFor="featured_image"
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fe fe-upload me-1"></i>Upload Featured
                          Image
                        </Form.Label>
                        <Form.Control
                          type="file"
                          hidden
                          id="featured_image"
                          onChange={(event) =>
                            handleImageChange(event, "featured_image")
                          }
                        />
                      </Form.Group>
                    </div>
                    <img
                      src={imagePreview || ALLImages("face8")}
                      alt="Featured Image"
                      width="100"
                      className="mt-2"
                    />
                  </Col>
                </Row>

                <Button type="submit" variant="primary" disabled={btnResponse}>
                  <i className="fe fe-check-circle me-1"></i>
                  {btnResponse ? "Submitting...." : "Submit"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

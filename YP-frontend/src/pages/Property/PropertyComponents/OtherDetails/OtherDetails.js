import React, { useEffect, useState, useCallback } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import Businesshours from "./Businesshours";
import { useParams } from "react-router-dom";

const categorySchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
});

const propertyTypeSchema = Yup.object().shape({
  propertyType: Yup.string().required("Property type is required"),
});

const statusSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
});

const establishmentYearSchema = Yup.object().shape({
  establishmentYear: Yup.number()
    .required("Establishment year is required")
    .integer("Must be a whole number")
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .test(
      "len",
      "Must be exactly 4 digits",
      (val) => val?.toString().length === 4
    ),
});

export default function OtherDetails() {
  const { objectId } = useParams();
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState([]);
  const [property, setProperty] = useState({
    property_name: "",
    uniqueId: "",
    category: "",
    status: "",
    est_year: "",
    property_type: "",
  });

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showStatusInput, setShowStatusInput] = useState(false);
  const [showEstYearInput, setShowEstYearInput] = useState(false);
  const [showPropertyTypeInput, setShowPropertyTypeInput] = useState(false);

  const getProperty = useCallback(async () => {
    try {
      const { data } = await API.get(`/property/${objectId}`);
      setProperty(data);
    } catch (error) {
      toast.error("Failed to fetch property details");
    }
  }, [objectId]);

  const getCategory = useCallback(async () => {
    try {
      const { data } = await API.get("/category");
      const activeCategories = data.filter((item) => item.status === "Active");
      setCategory(activeCategories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  }, []);

  const getStatus = useCallback(async () => {
    try {
      const { data } = await API.get("/status");
      const propertyStatus = data.filter((item) => item.name === "Property");
      setStatus(propertyStatus);
    } catch (error) {
      toast.error("Failed to fetch status options");
    }
  }, []);

  useEffect(() => {
    getProperty();
    getCategory();
    getStatus();
  }, [getProperty, getCategory, getStatus]);

  // Formik setup for each field
  const categoryFormik = useFormik({
    initialValues: { category: property.category || "" },
    validationSchema: categorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await API.patch(`/property/${objectId}`, {
          property_name: property.property_name,
          property_id: property.uniqueId,
          category: values.category,
        });
        toast.success("Category updated successfully");
        setShowCategoryInput(false);
        getProperty();
      } catch (error) {
        toast.error("Failed to update category");
      }
    },
  });

  const propertyTypeFormik = useFormik({
    initialValues: { propertyType: property.property_type || "" },
    validationSchema: propertyTypeSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await API.patch(`/property/${objectId}`, {
          property_name: property.property_name,
          property_id: property.uniqueId,
          property_type: values.propertyType,
        });
        toast.success("Property type updated successfully");
        setShowPropertyTypeInput(false);
        getProperty();
      } catch (error) {
        toast.error("Failed to update property type");
      }
    },
  });

  const statusFormik = useFormik({
    initialValues: { status: property.status || "" },
    validationSchema: statusSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await API.patch(`/property/${objectId}`, {
          property_name: property.property_name,
          property_id: property.uniqueId,
          status: values.status,
        });
        toast.success("Status updated successfully");
        setShowStatusInput(false);
        getProperty();
      } catch (error) {
        toast.error("Failed to update status");
      }
    },
  });

  const establishmentYearFormik = useFormik({
    initialValues: { establishmentYear: property.est_year || "" },
    validationSchema: establishmentYearSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await API.patch(`/property/${objectId}`, {
          property_name: property.property_name,
          property_id: property.uniqueId,
          est_year: values.establishmentYear,
        });
        toast.success("Establishment year updated successfully");
        setShowEstYearInput(false);
        getProperty();
      } catch (error) {
        toast.error("Failed to update establishment year");
      }
    },
  });

  return (
    <div className="tab-pane profiletab show">
      <div id="profile-log-switch">
        <Card>
          <Card.Header>
            <h5>
              <strong>Other Details</strong>
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Category:</strong>
                {showCategoryInput ? (
                  <Form
                    onSubmit={categoryFormik.handleSubmit}
                    className="d-flex mt-2"
                  >
                    <div className="w-100">
                      <Form.Select
                        name="category"
                        value={categoryFormik.values.category}
                        onChange={categoryFormik.handleChange}
                        onBlur={categoryFormik.handleBlur}
                        isInvalid={
                          categoryFormik.touched.category &&
                          !!categoryFormik.errors.category
                        }
                      >
                        <option value="">--Select Category--</option>
                        {category.map((item, index) => (
                          <option key={index} value={item.category_name}>
                            {item.category_name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {categoryFormik.errors.category}
                      </Form.Control.Feedback>
                    </div>
                    <button>
                      <i className="fe fe-check"></i>
                    </button>
                    <button onClick={() => setShowCategoryInput(false)}>
                      <i className="fe fe-x"></i>
                    </button>
                  </Form>
                ) : (
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span>{property.category || "Not set"}</span>
                    <button onClick={() => setShowCategoryInput(true)}>
                      <i className="fe fe-edit"></i>
                    </button>
                  </div>
                )}
              </Col>

              <Col md={6} className="mb-3">
                <strong>Property Type:</strong>
                {showPropertyTypeInput ? (
                  <Form
                    onSubmit={propertyTypeFormik.handleSubmit}
                    className="d-flex mt-2"
                  >
                    <div className="w-100">
                      <Form.Select
                        name="propertyType"
                        value={propertyTypeFormik.values.propertyType}
                        onChange={propertyTypeFormik.handleChange}
                        onBlur={propertyTypeFormik.handleBlur}
                        isInvalid={
                          propertyTypeFormik.touched.propertyType &&
                          !!propertyTypeFormik.errors.propertyType
                        }
                      >
                        <option value="">--Select Type--</option>
                        <option value="Government">Government</option>
                        <option value="Semigovernment">Semigovernment</option>
                        <option value="Private">Private</option>
                        <option value="Organization">Organization</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {propertyTypeFormik.errors.propertyType}
                      </Form.Control.Feedback>
                    </div>
                    <button>
                      <i className="fe fe-check"></i>
                    </button>
                    <button onClick={() => setShowPropertyTypeInput(false)}>
                      <i className="fe fe-x"></i>
                    </button>
                  </Form>
                ) : (
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span>{property.property_type || "Not set"}</span>
                    <button
                      className="text-primary p-0"
                      onClick={() => setShowPropertyTypeInput(true)}
                    >
                      <i className="fe fe-edit"></i>
                    </button>
                  </div>
                )}
              </Col>

              <Col md={6} className="mb-3">
                <strong>Status:</strong>
                {showStatusInput ? (
                  <Form
                    onSubmit={statusFormik.handleSubmit}
                    className="d-flex mt-2"
                  >
                    <div className="w-100">
                      <Form.Select
                        name="status"
                        value={statusFormik.values.status}
                        onChange={statusFormik.handleChange}
                        onBlur={statusFormik.handleBlur}
                        isInvalid={
                          statusFormik.touched.status &&
                          !!statusFormik.errors.status
                        }
                      >
                        <option value="">--Select Status--</option>
                        {status.map((item, index) => (
                          <option key={index} value={item.parent_status}>
                            {item.parent_status}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {statusFormik.errors.status}
                      </Form.Control.Feedback>
                    </div>
                    <button>
                      <i className="fe fe-check"></i>
                    </button>
                    <button onClick={() => setShowStatusInput(false)}>
                      <i className="fe fe-x"></i>
                    </button>
                  </Form>
                ) : (
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span>{property.status || "Not set"}</span>
                    <button
                      className="text-primary p-0"
                      onClick={() => setShowStatusInput(true)}
                    >
                      <i className="fe fe-edit"></i>
                    </button>
                  </div>
                )}
              </Col>

              <Col md={6}>
                <strong>Establishment Year:</strong>
                {showEstYearInput ? (
                  <Form
                    onSubmit={establishmentYearFormik.handleSubmit}
                    className="d-flex mt-2"
                  >
                    <div className="w-100">
                      <Form.Control
                        type="number"
                        name="establishmentYear"
                        placeholder="Enter establishment year..."
                        value={establishmentYearFormik.values.establishmentYear}
                        onChange={establishmentYearFormik.handleChange}
                        onBlur={establishmentYearFormik.handleBlur}
                        isInvalid={
                          establishmentYearFormik.touched.establishmentYear &&
                          !!establishmentYearFormik.errors.establishmentYear
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {establishmentYearFormik.errors.establishmentYear}
                      </Form.Control.Feedback>
                    </div>
                    <button>
                      <i className="fe fe-check"></i>
                    </button>
                    <button onClick={() => setShowEstYearInput(false)}>
                      <i className="fe fe-x"></i>
                    </button>
                  </Form>
                ) : (
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <span>{property.est_year || "Not set"}</span>
                    <button onClick={() => setShowEstYearInput(true)}>
                      <i className="fe fe-edit"></i>
                    </button>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Businesshours property={property} />
      </div>
    </div>
  );
}

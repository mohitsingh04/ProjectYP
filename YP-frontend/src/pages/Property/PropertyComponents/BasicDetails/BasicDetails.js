import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import PropertyImages from "./PropertyImages";
import Skeleton from "react-loading-skeleton";

export default function BasicDetails() {
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAltPhoneUpdating, setIsAltPhoneUpdating] = useState(false);
  const [isNameUpdating, setIsNameUpdating] = useState(false);
  const [isEmailUpdating, setIsEmailUpdating] = useState(false);
  const [isPhoneUpdating, setIsPhoneUpdating] = useState(false);

  const getProperty = useCallback(() => {
    API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
      setLoading(false);
    });
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);
  const [showDescriptionInInput, setShowDescriptionInInput] = useState(false);

  const handleEditDescription = () => {
    setShowDescriptionInInput(true);
  };

  const handleCancelEditDescription = () => {
    setShowDescriptionInInput(false);
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
    property_alt_mobile_no: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Alternate Mobile number must be a positive 10-digit number."
      )
      .required("Mobile number is required."),
  });

  const initialValues = {
    property_id: property.uniqueId,
    property_name: property.property_name || "",
    property_email: property.property_email || "",
    property_mobile_no: property.property_mobile_no || "",
    property_alt_mobile_no: property.property_alt_mobile_no || "",
    property_description: property.property_description || "",
  };

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        property_description: description || property.property_description,
      };
      API.patch(`/property/${objectId}`, values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          handleCancelEditDescription();
          getProperty();
          setIsEmailUpdating(false);
          setIsAltPhoneUpdating(false);
          setIsNameUpdating(false);
          setIsPhoneUpdating(false);
          formik.resetForm();
        } else if (response.data.error) {
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
    enableReinitialize: true,
  });

  const [isExpanded, setIsExpended] = useState(false);
  const toggleReadMore = () => {
    setIsExpended(!isExpanded);
  };

  return (
    <>
      <div className="tab-pane profiletab show">
        <div id="profile-log-switch">
          <Card>
            <Card.Header>
              <h5>
                <strong>Basic Details</strong>
              </h5>
            </Card.Header>
            <Card.Body className="bg-white">
              <div className="table-responsive p-1">
                <Table className="table row table-borderless">
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        {!loading ? (
                          isNameUpdating ? (
                            <div>
                              <form onSubmit={formik.handleSubmit}>
                                <input
                                  type="text"
                                  placeholder="Enter New Email"
                                  className="form-control"
                                  name="property_name"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.property_name}
                                />
                                <button>
                                  <i className="fe fe-check"></i>
                                </button>
                                <span onClick={() => setIsNameUpdating(false)}>
                                  <i className="fe fe-x"></i>
                                </span>
                                {formik.errors.property_name &&
                                  formik.touched.property_name && (
                                    <p className="text-danger">
                                      {formik.errors.property_name}
                                    </p>
                                  )}
                              </form>
                            </div>
                          ) : (
                            <>
                              <strong>Name :</strong>
                              <br />
                              <div>{property?.property_name || "N/A"}</div>
                              <button onClick={() => setIsNameUpdating(true)}>
                                <i className="fe fe-edit"></i>
                              </button>
                            </>
                          )
                        ) : (
                          <Skeleton height={25} width={150} className="my-2" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {!loading ? (
                          isPhoneUpdating ? (
                            <div>
                              <form onSubmit={formik.handleSubmit}>
                                <input
                                  type="tel"
                                  placeholder="Enter New Email"
                                  className="form-control"
                                  name="property_mobile_no"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.property_mobile_no}
                                />
                                <button>
                                  <i className="fe fe-check"></i>
                                </button>
                                <span onClick={() => setIsPhoneUpdating(false)}>
                                  <i className="fe fe-x"></i>
                                </span>
                                {formik.errors.property_mobile_no &&
                                  formik.touched.property_mobile_no && (
                                    <p className="text-danger">
                                      {formik.errors.property_mobile_no}
                                    </p>
                                  )}
                              </form>
                            </div>
                          ) : (
                            <>
                              <strong>Contact :</strong>
                              <br />
                              <div>
                                {property?.property_mobile_no || "N/A"}
                                <button
                                  onClick={() => setIsPhoneUpdating(true)}
                                >
                                  <i className="fe fe-edit"></i>
                                </button>
                              </div>
                            </>
                          )
                        ) : (
                          <Skeleton height={25} width={150} className="my-2" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        {!loading ? (
                          isEmailUpdating ? (
                            <div>
                              <form onSubmit={formik.handleSubmit}>
                                <input
                                  type="email"
                                  placeholder="Enter New Email"
                                  className="form-control"
                                  name="property_email"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.property_email}
                                />
                                <button>
                                  <i className="fe fe-check"></i>
                                </button>
                                <span onClick={() => setIsEmailUpdating(false)}>
                                  <i className="fe fe-x"></i>
                                </span>
                                {formik.errors.property_email &&
                                  formik.touched.property_email && (
                                    <p className="text-danger">
                                      {formik.errors.property_email}
                                    </p>
                                  )}
                              </form>
                            </div>
                          ) : (
                            <>
                              <strong>Email :</strong>
                              <br />
                              <div>
                                {property.property_email}
                                <span onClick={() => setIsEmailUpdating(true)}>
                                  <i className="fe fe-edit"></i>
                                </span>
                              </div>
                            </>
                          )
                        ) : (
                          <Skeleton width={150} height={25} className="my-2" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {!loading ? (
                          <>
                            <strong>Alt. Contact :</strong>
                            {!property.property_alt_mobile_no ? (
                              <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex"
                              >
                                <div className="">
                                  <input
                                    type="tel"
                                    name="property_alt_mobile_no"
                                    className="form-control"
                                    placeholder="Enter Alternate Contact..."
                                    value={formik.values.property_alt_mobile_no}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  <button type="submit">
                                    <i className="fe fe-check"></i>
                                  </button>
                                  {formik.errors.property_alt_mobile_no &&
                                    formik.touched.property_alt_mobile_no && (
                                      <p className="text-danger">
                                        {formik.errors.property_alt_mobile_no}
                                      </p>
                                    )}
                                </div>
                              </form>
                            ) : isAltPhoneUpdating ? (
                              <div>
                                <form onSubmit={formik.handleSubmit}>
                                  <input
                                    type="tel"
                                    placeholder="Enter New Email"
                                    className="form-control"
                                    name="property_alt_mobile_no"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.property_alt_mobile_no}
                                  />
                                  <button>
                                    <i className="fe fe-check"></i>
                                  </button>
                                  <span
                                    onClick={() => setIsAltPhoneUpdating(false)}
                                  >
                                    <i className="fe fe-x"></i>
                                  </span>
                                  {formik.errors.property_alt_mobile_no &&
                                    formik.touched.property_alt_mobile_no && (
                                      <p className="text-danger">
                                        {formik.errors.property_alt_mobile_no}
                                      </p>
                                    )}
                                </form>
                              </div>
                            ) : (
                              <div>
                                {property.property_alt_mobile_no}
                                <button
                                  onClick={() => setIsAltPhoneUpdating(true)}
                                >
                                  <i className="fe fe-edit"></i>
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <Skeleton height={25} width={150} className="my-2" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Row className="row profie-img">
                <Col md={12}>
                  {!loading ? (
                    <>
                      <div className="media-heading">
                        <div className="d-flex align-items-center">
                          <strong>Description</strong>
                          {!showDescriptionInInput && (
                            <div>
                              <button
                                onClick={() => handleEditDescription()}
                                className="ms-auto"
                              >
                                <i className="fe fe-edit"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {showDescriptionInInput ? (
                        <>
                          <form onSubmit={formik.handleSubmit}>
                            <Editor
                              apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                              onInit={(evt, editor) =>
                                (editorRef.current = editor)
                              }
                              onChange={(e) =>
                                setDescription(editorRef.current.getContent())
                              }
                              onBlur={formik.handleBlur}
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
                              initialValue={property.property_description}
                            />
                            <button type="submit" className="mt-1">
                              <i className="fe fe-check"></i>
                            </button>
                            <button
                              onClick={handleCancelEditDescription}
                              className="mx-3 py-2 mt-1"
                            >
                              <i className="fe fe-x"></i>
                            </button>
                          </form>
                        </>
                      ) : (
                        <>
                          <div>
                            {property.property_description && (
                              <span>
                                {property.property_description.length >=
                                1500 ? (
                                  <>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: isExpanded
                                          ? property.property_description
                                          : property.property_description.substring(
                                              0,
                                              1200
                                            ) + "...",
                                      }}
                                    />
                                    <button
                                      onClick={toggleReadMore}
                                      className="btn btn-primary"
                                    >
                                      {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                  </>
                                ) : (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: property.property_description,
                                    }}
                                  />
                                )}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Skeleton height={200} />
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <PropertyImages loading={loading} />
        </div>
      </div>
    </>
  );
}

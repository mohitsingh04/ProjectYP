import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import PropertyImages from "./PropertyImages";
import DataRequest from "../../../context/DataRequest";

export default function BasicDetails() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { User } = DataRequest();
  const { uniqueId } = useParams();
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState([]);
  const [property, setProperty] = useState("");
  const [description, setDescription] = useState("");
  const [businessHours, setBusinessHours] = useState({
    MondayToSaturday: { open: "", close: "" },
    Sunday: " Closed",
  });
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");

  useEffect(() => {
    getProperty();
    getCategory();
    getStatus();
  }, []);

  const getProperty = () => {
    dispatch(showLoading());
    API.get(`/property/${uniqueId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  };

  const getCategory = () => {
    dispatch(showLoading());
    API.get(`/category`).then(({ data }) => {
      dispatch(hideLoading());
      setCategory(data);
    });
  };

  const getStatus = () => {
    dispatch(showLoading());
    API.get(`/status`).then(({ data }) => {
      dispatch(hideLoading());
      setStatus(data);
    });
  };

  {
    /*Personal Information */
  }
  const [showNameInInput, setShowNameInInput] = useState(false);
  const [showEmailInInput, setShowEmailInInput] = useState(false);
  const [showContactInInput, setShowContactInInput] = useState(false);
  const [showAltContactInInput, setShowAltContactInInput] = useState(false);
  const [showDescriptionInInput, setShowDescriptionInInput] = useState(false);

  {
    /*Personal Information */
  }
  const handleEditName = () => {
    setShowNameInInput(true);
  };
  const handleUpdateName = () => {
    setShowNameInInput(false);
  };
  const handleCancelEditName = () => {
    setShowNameInInput(false);
  };
  const handleEditEmail = () => {
    setShowEmailInInput(true);
  };
  const handleUpdateEmail = () => {
    setShowEmailInInput(false);
  };
  const handleCancelEditEmail = () => {
    setShowEmailInInput(false);
  };
  const handleEditContact = () => {
    setShowContactInInput(true);
  };
  const handleUpdateContact = () => {
    setShowContactInInput(false);
  };
  const handleCancelEditContact = () => {
    setShowContactInInput(false);
  };
  const handleEditAltContact = () => {
    setShowAltContactInInput(true);
  };
  const handleUpdateAltContact = () => {
    setShowAltContactInInput(false);
  };
  const handleCancelEditAltContact = () => {
    setShowAltContactInInput(false);
  };
  const handleEditDescription = () => {
    setShowDescriptionInInput(true);
  };
  const handleUpdateDescription = () => {
    setShowDescriptionInInput(false);
  };
  const handleCancelEditDescription = () => {
    setShowDescriptionInInput(false);
  };

  const initialValues = {
    property_name: property.property_name || "",
    property_email: property.property_email || "",
    property_mobile_no: property.property_mobile_no || "",
    property_alt_mobile_no: property.property_alt_mobile_no || "",
    property_description: property.property_description || "",
    category: property.category || "",
    status: property.status || "",
    est_year: property.est_year || "",
  };

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        property_description: description || property.property_description,
        business_time: businessHours,
      };
      dispatch(showLoading());
      API.patch(`/property/${uniqueId}`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: validationSchema,
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
                        <strong>Name :</strong>
                        {!property.property_name ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_name"
                                className="form-control"
                                placeholder="Enter Name..."
                                value={values.property_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <button onClick={handleCancelEditName} className="mx-3 py-2 text-primary"><i className="fe fe-x"></i></button> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showNameInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_name"
                                className="form-control"
                                placeholder="Enter Name..."
                                value={values.property_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <button
                                onClick={handleCancelEditName}
                                className="mx-3 py-2 text-primary"
                              >
                                <i className="fe fe-x"></i>
                              </button>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_name}
                              <button onClick={() => handleEditName()}>
                                <i className="fe fe-edit text-primary"></i>
                              </button>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Contact :</strong>
                        {!property.property_mobile_no ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="number"
                                name="property_mobile_no"
                                className="form-control"
                                placeholder="Enter Contact..."
                                value={values.property_mobile_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <button onClick={handleCancelEditContact} className="mx-3 py-2"><i className="fe fe-x"></i></button> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showContactInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="number"
                                name="property_mobile_no"
                                className="form-control"
                                placeholder="Enter Contact..."
                                value={values.property_mobile_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <button
                                onClick={handleCancelEditContact}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </button>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_mobile_no}
                              <button
                                onClick={() => handleEditContact()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </button>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        <strong>Email :</strong>
                        {!property.property_email ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_Email"
                                className="form-control"
                                placeholder="Enter Email..."
                                value={values.property_email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <span onClick={handleCancelEditEmail} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showEmailInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_Email"
                                className="form-control"
                                placeholder="Enter Email..."
                                value={values.property_email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <span
                                onClick={handleCancelEditEmail}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_email}
                              <span
                                onClick={() => handleEditEmail()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Alt. Contact :</strong>
                        {!property.property_alt_mobile_no ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="number"
                                name="property_alt_mobile_no"
                                className="form-control"
                                placeholder="Enter Alternate Contact..."
                                value={values.property_alt_mobile_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <span onClick={handleCancelEditAltContact} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showAltContactInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="number"
                                name="property_alt_mobile_no"
                                className="form-control"
                                placeholder="Enter Alternate Contact..."
                                value={values.property_alt_mobile_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <span
                                onClick={handleCancelEditAltContact}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_alt_mobile_no}
                              <span
                                onClick={() => handleEditAltContact()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Row className="row profie-img">
                <Col md={12}>
                  <div className="media-heading">
                    <h5>
                      <strong>Description</strong>
                      {showDescriptionInInput ? (
                        <>
                          <span
                            onClick={handleCancelEditDescription}
                            className="mx-3 py-2"
                          >
                            <i className="fe fe-x"></i>
                          </span>
                          <button type="submit" className="btn">
                            <i className="fe fe-check text-primary"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => handleEditDescription()}
                            className="mx-2 py-2"
                          >
                            <i className="fe fe-edit"></i>
                          </span>
                        </>
                      )}
                    </h5>
                  </div>
                  {showDescriptionInInput ? (
                    <>
                      <form onSubmit={handleSubmit}>
                        <Editor
                          apiKey="2208d39gvqf0t85mghgd0dkeiea75lcrl5ffsyn3y8ulwsy8"
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
                          initialValue={property.property_description}
                        />
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <p>
                        {property.property_description && (
                          <span>
                            {property.property_description.length >= 1500 ? (
                              <>
                                <p
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
                                  className="text-primary m-0 p-0 text-decoration-underline"
                                >
                                  {isExpanded ? "Read Less" : "Read More"}
                                </button>
                              </>
                            ) : (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: property.property_description,
                                }}
                              />
                            )}
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <PropertyImages />
        </div>
      </div>
    </>
  );
}

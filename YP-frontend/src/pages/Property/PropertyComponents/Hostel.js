import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export default function Hostel() {
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getProperty = () => {
      API.get(`/property/${objectId}`).then(({ data }) => {
        setProperty(data);
      });
    };
    getProperty();
  }, [objectId]);

  const [showHostelTypeInInput, setShowHostelTypeInInput] = useState(false);
  const [showHostelDescriptionInInput, setShowHostelDescriptionInInput] =
    useState(false);

  const handleEditHostelType = () => {
    setShowHostelTypeInInput(true);
  };
  const handleCancelEditHostelType = () => {
    setShowHostelTypeInInput(false);
  };
  const handleEditHostelDescription = () => {
    setShowHostelDescriptionInInput(true);
  };
  const handleCancelEditHostelDescription = () => {
    setShowHostelDescriptionInInput(false);
  };

  const initialValues = {
    property_name: property.property_name || "",
    property_hostel_type: property.property_hostel_type || [],
  };

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        property_hostel_description:
          description || property.property_hostel_description,
      };
      API.patch(`/property/${objectId}`, values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const handleToggleCheckbox = (value) => {
    const updatedProperty = { ...property };
    if (updatedProperty.property_hostel_type.includes(value)) {
      updatedProperty.property_hostel_type =
        updatedProperty.property_hostel_type.filter((item) => item !== value);
    } else {
      updatedProperty.property_hostel_type.push(value);
    }
    setProperty(updatedProperty);
  };

  const [isExpanded, setIsExpended] = useState(false);
  const toggleReadMore = () => {
    setIsExpended(!isExpanded);
  };

  return (
    <>
      <div className="tab-pane locationtab show">
        <div id="hostel-log-switch">
          <Card>
            <Card.Header>
              <Card.Title as="h5">Hostel Details</Card.Title>
            </Card.Header>
            <Card.Body className="bg-white">
              <Row className="">
                <Col md={12}>
                  <strong>Hostel Type</strong>
                  {!property.property_hostel_type ? (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group ">
                          <div className="selectgroup selectgroup-pills">
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="1"
                                className="selectgroup-input"
                                value="Boys"
                                onChange={() => handleToggleCheckbox("Boys")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Boys")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Boys</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="2"
                                className="selectgroup-input"
                                value="Girls"
                                onChange={() => handleToggleCheckbox("Girls")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Girls")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Girls</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="3"
                                className="selectgroup-input"
                                value="Co. Ed."
                                onChange={() => handleToggleCheckbox("Co. Ed.")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Co. Ed.")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">
                                Co. Ed.
                              </span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="4"
                                className="selectgroup-input"
                                value="Shared"
                                onChange={() => handleToggleCheckbox("Shared")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Shared")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Shared</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="5"
                                className="selectgroup-input"
                                value="Family"
                                onChange={() => handleToggleCheckbox("Family")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Family")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Family</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="6"
                                className="selectgroup-input"
                                value="Couples"
                                onChange={() => handleToggleCheckbox("Couples")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Couples")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">
                                Couples
                              </span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="7"
                                className="selectgroup-input"
                                value="AC"
                                onChange={() => handleToggleCheckbox("AC")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("AC")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">AC</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="8"
                                className="selectgroup-input"
                                value="Non AC"
                                onChange={() => handleToggleCheckbox("Non AC")}
                                onBlur={handleBlur}
                                // checked={property.property_hostel_type.includes("Non AC")}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Non AC</span>
                            </label>
                            &nbsp;&nbsp;
                          </div>
                        </div>
                        <span
                          onClick={handleCancelEditHostelType}
                          className="mx-3 py-2"
                        >
                          <i className="fe fe-x"></i>
                        </span>
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : showHostelTypeInInput ? (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group ">
                          <div className="selectgroup selectgroup-pills">
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="1"
                                className="selectgroup-input"
                                value="Boys"
                                onChange={() => handleToggleCheckbox("Boys")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Boys"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Boys</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="2"
                                className="selectgroup-input"
                                value="Girls"
                                onChange={() => handleToggleCheckbox("Girls")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Girls"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Girls</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="3"
                                className="selectgroup-input"
                                value="Co. Ed."
                                onChange={() => handleToggleCheckbox("Co. Ed.")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Co. Ed."
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">
                                Co. Ed.
                              </span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="4"
                                className="selectgroup-input"
                                value="Shared"
                                onChange={() => handleToggleCheckbox("Shared")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Shared"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Shared</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="5"
                                className="selectgroup-input"
                                value="Family"
                                onChange={() => handleToggleCheckbox("Family")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Family"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Family</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="6"
                                className="selectgroup-input"
                                value="Couples"
                                onChange={() => handleToggleCheckbox("Couples")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Couples"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">
                                Couples
                              </span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="7"
                                className="selectgroup-input"
                                value="AC"
                                onChange={() => handleToggleCheckbox("AC")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "AC"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">AC</span>
                            </label>
                            &nbsp;&nbsp;
                            <label className="selectgroup-item">
                              <input
                                type="checkbox"
                                name="property_hostel_type"
                                id="8"
                                className="selectgroup-input"
                                value="Non AC"
                                onChange={() => handleToggleCheckbox("Non AC")}
                                onBlur={handleBlur}
                                checked={property.property_hostel_type.includes(
                                  "Non AC"
                                )}
                              />
                              &nbsp;&nbsp;
                              <span className="selectgroup-button">Non AC</span>
                            </label>
                            &nbsp;&nbsp;
                          </div>
                        </div>
                        <span
                          onClick={handleCancelEditHostelType}
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
                        <div className="row mt-3">
                          {property.property_hostel_type.map((item, key) => (
                            <div key={key} className="col-md-3">
                              <Card className="border p-0 over-flow-hidden">
                                <Card.Body className="media media-xs overflow-visible">
                                  <div className="media-body valign-middle">
                                    <p className="fw-semibold text-dark">
                                      {item}
                                    </p>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          ))}
                        </div>
                        <span
                          onClick={() => handleEditHostelType()}
                          className="mx-2"
                        >
                          <i className="fe fe-edit"></i>
                        </span>
                      </>
                    </>
                  )}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12}>
                  <div className="media-heading">
                    <h5>
                      <strong>Description</strong>
                      {showHostelDescriptionInInput ? (
                        <>
                          <span
                            onClick={handleCancelEditHostelDescription}
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
                            onClick={() => handleEditHostelDescription()}
                            className="mx-2 py-2"
                          >
                            <i className="fe fe-edit"></i>
                          </span>
                        </>
                      )}
                    </h5>
                  </div>
                  {showHostelDescriptionInInput ? (
                    <>
                      <form onSubmit={handleSubmit}>
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
                            plugins:
                              process.env.REACT_APP_TINYEDITORPLUGINS?.split(
                                " "
                              ),
                            toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                            content_style:
                              process.env.REACT_APP_TINYEDITORSTYLE,
                          }}
                          initialValue={property.property_hostel_description}
                        />
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div>
                        {property.property_hostel_description && (
                          <span>
                            {property.property_hostel_description.length >=
                            1500 ? (
                              <>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: isExpanded
                                      ? property.property_hostel_description
                                      : property.property_hostel_description.substring(
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
                                  __html: property.property_hostel_description,
                                }}
                              />
                            )}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

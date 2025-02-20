import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import PropertyImages from "./PropertyImages";

export default function BasicDetails() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [description, setDescription] = useState("");

  const getProperty = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  }, [dispatch, objectId]);

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

  const initialValues = {
    property_name: property.property_name || "",
    property_alt_mobile_no: property.property_alt_mobile_no || "",
    property_description: property.property_description || "",
  };

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        property_description: description || property.property_description,
      };
      dispatch(showLoading());
      API.patch(`/property/${objectId}`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          handleCancelEditDescription();
          getProperty();
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
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
                        <br />
                        {property?.property_name || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Contact :</strong>
                        <br />
                        {property?.property_mobile_no || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        <strong>Email :</strong>
                        <br />
                        {property.property_email}
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
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <br />
                            {property.property_alt_mobile_no}
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
                          initialValue={property.property_description}
                        />
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div>
                        {property.property_description && (
                          <span>
                            {property.property_description.length >= 1500 ? (
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
                                  className="text-primary m-0 p-0 text-decoration-underline"
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

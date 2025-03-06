import React, { useEffect, useState, useRef, useCallback } from "react";
import { Accordion, Form, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import { API } from "../../../context/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Faqs() {
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const { User } = DataRequest();
  const [property, setProperty] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [answer, setAnswer] = useState("");

  const getProperty = useCallback(() => {
    API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
    });
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const getFaqs = useCallback(() => {
    API.get("/faqs").then(({ data }) => {
      setFaqs(
        data.filter((faqs) => faqs.property_id === String(property?.uniqueId))
      );
    });
  }, [property]);

  useEffect(() => {
    getFaqs();
  }, [getFaqs]);

  const initialValues = {
    question: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        answer: answer,
        property_id: property.uniqueId,
        property_name: property.property_name,
        userId: User.uniqueId,
      };
      API.post("/faqs", values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          resetForm();
          getFaqs();
          setAnswer("");
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleDeleteFaqs = (uniqueId) => {
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
          API.delete(`/faqs/${uniqueId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              getFaqs();
              setAnswer("");
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
        getFaqs();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="tab-pane" id="tab-81">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5>
                  <strong>Faqs</strong>
                </h5>
              </Card.Header>
              <Card.Body className="faqaccordion">
                {faqs.length <= 0 ? (
                  "No Faqs"
                ) : (
                  <>
                    {faqs.map((item, key) => (
                      <div key={key} className="d-flex gap-4">
                        <div
                          aria-multiselectable="true"
                          className="accordion propertyFaqs"
                          id="accordion"
                          role="tablist"
                        >
                          <Accordion className="acc-card mb-4 " flush>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header className="acc-header d-flex">
                                {item.question}
                              </Accordion.Header>
                              <Accordion.Body className="border">
                                {item.answer.replace(/<[^>]+>/g, "")}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                        <div>
                          <span>
                            <Link
                              to={`/dashboard/edit/faqs/${item.property_name}/${item._id}`}
                            >
                              <button className="btn">
                                <i className="fe fe-edit text-primary"></i>
                              </button>
                            </Link>
                          </span>
                          <span>
                            <button
                              onClick={() => handleDeleteFaqs(item.uniqueId)}
                              className="btn"
                            >
                              <i className="fe fe-trash text-primary"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h5 className="mb-3">
                  <strong>Add a New Question</strong>
                </h5>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="">
                    <Form.Label>Your Question</Form.Label>
                    <Form.Group className="form-group">
                      <Form.Control
                        type="text"
                        name="question"
                        className="form-control"
                        placeholder="Your Question..."
                        value={values.question}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.question && touched.question ? (
                        <span className="text-danger">{errors.question}</span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Label>Your Answer</Form.Label>
                    <Form.Group className="form-group">
                      <Editor
                        apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={(e) =>
                          setAnswer(editorRef.current.getContent())
                        }
                        onBlur={handleBlur}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins:
                            process.env.REACT_APP_TINYEDITORPLUGINS?.split(" "),
                          toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                          content_style: process.env.REACT_APP_TINYEDITORSTYLE,
                        }}
                      />
                    </Form.Group>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Question
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

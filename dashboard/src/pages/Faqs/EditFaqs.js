import React, { useEffect, useState, useRef, useCallback } from "react";
import { Breadcrumb, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";

export default function EditFaqs() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [faqs, setFaqs] = useState("");
  const [status, setStatus] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const getFaqs = useCallback(() => {
    API.get(`/faqs/${objectId}`).then(({ data }) => {
      setFaqs(data);
      setLoading(false);
    });
  }, [objectId]);

  const getStatus = useCallback(() => {
    API.get(`/status`).then(({ data }) => {
      setStatus(data);
    });
  }, []);

  useEffect(() => {
    getFaqs();
    getStatus();
  }, [getFaqs, getStatus]);

  const initialValues = {
    question: faqs.question || "",
    status: faqs.status || "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required."),
    status: Yup.string().required("Status is required."),
  });

  const onSubmit = async (values) => {
    values = { ...values, answer: answer || faqs.answer };
    API.patch(`/faqs/${objectId}`, values).then((response) => {
      if (response.data.message) {
        toast.success(response.data.message);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
      enableReinitialize: true,
    });

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Faqs</h1>
            {!loading ? (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item className="breadcrumb-item" href="#">
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  Edit
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item"
                  aria-current="page"
                >
                  Faqs
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item breadcrumds"
                  aria-current="page"
                >
                  {faqs.property_name}
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {faqs.uniqueId}
                </Breadcrumb.Item>
              </Breadcrumb>
            ) : (
              <Skeleton width={200} />
            )}
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back
            </button>
          </div>
        </div>

        <Card>
          {!loading ? (
            <>
              <Card.Header>
                <h5>
                  <strong>Edit FAQS</strong>
                </h5>
              </Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
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
                            <span className="text-danger">
                              {errors.question}
                            </span>
                          ) : (
                            <span />
                          )}
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={6}>
                      <Form.Label>Status</Form.Label>
                      <Form.Group className="form-group">
                        <select
                          name="status"
                          className="form-control"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select Status--</option>
                          {status.map((item, key) => (
                            <option key={key} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.status && touched.status ? (
                          <span className="text-danger">{errors.status}</span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Form.Label>Your Answer</Form.Label>
                        <Form.Group className="form-group">
                          <Editor
                            apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            onChange={(e) =>
                              setAnswer(editorRef.current.getContent())
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
                            initialValue={faqs.answer}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </Card.Body>
            </>
          ) : (
            <Card.Body>
              <Skeleton count={8} height={25} className="my-2" />
            </Card.Body>
          )}
        </Card>
      </div>
    </>
  );
}

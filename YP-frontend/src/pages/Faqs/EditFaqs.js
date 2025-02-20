import React, { useEffect, useState, useRef, useCallback } from "react";
import { Breadcrumb, Form, Card, Row, Col } from "react-bootstrap";
// import DataRequest from "../../context/DataRequest";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditFaqs() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  // const { User } = DataRequest();
  const [faqs, setFaqs] = useState("");
  const [status, setStatus] = useState([]);
  // const [property, setProperty] = useState("");
  const [answer, setAnswer] = useState("");
  // const [Error, setError] = useState("");

  const getFaqs = useCallback(() => {
    API.get(`/faqs/${objectId}`).then(({ data }) => {
      setFaqs(data);
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
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
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
                        <span className="text-danger">{errors.question}</span>
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
                        apiKey="2208d39gvqf0t85mghgd0dkeiea75lcrl5ffsyn3y8ulwsy8"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={(e) =>
                          setAnswer(editorRef.current.getContent())
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
                            "removeformat",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
        </Card>
      </div>
    </>
  );
}

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Col, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
// import Swal from "sweetalert2";

export default function EditCourseAeo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { uniqueId } = useParams();
  const [description, setDescription] = useState("");
  const [seo, setSeo] = useState("");

  const getSeo = useCallback(() => {
    API.get(`/seo/${uniqueId}`).then(({ data }) => {
      setSeo(data);
    });
  }, [uniqueId]);
  useEffect(() => {
    getSeo();
  }, [getSeo]);

  const initialValues = {
    title: seo?.title || "",
    meta_tags: seo?.meta_tags || "",
    slug: seo?.slug || "",
    primary_focus_keyword: seo?.primary_focus_keyword || "",
    json_schema: seo?.json_schema || "",
    description: seo?.description || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    meta_tags: Yup.string().required("Meta tags is required."),
    slug: Yup.string().required("Slug is required."),
    primary_focus_keyword: Yup.string().required(
      "Primary focus keyword is required."
    ),
    json_schema: Yup.string().required("Json schema is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = { ...values, description: description };
      dispatch(showLoading());
      API.patch(`/seo/${uniqueId}`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          navigate(`/dashboard/course-seo/add/${seo.course_id}`);
          getSeo();
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
      initialValues,
      validationSchema,
      onSubmit,
      enableReinitialize: true,
    });

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Edit Course Seo</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item breadcrumds"
                aria-current="page"
              >
                Course Seo
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active"
                aria-current="page"
              >
                Edit
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link
              to="/dashboard/course/"
              className="btn btn-primary btn-icon text-white me-3"
            >
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back to Course
            </Link>
          </div>
        </div>

        <Row>
          <div className="col-md-12 col-lg-12">
            <Card>
              <Card.Header>
                <h3 className="card-title">Edit Course Seo</h3>
              </Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label>Seo Title</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          placeholder="Seo title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.title && touched.title ? (
                          <span className="text-danger">{errors.title}</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label>Meta Tags</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="meta_tags"
                          placeholder="Meta Tags"
                          value={values.meta_tags}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.meta_tags && touched.meta_tags ? (
                          <span className="text-danger">
                            {errors.meta_tags}
                          </span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label>Slug</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="slug"
                          placeholder="Slug"
                          value={values.slug}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.slug && touched.slug ? (
                          <span className="text-danger">{errors.slug}</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Form.Label>Primary Focus Keyword</Form.Label>
                        <input
                          type="text"
                          className="form-control"
                          name="primary_focus_keyword"
                          placeholder="Primary Focus Keyword"
                          value={values.primary_focus_keyword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.primary_focus_keyword &&
                        touched.primary_focus_keyword ? (
                          <span className="text-danger">
                            {errors.primary_focus_keyword}
                          </span>
                        ) : (
                          <span />
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Form.Label>Json Schema</Form.Label>
                        <textarea
                          className="form-control"
                          name="json_schema"
                          placeholder="Json Schema"
                          value={values.json_schema}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows="3"
                        />
                        {errors.json_schema && touched.json_schema ? (
                          <span className="text-danger">
                            {errors.json_schema}
                          </span>
                        ) : (
                          <span />
                        )}
                        <small className="float-end">0/200</small>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Editor
                          apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          onChange={(e) =>
                            setDescription(editorRef.current.getContent())
                          }
                          onBlur={handleBlur}
                          init={{
                            height: 250,
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
                          initialValue={seo?.description}
                        />
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
        </Row>
      </div>
    </>
  );
}

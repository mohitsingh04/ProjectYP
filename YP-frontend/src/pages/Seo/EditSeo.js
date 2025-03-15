import React, { useEffect, useState, useRef, useCallback } from "react";
import { Breadcrumb, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import Dropdown from "react-dropdown-select";
import Skeleton from "react-loading-skeleton";

export default function EditSeo() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [seo, setSeo] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const getSeo = useCallback(() => {
    API.get(`/seo/${objectId}`).then(({ data }) => {
      setSeo(data);
      setLoading(false);
    });
  }, [objectId]);

  useEffect(() => {
    getSeo();
  }, [getSeo]);

  const initialValues = {
    title: seo.title || "",
    meta_tags: seo.meta_tags || [],
    slug: seo.slug || "",
    primary_focus_keyword: seo.primary_focus_keyword || "",
    json_schema: seo.json_schema || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    slug: Yup.string().required("Slug is required."),
    json_schema: Yup.string().required("Json schema is required."),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      values = { ...values, description: description || seo.description };
      API.patch(`/seo/${objectId}`, values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          getSeo();
          resetForm();
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
    setFieldValue,
  } = useFormik({
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
            <h1 className="page-title">Seo</h1>
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
                  Seo
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className="breadcrumb-item active breadcrumds"
                  aria-current="page"
                >
                  {seo.title}
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
          <Card.Header>
            <div className="media-heading">
              <h5>
                <strong>Edit Seo</strong>
              </h5>
            </div>
          </Card.Header>
          <Card.Body className="bg-white">
            {!loading ? (
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
                      <Dropdown
                        options={[]}
                        create={true}
                        placeholder="Meta Tags ...    "
                        searchable={true}
                        dropdownHandle={false}
                        multi={true}
                        values={values.meta_tags}
                        value={values.meta_tags}
                        onChange={(value) => setFieldValue("meta_tags", value)}
                        onBlur={handleBlur}
                      />
                      {errors.meta_tags && touched.meta_tags ? (
                        <span className="text-danger">{errors.meta_tags}</span>
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
                      <Dropdown
                        options={[]}
                        create={true}
                        placeholder="primary focus keyword ...    "
                        searchable={true}
                        dropdownHandle={false}
                        multi={true}
                        values={values.primary_focus_keyword}
                        value={values.primary_focus_keyword}
                        onChange={(value) =>
                          setFieldValue("primary_focus_keyword", value)
                        }
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
                        maxLength={200}
                      />
                      <small className="float-end">
                        {values?.json_schema?.length}/200
                      </small>
                      {errors.json_schema && touched.json_schema ? (
                        <span className="text-danger">
                          {errors.json_schema}
                        </span>
                      ) : (
                        <span />
                      )}
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
                          plugins:
                            process.env.REACT_APP_TINYEDITORPLUGINS?.split(" "),
                          toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                          content_style: process.env.REACT_APP_TINYEDITORSTYLE,
                        }}
                        initialValue={seo.description}
                      />
                    </div>
                  </Col>
                </Row>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            ) : (
              <Skeleton className="my-2" count={8} height={25} />
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

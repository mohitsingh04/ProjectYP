import React, { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Col, Card, Table, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import Swal from "sweetalert2";

export default function AddCourseAeo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { uniqueId } = useParams();
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [seo, setSeo] = useState([]);

  const getCourse = useCallback(() => {
    API.get(`/course/${uniqueId}`).then(({ data }) => {
      setCourse(data);
    });
  }, [uniqueId]);

  const getSeo = useCallback(() => {
    API.get(`/seo`).then(({ data }) => {
      // setSeo(data.filter(seo => seo.course_id == uniqueId));
      setSeo(data.filter((seo) => seo.course_id === uniqueId));
    });
  }, [uniqueId]);

  useEffect(() => {
    getCourse();
    getSeo();
  }, [getCourse, getSeo]);

  const initialValues = {
    title: "",
    meta_tags: "",
    slug: "",
    primary_focus_keyword: "",
    json_schema: "",
    description: "",
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
      values = {
        ...values,
        description: description,
        course_id: course.uniqueId,
        course_name: course.course_name,
      };
      dispatch(showLoading());
      API.post(`/seo`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          window.location.reload();
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
    });

  const handleDeleteSeo = (uniqueId) => {
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
          dispatch(showLoading());
          API.delete(`/seo/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
          navigate(`/dashboard/course`);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error(error.message);
      });
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course Seo</h1>
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
                Add
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
            {seo.length !== 0 ? (
              <>
                {/* Card 1 */}
                <Card>
                  <Card.Header>
                    <h3 className="card-title">Course Seo</h3>
                    <div className="ms-auto pageheader-btn">
                      {seo.length > 0 && (
                        <>
                          <Link
                            to={`/dashboard/course-seo/edit/${seo[0].uniqueId}`}
                            className="btn btn-primary btn-icon text-white me-3"
                          >
                            <span>
                              <i className="fe fe-edit"></i>&nbsp;
                            </span>
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteSeo(seo[0].uniqueId)}
                            className="btn btn-danger"
                          >
                            <span>
                              <i className="fe fe-trash"></i>&nbsp;
                            </span>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Table className="table row table-borderless">
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Title: </strong>
                            {seo[0]?.title}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Meta Tags: </strong>
                            {seo[0]?.meta_tags}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Json Schema: </strong>
                            {seo[0]?.json_schema}
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Slug: </strong>
                            {seo[0]?.slug}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Primary Focus Keyword: </strong>
                            {seo[0]?.primary_focus_keyword}
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="col-lg-12 col-xl-6 p-0">
                        <tr>
                          <td>
                            <strong>Description: </strong>
                            <br />
                            {seo[0]?.description && (
                              <span>
                                {seo[0]?.description.replace(/<[^>]+>/g, "")}
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </>
            ) : (
              <>
                {/* Card 2 */}
                <Card>
                  <Card.Header>
                    <h3 className="card-title">Add Course Seo</h3>
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
                              <span className="text-danger">
                                {errors.title}
                              </span>
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
                              apiKey="2208d39gvqf0t85mghgd0dkeiea75lcrl5ffsyn3y8ulwsy8"
                              onInit={(evt, editor) =>
                                (editorRef.current = editor)
                              }
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
                            />
                          </div>
                        </Col>
                      </Row>
                      <button type="submit" className="btn btn-primary">
                        Add
                      </button>
                    </form>
                  </Card.Body>
                </Card>
              </>
            )}
          </div>
        </Row>
      </div>
    </>
  );
}

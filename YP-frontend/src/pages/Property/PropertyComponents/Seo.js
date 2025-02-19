import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../../context/Api";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import Swal from "sweetalert2";

export default function Seo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [seo, setSeo] = useState([]);
  const [description, setDescription] = useState("");

  const getProperty = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  }, [dispatch, objectId]);
  const getSeo = useCallback(() => {
    dispatch(showLoading());
    API.get(`/seo`).then(({ data }) => {
      dispatch(hideLoading());
      setSeo(
        data.filter((seo) => seo.property_id === String(property?.uniqueId))
      );
    });
  }, [dispatch, property]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);
  useEffect(() => {
    getSeo();
  }, [getSeo]);

  console.log(seo);

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

  const onSubmit = async (values, { resetForm }) => {
    try {
      values = {
        ...values,
        description: description,
        property_id: property.uniqueId,
        property_name: property.property_name,
      };
      dispatch(showLoading());
      API.post(`/seo`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          resetForm();
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
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
      enableReinitialize: true,
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
          navigate(`/dashboard/property`);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error(error.message);
      });
  };

  const [isExpanded, setIsExpended] = useState(false);
  const toggleReadMore = () => {
    setIsExpended(!isExpanded);
  };

  return (
    <>
      <div className="tab-pane profiletab show">
        <div id="seo-log-switch">
          <Card>
            <Card.Header>
              <div className="media-heading">
                <h5>
                  <strong>Seo Information</strong>
                </h5>
              </div>
              <div className="ms-auto pageheader-btn">
                {seo.length > 0 && (
                  <>
                    <Link
                      to={`/dashboard/edit/seo/${seo[0].property_name}/${seo[0].uniqueId}`}
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
            <Card.Body className="bg-white">
              {seo.length !== 0 ? (
                <>
                  <Table className="table row table-borderless">
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Title: </strong>
                          {seo[0].title}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Meta Tags: </strong>
                          {seo[0].meta_tags}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Json Schema: </strong>
                          {seo[0].json_schema}
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="col-lg-12 col-xl-6 p-0">
                      <tr>
                        <td>
                          <strong>Slug: </strong>
                          {seo[0].slug}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Primary Focus Keyword: </strong>
                          {seo[0].primary_focus_keyword}
                        </td>
                      </tr>
                    </tbody>
                    <tbody className="col-lg-12 p-0">
                      <tr>
                        <td>
                          <strong>Description: </strong>
                          <br />
                          {seo[0]?.description && (
                            <span>
                              {property?.property_hostel_description?.length >=
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
                                    __html:
                                      property.property_hostel_description,
                                  }}
                                />
                              )}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
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
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

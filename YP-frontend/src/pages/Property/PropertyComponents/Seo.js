import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form, Card, Row, Col, Table } from "react-bootstrap";
import Dropdown from "react-dropdown-select";
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
    API.get(`/seo`).then(({ data }) => {
      setSeo(
        data.filter((seo) => seo.property_id === String(property?.uniqueId))
      );
    });
  }, [property]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);
  useEffect(() => {
    getSeo();
  }, [getSeo]);

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
    slug: Yup.string().required("Slug is required."),
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
      console.log(values);
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

  const handleDeleteSeo = (id) => {
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
          API.delete(`/seo/${id}`).then((response) => {
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
                      to={`/dashboard/edit/seo/${seo[0].property_name}/${seo[0]._id}`}
                      className="btn btn-primary btn-icon text-white me-3"
                    >
                      <span>
                        <i className="fe fe-edit"></i>&nbsp;
                      </span>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteSeo(seo[0]._id)}
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
                          {seo[0].meta_tags.map((item, index) => (
                            <span key={index}>{item.value}, </span>
                          ))}
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
                          {seo[0].primary_focus_keyword.map((item, index) => (
                            <span key={index}>{item.value}, </span>
                          ))}
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
                          <Form.Label htmlFor="seoTitle">Seo Title</Form.Label>
                          <input
                            type="text"
                            id="seoTitle"
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
                          <Form.Label htmlFor="metaTag">Meta Tags</Form.Label>
                          <Dropdown
                            options={[]}
                            values={[]}
                            id="metaTag"
                            create={true}
                            placeholder="Meta Tags...    "
                            searchable={true}
                            dropdownHandle={false}
                            multi={true}
                            value={values.meta_tags}
                            onChange={(value) =>
                              setFieldValue("meta_tags", value)
                            }
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
                          <Form.Label htmlFor="slug">Slug</Form.Label>
                          <input
                            type="text"
                            id="slug"
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
                          <Form.Label htmlFor="primayKey">
                            Primary Focus Keyword
                          </Form.Label>
                          <Dropdown
                            options={[]}
                            values={[]}
                            id="primaryKey"
                            className="form-control"
                            name="primary_focus_keyword"
                            placeholder="Primary Focus Keyword"
                            create={true}
                            searchable={true}
                            dropdownHandle={false}
                            multi={true}
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
                          <Form.Label htmlFor="jsonSchema">
                            Json Schema
                          </Form.Label>
                          <textarea
                            className="form-control"
                            id="jsonSchema"
                            name="json_schema"
                            placeholder="Json Schema"
                            value={values.json_schema}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows="3"
                            maxLength={200}
                          />
                          {errors.json_schema && touched.json_schema ? (
                            <span className="text-danger">
                              {errors.json_schema}
                            </span>
                          ) : (
                            <span />
                          )}
                          <small className="float-end">
                            {values?.json_schema?.length}/200
                          </small>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-3">
                          <Form.Label htmlFor="description">
                            Description
                          </Form.Label>
                          <Editor
                            id="description"
                            apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
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

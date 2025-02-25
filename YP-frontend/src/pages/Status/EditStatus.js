import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function EditStatus() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { objectId } = useParams();
  const [status, setStatus] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    API.get(`/status/${objectId}`).then(({ data }) => {
      setStatus(data);
      setLoading(false);
    });
  }, [objectId]);

  const initialValues = {
    status_name: status.name || "",
    status_color: status.color || "#6259ca",
  };

  const validationSchema = Yup.object({
    status_name: Yup.string()
      .min(3, "Status Name must be at least 3 characters long.")
      .required("Status name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Status Name can only contain alphabets and spaces."
      ),
  });

  const onSubmit = async (values) => {
    try {
      values = { ...values, description: description || status.description };
      API.patch(`/status/${objectId}`, values).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/status");
        } else if (response.data.error) {
          setError(response.data.error);
        }
      });
    } catch (err) {
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

  if (authPermissions?.length <= 0) {
    const hasPermission = authPermissions?.some(
      (item) => item.value === "Read Course"
    );

    if (!hasPermission) {
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <h2 className="text-danger fw-bold">Access Denied</h2>
          <p>You do not have the required permissions to access this page.</p>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Status</h1>
          {loading ? (
            <Skeleton width={200} />
          ) : (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: "/dashboard/status/" }}
              >
                Status
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active"
                aria-current="page"
              >
                Edit
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                {status.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to="/dashboard/status/"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-arrow-left"></i>&nbsp;
            </span>
            Back
          </Link>
        </div>
      </div>

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              {loading ? (
                <Skeleton width={200} height={25} />
              ) : (
                <h3 className="card-title">Edit Status</h3>
              )}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Skeleton height={25} count={8} className="my-2" />
              ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <>
                    {error ? (
                      <div className="alert alert-danger">
                        <small>{error}</small>
                      </div>
                    ) : (
                      <span />
                    )}
                  </>
                  <div className="form-row">
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="status_name">Name</Form.Label>
                        <input
                          type="text"
                          id="status_name"
                          name="status_name"
                          className="form-control"
                          placeholder="Name"
                          value={values.status_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.status_name && touched.status_name ? (
                          <span className="text-danger">
                            {errors.status_name}
                          </span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-1 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="status_color">Color</Form.Label>
                        <input
                          type="color"
                          name="status_color"
                          id="status_color"
                          className="form-control"
                          value={values.status_color}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.status_color && touched.status_color ? (
                          <span className="text-danger">
                            {errors.status_color}
                          </span>
                        ) : (
                          <span />
                        )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="description">
                          Description
                        </Form.Label>
                        <Editor
                          id="description"
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
                              "removeformat",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          initialValue={status.description}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="form-footer mt-2">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              )}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

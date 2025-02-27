import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";

export default function CreateStatus() {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [status, setStatus] = useState([]);

  const getStatus = async () => {
    const response = await API.get("/status");
    const uniqueStatus = Object.values(
      response.data.reduce((acc, item) => {
        acc[item.parent_status] = item;
        return acc;
      }, {})
    );
    setStatus(uniqueStatus);
  };
  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const initialValues = {
    parent_status: "",
    status_name: "",
  };

  const validationSchema = Yup.object({
    parent_status: Yup.string()
      .min(3, "Status Name must be at least 3 characters long.")
      .required("Status name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Status Name can only contain alphabets and spaces."
      ),

    status_name: Yup.string().required("Status color is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = { ...values, description: description };
      API.post("/status", values).then((response) => {
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
    });

  if (authPermissions?.length >= 0) {
    const hasPermission = authPermissions?.some(
      (item) => item.value === "Create Status"
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
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
              Add
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Status
            </Breadcrumb.Item>
          </Breadcrumb>
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
              <h3 className="card-title">Add Status</h3>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {error ? (
                  <div className="alert alert-danger">
                    <small>{error}</small>
                  </div>
                ) : (
                  <span />
                )}
                <div className="form-row">
                  <div className="form-group col-md-2 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="status_name">Status Name</Form.Label>
                      <select
                        className="form-select"
                        id="status_name"
                        name="status_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.status_name}
                      >
                        <option value="" disabled>
                          --Select Category--
                        </option>
                        <option value={`uncategorized`}>Uncategorized</option>
                        {status.map((item, index) => (
                          <option key={index} value={item.parent_status}>
                            {item.parent_status}
                          </option>
                        ))}
                      </select>
                      {errors.status_name && touched.status_name ? (
                        <span className="text-danger">
                          {errors.status_name}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="parent_status">
                        Parent Status
                      </Form.Label>
                      <input
                        type="text"
                        name="parent_status"
                        id="parent_status"
                        className="form-control"
                        placeholder="Status Name"
                        value={values.parent_status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.parent_status && touched.parent_status ? (
                        <span className="text-danger">
                          {errors.parent_status}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>

                  <div className="form-group col-md-12 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="description">Description</Form.Label>
                      <Editor
                        apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onChange={(e) =>
                          setDescription(editorRef.current.getContent())
                        }
                        id="description"
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
                      />
                      {/* {errors.description && touched.description ? <span className='text-danger'>{errors.description}</span> : <span />} */}
                    </Form.Group>
                  </div>
                </div>
                <div className="form-footer mt-2">
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

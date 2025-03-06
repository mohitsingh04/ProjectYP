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

  const formik = useFormik({
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
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
            <Breadcrumb.Item>Status</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/dashboard/status/" className="btn btn-primary">
            <span>
              <i className="fe fe-arrow-left me-1"></i>
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
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status_name}
                      >
                        <option value="" disabled>
                          --Select Category--
                        </option>
                        <option value={`uncategorized`}>Uncategorized</option>
                        {status
                          .filter(
                            (item) =>
                              !["Active", "Pending", "Suspended"].includes(
                                item.parent_status
                              )
                          )
                          .map((item, index) => (
                            <option key={index} value={item.parent_status}>
                              {item.parent_status}
                            </option>
                          ))}
                      </select>
                      {formik.errors.status_name &&
                      formik.touched.status_name ? (
                        <span className="text-danger">
                          {formik.errors.status_name}
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
                        value={formik.values.parent_status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.parent_status &&
                      formik.touched.parent_status ? (
                        <span className="text-danger">
                          {formik.errors.parent_status}
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
                        onBlur={formik.handleBlur}
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

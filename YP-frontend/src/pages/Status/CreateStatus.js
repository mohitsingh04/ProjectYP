import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import DataRequest from "../../context/DataRequest";

export default function CreateStatus() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const initialValues = {
    status_name: "",
    status_color: "#6259ca",
  };

  const validationSchema = Yup.object({
    status_name: Yup.string()
      .min(3, "Status Name must be at least 3 characters long.")
      .required("Status name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Status Name can only contain alphabets and spaces."
      ),

    status_color: Yup.string().required("Status color is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = { ...values, description: description };
      dispatch(showLoading());
      API.post("/status", values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/status");
        } else if (response.data.error) {
          setError(response.data.error);
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
    });

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Create Status"
  );

  if (!hasPermission) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        USER DOES NOT HAVE THE RIGHT ROLES.
      </div>
    );
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
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Status Name</Form.Label>
                      <input
                        type="text"
                        name="status_name"
                        className="form-control"
                        placeholder="Status Name"
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
                  <div className="form-group col-md-2 mb-3">
                    <Form.Group>
                      <Form.Label>Color</Form.Label>
                      <input
                        type="color"
                        name="status_color"
                        className="form-control"
                        placeholder="Color"
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
                      <Form.Label>Description</Form.Label>
                      <Editor
                        apiKey="2208d39gvqf0t85mghgd0dkeiea75lcrl5ffsyn3y8ulwsy8"
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

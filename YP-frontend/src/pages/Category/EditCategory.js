import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import DataRequest from "../../context/DataRequest.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice.js";

export default function EditCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { uniqueId } = useParams();
  const [error, setError] = useState("");
  const [status, setStatus] = useState([]);
  const [description, setDescription] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryIcon, setCategoryIcon] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const { User } = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(User?.permissions);
  }, [User]);

  useEffect(() => {
    const getCategory = () => {
      dispatch(showLoading());
      API.get(`/category/${uniqueId}`).then(({ data }) => {
        dispatch(hideLoading());
        setCategory(data);
        setCategoryIcon(data?.category_icon[0]);
        setFeatureImage(data?.featured_image[0]);
      });
    };
    const getCategories = () => {
      dispatch(showLoading());
      API.get("/category").then(({ data }) => {
        dispatch(hideLoading());
        setCategories(data);
      });
    };
    const getStatus = () => {
      dispatch(showLoading());
      API.get(`/status/`).then(({ data }) => {
        dispatch(hideLoading());
        setStatus(data);
      });
    };
    getCategory();
    getCategories();
    getStatus();
  }, [dispatch, uniqueId]);

  const initialValues = {
    category_name: category.category_name || "",
    parent_category: category.parent_category || "",
    category_icon: category.category_icon || "",
    featured_image: category.featured_image || "",
    status: category.status || "",
  };

  const validationSchema = Yup.object({
    category_name: Yup.string().required("Category name is required."),
    parent_category: Yup.string().required("Parent category is required."),
    status: Yup.string().required("Status is required."),
  });

  const onSubmit = async (values) => {
    try {
      values = {
        ...values,
        category_description: description || category.description,
        userId: User.uniqueId,
      };
      if (
        typeof values.category_icon == "object" ||
        typeof values.featured_image == "object" ||
        (typeof values.category_icon !== "object" &&
          values.featured_image !== "object")
      ) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(showLoading());
        API.patch(`/category/${uniqueId}`, formData).then((response) => {
          dispatch(hideLoading());
          if (response.data.message) {
            toast.success(response.data.message);
            navigate("/dashboard/category");
          } else if (response.data.error) {
            setError(response.data.error);
          }
        });
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const hasPermission = authPermissions?.some(
    (item) => item.value === "Update Category"
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
          <h1 className="page-title">Category</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              <Link to="/dashboard/">Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
              <Link to="/dashboard/category/">Category</Link>
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
              {category.uniqueId}
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

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              <h3 className="card-title">Edit Category</h3>
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
                      <Form.Label>Category Name</Form.Label>
                      <input
                        type="text"
                        name="category_name"
                        className="form-control"
                        placeholder="Category Name"
                        value={values.category_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.category_name && touched.category_name ? (
                        <span className="text-danger">
                          {errors.category_name}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Parent Category</Form.Label>
                      <select
                        name="parent_category"
                        className="farms form-control"
                        value={values.parent_category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select--</option>
                        {categories.map((item, key) => (
                          <option value={item.uniqueId}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                      {errors.parent_category && touched.parent_category ? (
                        <span className="text-danger">
                          {errors.parent_category}
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
                        onChange={() =>
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
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        initialValue={category.description}
                      />
                      {/* {errors.category_description && touched.category_description ? <span className='text-danger'>{errors.category_description}</span> : <span />} */}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Icon</Form.Label>
                      <input
                        type="file"
                        name="category_icon"
                        className="form-control"
                        onChange={(e) => {
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setFieldValue("category_icon", e.target.files[0]);
                              setPreviewIcon(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      {!previewIcon ? (
                        <img
                          src={`http://localhost:5000/${categoryIcon}`}
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      ) : (
                        <img
                          src={previewIcon}
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      )}
                      {/* {errors.category_icon && touched.category_icon ? <span className='text-danger'>{errors.category_icon}</span> : <span />} */}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Featured Image</Form.Label>
                      <input
                        type="file"
                        name="featured_image"
                        className="form-control"
                        onChange={(e) => {
                          let reader = new FileReader();
                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setFieldValue(
                                "featured_image",
                                e.target.files[0]
                              );
                              setPreviewFeaturedImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }}
                        onBlur={handleBlur}
                      />
                      {!previewFeaturedImage ? (
                        <img
                          src={`http://localhost:5000/${featureImage}`}
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      ) : (
                        <img
                          src={previewFeaturedImage}
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      )}
                      {/* {errors.featured_image && touched.featured_image ? <span className='text-danger'>{errors.featured_image}</span> : <span />} */}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <select
                        name="status"
                        className="form-control"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select--</option>
                        {status.map((item, key) => (
                          <option key={key} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.status && touched.status ? (
                        <small className="text-danger">{errors.status}</small>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                </div>
                <div className="form-footer mt-2">
                  <button type="submit" className="btn btn-primary">
                    Update
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

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
import DataRequest from "../../context/DataRequest.js";
import { toast } from "react-toastify";
import defaultIcon from "../../Images/defaultcategory-compressed.webp";
import defaultFeature from "../../Images/defaultcategoryfeature-compressed.webp";
import Skeleton from "react-loading-skeleton";

export default function EditCategory() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { objectId } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(User?.permissions);
  }, [User]);

  const getCategory = useCallback(() => {
    API.get(`/category/${objectId}`).then(({ data }) => {
      setCategory(data);
      setCategoryIcon(data?.category_icon[0]);
      setFeatureImage(data?.featured_image[0]);
      setLoading(false);
    });
  }, [objectId]);
  const getCategories = useCallback(() => {
    API.get("/category").then(({ data }) => {
      setCategories(data);
    });
  }, []);
  const getStatus = useCallback(() => {
    API.get(`/status/`).then(({ data }) => {
      setStatus(data);
    });
  }, []);

  useEffect(() => {
    getCategory();
    getCategories();
    getStatus();
  }, [getCategories, getCategory, getStatus]);

  const initialValues = {
    category_name: category?.category_name || "",
    parent_category: category?.parent_category || "",
    category_icon: category?.category_icon || "",
    featured_image: category?.featured_image || "",
    status: category?.status || "",
  };

  const validationSchema = Yup.object({
    category_name: Yup.string()
      .min(3, "Category Name must be at least 3 characters long.")
      .required("Category Name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Category Name can only contain alphabets and spaces."
      ),

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
        API.patch(`/category/${objectId}`, formData).then((response) => {
          if (response.data.message) {
            toast.success(response.data.message);
            navigate("/dashboard/category");
          } else if (response.data.error) {
            setError(response.data.error);
          }
        });
      }
    } catch (err) {
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
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p>You do not have the required permissions to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Category</h1>
          {!loading ? (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/dashboard/` }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: `/dashboard/category/` }}
              >
                Category
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
                {category.category_name}
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

      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              <h3 className="card-title">Edit Category</h3>
            </Card.Header>
            <Card.Body>
              {!loading ? (
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
                        <Form.Label htmlFor="category_name">
                          Category Name
                        </Form.Label>
                        <input
                          type="text"
                          name="category_name"
                          id="category_name"
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
                        <Form.Label htmlFor="parent_category">
                          Parent Category
                        </Form.Label>
                        <select
                          name="parent_category"
                          id="parent_category"
                          className="farms form-control"
                          value={values.parent_category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">--Select--</option>
                          {categories.map((item, key) => (
                            <option key={key} value={item.category_name}>
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
                        <Form.Label htmlFor="description">
                          Description
                        </Form.Label>
                        <Editor
                          id="description"
                          apiKey={process.env.REACT_APP_TINYEDITORAPIKEY}
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
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label className="category_icon">Icon</Form.Label>
                        <input
                          type="file"
                          accept="image/jpeg, image/png"
                          name="category_icon"
                          id="category_icon"
                          className="form-control"
                          onChange={(e) => {
                            let reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setFieldValue(
                                  "category_icon",
                                  e.target.files[0]
                                );
                                setPreviewIcon(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                          onBlur={handleBlur}
                        />
                        <img
                          src={
                            previewIcon
                              ? previewIcon
                              : categories
                              ? `http://localhost:5000/${categoryIcon}`
                              : defaultIcon
                          }
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="featured_image">
                          Featured Image
                        </Form.Label>
                        <input
                          type="file"
                          name="featured_image"
                          id="featured_image"
                          accept="image/jpeg, image/png"
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
                        <img
                          src={
                            previewFeaturedImage
                              ? previewFeaturedImage
                              : featureImage
                              ? `http://localhost:5000/${featureImage}`
                              : defaultFeature
                          }
                          className="mt-1"
                          width="100"
                          alt=""
                        />
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="status">Status</Form.Label>
                        <select
                          name="status"
                          id="status"
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
              ) : (
                <Skeleton count={8} height={25} className="my-2" />
              )}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

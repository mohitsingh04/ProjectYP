import React, { useState, useRef, useEffect, useCallback } from "react";
import DataRequest from "../../context/DataRequest.js";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { API } from "../../context/Api";
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
  const { User } = DataRequest();
  const [description, setDescription] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryIcon, setCategoryIcon] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(`/user/${User?._id}`);
      setAuthUser(response.data);
      setAuthLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [User]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setAuthPermissions(authUser?.permissions);
  }, [authUser]);

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
      const mainStatus = data.filter((item) => item.name === "Category");
      if (mainStatus) {
        setStatus(mainStatus);
      }
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
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
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Category</h1>
          {!loading ? (
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/dashboard/` }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: `/dashboard/category/` }}
              >
                Category
              </Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
              <Breadcrumb.Item>{category.category_name}</Breadcrumb.Item>
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
                          value={formik.values.category_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.category_name &&
                        formik.touched.category_name ? (
                          <span className="text-danger">
                            {formik.errors.category_name}
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
                          value={formik.values.parent_category}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">--Select--</option>
                          {categories.map((item, key) => (
                            <option key={key} value={item.category_name}>
                              {item.category_name}
                            </option>
                          ))}
                        </select>
                        {formik.errors.parent_category &&
                        formik.touched.parent_category ? (
                          <span className="text-danger">
                            {formik.errors.parent_category}
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
                          onBlur={formik.handleBlur}
                          init={{
                            height: 200,
                            menubar: false,
                            plugins:
                              process.env.REACT_APP_TINYEDITORPLUGINS?.split(
                                " "
                              ),
                            toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                            content_style:
                              process.env.REACT_APP_TINYEDITORSTYLE,
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
                                formik.setFieldValue(
                                  "category_icon",
                                  e.target.files[0]
                                );
                                setPreviewIcon(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <div className="col-md-3 p-0 pt-1">
                          <img
                            src={
                              previewIcon
                                ? previewIcon
                                : categoryIcon
                                ? `${process.env.REACT_APP_BACKEND_URL}/${categoryIcon}`
                                : defaultIcon
                            }
                            alt=""
                          />
                        </div>
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
                                formik.setFieldValue(
                                  "featured_image",
                                  e.target.files[0]
                                );
                                setPreviewFeaturedImage(reader.result);
                              }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <div className="col-md-3 p-0 pt-1">
                          <img
                            src={
                              previewFeaturedImage
                                ? previewFeaturedImage
                                : featureImage
                                ? `${process.env.REACT_APP_BACKEND_URL}/${featureImage}`
                                : defaultFeature
                            }
                            alt=""
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="status">Status</Form.Label>
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">--Select--</option>
                          {status.map((item, key) => (
                            <option key={key} value={item.parent_status}>
                              {item.parent_status}
                            </option>
                          ))}
                        </select>
                        {formik.errors.status && formik.touched.status ? (
                          <small className="text-danger">
                            {formik.errors.status}
                          </small>
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

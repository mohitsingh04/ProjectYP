import React, { useState, useRef, useEffect, useCallback } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { API } from "../../context/Api";
import DataRequest from "../../context/DataRequest";

export default function CreateCategory() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [user, setUser] = useState("");
  const mainUser = DataRequest();
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getUser = useCallback(async () => {
    API.get("/profile").then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const getCategory = useCallback(async () => {
    await API.get("/category").then(({ data }) => {
      setCategory(data);
    });
  }, []);

  useEffect(() => {
    getUser();
    getCategory();
  }, [getCategory, getUser]);

  const initialValues = {
    category_name: "",
    parent_category: "",
    category_icon: "",
    featured_image: "",
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
    category_icon: Yup.string(),
    featured_image: Yup.string(),
  });

  const onSubmit = async (values) => {
    try {
      let formData = new FormData();
      formData.append("category_name", values.category_name);
      formData.append("parent_category", values.parent_category);
      formData.append("category_description", description);
      formData.append("userId", user.uniqueId);
      if (values.category_icon) {
        formData.append("category_icon", values.category_icon);
      }
      if (values.featured_image) {
        formData.append("featured_image", values.featured_image);
      }

      await API.post(`/category`, formData).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/category");
        } else if (response.data.error) {
          toast.error(response.data.error);
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
      (item) => item.value === "Create Category"
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
          <h1 className="page-title">Category</h1>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/dashboard/category/" }}
            >
              Category
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
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
              <h3 className="card-title">Add Category</h3>
            </Card.Header>
            <Card.Body>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
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
                      {category.length > 0 ? (
                        <>
                          <select
                            id="parent_category"
                            name="parent_category"
                            className="farms form-control"
                            value={formik.values.parent_category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">--Select--</option>
                            {category.map((item, key) => (
                              <option key={key} value={item.category_name}>
                                {item.category_name}
                              </option>
                            ))}
                          </select>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            name="parent_category"
                            className="farms form-control"
                            value={formik.values.parent_category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </>
                      )}
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
                      <Form.Label htmlFor="decription">Description</Form.Label>
                      <Editor
                        id="decription"
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
                            process.env.REACT_APP_TINYEDITORPLUGINS?.split(" "),
                          toolbar: process.env.REACT_APP_TINYEDITORTOOLBAR,
                          content_style: process.env.REACT_APP_TINYEDITORSTYLE,
                        }}
                      />
                      {formik.errors.category_description &&
                      formik.touched.category_description ? (
                        <span className="text-danger">
                          {formik.errors.category_description}
                        </span>
                      ) : (
                        <span />
                      )}
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label htmlFor="icon">Icon</Form.Label>
                      <input
                        type="file"
                        id="icon"
                        name="category_icon"
                        accept="image/jpeg, image/png"
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
                        <img src={previewIcon} alt="" />
                      </div>
                      {formik.errors.category_icon &&
                      formik.touched.category_icon ? (
                        <span className="text-danger">
                          {formik.errors.category_icon}
                        </span>
                      ) : (
                        <span />
                      )}
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
                        <img src={previewFeaturedImage} alt="" />
                      </div>
                      {formik.errors.featured_image &&
                      formik.touched.featured_image ? (
                        <span className="text-danger">
                          {formik.errors.featured_image}
                        </span>
                      ) : (
                        <span />
                      )}
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

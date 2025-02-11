import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

export default function PropertyImages() {
  const dispatch = useDispatch();
  const { uniqueId } = useParams();
  const [property, setProperty] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [iconImage, setIconImage] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  useEffect(() => {
    const getProperty = () => {
      dispatch(showLoading());
      API.get(`/property/${uniqueId}`).then(({ data }) => {
        dispatch(hideLoading());
        setProperty(data);
      });
    };
    getProperty();
  }, []);

  useEffect(() => {
    if (property) {
      setIconImage(property.property_icon[0]);
      setFeatureImage(property.featured_image[0]);
    }
  });

  {
    /*Files Information */
  }
  const [showIconInInput, setShowIconInInput] = useState(false);
  const [showFimageInInput, setShowFimageInInput] = useState(false);

  {
    /*Files Information */
  }
  const handleEditIcon = () => {
    setShowIconInInput(true);
  };
  const handleUpdateIcon = () => {
    setShowIconInInput(false);
  };
  const handleCancelEditIcon = () => {
    setShowIconInInput(false);
  };
  const handleEditFimage = () => {
    setShowFimageInInput(true);
  };
  const handleUpdateFimage = () => {
    setShowFimageInInput(false);
  };
  const handleCancelEditFimage = () => {
    setShowFimageInInput(false);
  };

  const initialValues = {
    property_name: property.property_name || "",
    property_icon: property.property_icon || "",
    featured_image: property.featured_image || "",
  };

  const onSubmit = async (values) => {
    try {
      if (
        typeof values.property_icon == "object" ||
        typeof values.featured_image == "object" ||
        (typeof values.property_icon != "object" &&
          values.featured_image != "object")
      ) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(showLoading());
        API.patch(`/property/images/${uniqueId}`, formData).then((response) => {
          dispatch(hideLoading());
          if (response.data.message) {
            toast.success(response.data.message);
          } else if (response.data.error) {
            toast.error(response.data.error);
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
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <Card>
        <Card.Header>
          <h5>
            <strong>Images</strong>
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <strong>Icon</strong>
              {!property.property_icon ? (
                <>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      name="property_icon"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("property_icon", e.target.files[0]);
                            setPreviewIcon(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewIcon == "" ? (
                      <img
                        src={`http://localhost:5000/${iconImage}`}
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    ) : (
                      <img
                        src={previewIcon}
                        width={100}
                        height={100}
                        className="rounded-circle mt-1"
                        alt="icon"
                      />
                    )}
                    <br />
                    <span onClick={handleCancelEditIcon} className="mx-3 py-2">
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </>
              ) : showIconInInput ? (
                <>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      name="property_icon"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("property_icon", e.target.files[0]);
                            setPreviewIcon(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewIcon == "" ? (
                      <img
                        src={`http://localhost:5000/${iconImage}`}
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    ) : (
                      <img
                        src={previewIcon}
                        width={100}
                        height={100}
                        className="rounded-circle mt-1"
                        alt="icon"
                      />
                    )}
                    <br />
                    <span onClick={handleCancelEditIcon} className="mx-3 py-2">
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <>
                    <br />
                    <img
                      src={`http://localhost:5000/${iconImage}`}
                      width={100}
                      height={100}
                      className="rounded-circle"
                      alt=""
                    />
                    <br />
                    <span onClick={() => handleEditIcon()} className="mx-2">
                      <i className="fe fe-edit"></i>
                    </span>
                  </>
                </>
              )}
            </Col>
            <Col md={6} className="mb-3">
              <strong>Featured Image</strong>
              {!property.featured_image ? (
                <>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      name="featured_image"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("featured_image", e.target.files[0]);
                            setPreviewFeaturedImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewFeaturedImage == "" ? (
                      <img
                        src={`http://localhost:5000/${featureImage}`}
                        width={350}
                        className="mt-1"
                        alt=""
                      />
                    ) : (
                      <img
                        src={previewFeaturedImage}
                        width={350}
                        className="mt-1"
                        alt="icon"
                      />
                    )}
                    <br />
                    <span
                      onClick={handleCancelEditFimage}
                      className="mx-3 py-2"
                    >
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </>
              ) : showFimageInInput ? (
                <>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      name="featured_image"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("featured_image", e.target.files[0]);
                            setPreviewFeaturedImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewFeaturedImage == "" ? (
                      <img
                        src={`http://localhost:5000/${featureImage}`}
                        width={350}
                        className="mt-1"
                        alt=""
                      />
                    ) : (
                      <img
                        src={previewFeaturedImage}
                        className="mt-1"
                        width={350}
                        alt=""
                      />
                    )}
                    <br />
                    <span
                      onClick={handleCancelEditFimage}
                      className="mx-3 py-2"
                    >
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <>
                    <br />
                    <img
                      src={`http://localhost:5000/${featureImage}`}
                      width={350}
                      alt=""
                    />
                    <br />
                    <span onClick={() => handleEditFimage()} className="mx-2">
                      <i className="fe fe-edit"></i>
                    </span>
                  </>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

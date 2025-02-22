import React, { useEffect, useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import defaultLogo from "../../../Images/defaultPropertyLogo.jpeg";
import defaultFeature from "../../../Images/defaultPropertyFeature.jpg";

export default function PropertyImages() {
  const dispatch = useDispatch();
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [LogoImage, setLogoImage] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  const getProperty = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property/${objectId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  }, [dispatch, objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    if (property) {
      setLogoImage(property?.property_logo?.[0]);
      setFeatureImage(property?.featured_image?.[0]);
    }
  }, [property]);

  const [showLogoInInput, setShowLogoInInput] = useState(false);
  const [showFimageInInput, setShowFimageInInput] = useState(false);

  const handleEditLogo = () => {
    setShowLogoInInput(true);
  };
  // const handleUpdateLogo = () => {
  //   setShowLogoInInput(false);
  // };
  const handleCancelEditLogo = () => {
    setShowLogoInInput(false);
  };
  const handleEditFimage = () => {
    setShowFimageInInput(true);
  };
  // const handleUpdateFimage = () => {
  //   setShowFimageInInput(false);
  // };
  const handleCancelEditFimage = () => {
    setShowFimageInInput(false);
  };

  const initialValues = {
    property_name: property.property_name || "",
    property_logo: property.property_logo || "",
    featured_image: property.featured_image || "",
  };

  const onSubmit = async (values) => {
    try {
      if (
        typeof values.property_logo == "object" ||
        typeof values.featured_image == "object" ||
        (typeof values.property_logo !== "object" &&
          values.featured_image !== "object")
      ) {
        let formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        dispatch(showLoading());
        API.patch(`/property/images/${objectId}`, formData).then((response) => {
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

  const { setFieldValue, handleBlur, handleSubmit } = useFormik({
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
              {!property.property_logo ? (
                <>
                  <strong>Logo</strong>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      name="property_logo"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("property_logo", e.target.files[0]);
                            setPreviewLogo(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewLogo === "" ? (
                      <img
                        src={`http://localhost:5000/${LogoImage}`}
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    ) : (
                      <img
                        src={previewLogo}
                        width={100}
                        height={100}
                        className="rounded-circle mt-1"
                        alt="Logo"
                      />
                    )}
                    <br />
                    <span
                      onClick={handleCancelEditLogo}
                      className="btn btn-danger mt-1"
                    >
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn btn-success mt-1 ms-1">
                      <i className="fe fe-check"></i>
                    </button>
                  </form>
                </>
              ) : showLogoInInput ? (
                <>
                  <strong>Logo</strong>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      accept="image/jpeg, image/png"
                      type="file"
                      name="property_logo"
                      className="form-control"
                      onChange={(e) => {
                        let reader = new FileReader();
                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue("property_logo", e.target.files[0]);
                            setPreviewLogo(reader.result);
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {previewLogo === "" ? (
                      LogoImage === null ? (
                        <img
                          src={defaultLogo}
                          width={100}
                          height={100}
                          className="rounded-circle"
                          alt=""
                        />
                      ) : (
                        <img
                          src={`http://localhost:5000/${LogoImage}`}
                          width={100}
                          height={100}
                          className="rounded-circle"
                          alt=""
                        />
                      )
                    ) : (
                      <img
                        src={previewLogo}
                        width={100}
                        height={100}
                        className="rounded-circle mt-1"
                        alt="Logo"
                      />
                    )}
                    <br />
                    <span
                      onClick={handleCancelEditLogo}
                      className="btn btn-danger mt-1"
                    >
                      <i className="fe fe-x"></i>
                    </span>
                    <button type="submit" className="btn btn-success ms-1 mt-1">
                      <i className="fe fe-check"></i>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div>
                    <div className="d-flex justify-content-between">
                      <strong>Logo</strong>
                      <span
                        onClick={() => handleEditLogo()}
                        className="btn btn-primary"
                      >
                        <i className="fe fe-edit"></i>
                      </span>
                    </div>
                    {LogoImage === null ? (
                      <img
                        src={defaultLogo}
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    ) : (
                      <img
                        src={`http://localhost:5000/${LogoImage}`}
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    )}
                  </div>
                </>
              )}
            </Col>
            <Col md={6} className="mb-3">
              {!property.featured_image === null ? (
                <>
                  <strong>Featured Image</strong>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
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
                    {previewFeaturedImage === "" ? (
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
                        alt="Logo"
                      />
                    )}
                    <br />
                    <button
                      onClick={handleCancelEditFimage}
                      className="btn btn-danger mt-1"
                    >
                      <i className="fe fe-x"></i>
                    </button>
                    <button type="submit" className="btn btn-success ms-1 mt-1">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </>
              ) : showFimageInInput ? (
                <>
                  <strong>Featured Image</strong>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                      type="file"
                      name="featured_image"
                      className="form-control"
                      accept="image/jpeg, image/png"
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
                    {previewFeaturedImage === "" ? (
                      featureImage === null ? (
                        <img
                          src={defaultFeature}
                          width={350}
                          className="mt-1"
                          alt=""
                        />
                      ) : (
                        <img
                          src={`http://localhost:5000/${featureImage}`}
                          width={350}
                          className="mt-1"
                          alt=""
                        />
                      )
                    ) : (
                      <img
                        src={previewFeaturedImage}
                        className="mt-1"
                        width={350}
                        alt=""
                      />
                    )}
                    <br />
                    <button
                      onClick={handleCancelEditFimage}
                      className="btn btn-danger me-1 mt-1"
                    >
                      <i className="fe fe-x"></i>
                    </button>
                    <button type="submit" className="btn btn-success mt-1">
                      <i className="fe fe-check"></i>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <>
                    <div>
                      <div className="d-flex justify-content-between">
                        <strong>Featured Image</strong>
                        <button
                          onClick={() => handleEditFimage()}
                          className="btn btn-primary"
                        >
                          <i className="fe fe-edit"></i>
                        </button>
                      </div>
                      {featureImage === null ? (
                        <img src={defaultFeature} width={350} alt="" />
                      ) : (
                        <img
                          src={`http://localhost:5000/${featureImage}`}
                          width={350}
                          alt=""
                        />
                      )}
                    </div>
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

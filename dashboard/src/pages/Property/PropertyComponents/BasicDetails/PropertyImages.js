import React, { useEffect, useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import defaultLogo from "../../../../Images/defaultPropertyLogo.jpeg";
import defaultFeature from "../../../../Images/defaultPropertyFeature.jpg";
import Skeleton from "react-loading-skeleton";

export default function PropertyImages({ loading }) {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState("");
  const [LogoImage, setLogoImage] = useState("");
  const [featureImage, setFeatureImage] = useState("");

  const getProperty = useCallback(() => {
    API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
    });
  }, [objectId]);

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
  const handleCancelEditLogo = () => {
    setShowLogoInInput(false);
  };
  const handleEditFimage = () => {
    setShowFimageInInput(true);
  };
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
        API.patch(`/property/images/${objectId}`, formData).then((response) => {
          if (response.data.message) {
            toast.success(response.data.message);
          } else if (response.data.error) {
            toast.error(response.data.error);
          }
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { setFieldValue, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
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
          {!loading ? (
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
                      <img
                        src={
                          !previewLogo
                            ? `${process.env.REACT_APP_BACKEND_URL}/${LogoImage}`
                            : previewLogo
                        }
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                      <br />
                      <span onClick={handleCancelEditLogo} className="mt-1">
                        <i className="fe fe-x"></i>
                      </span>
                      <button type="submit" className="mt-1 ms-1">
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
                      <img
                        src={
                          previewLogo
                            ? previewLogo
                            : LogoImage
                            ? `${process.env.REACT_APP_BACKEND_URL}/${LogoImage}`
                            : defaultLogo
                        }
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                      <br />
                      <span onClick={handleCancelEditLogo} className="mt-1">
                        <i className="fe fe-x"></i>
                      </span>
                      <button type="submit" className="ms-1 mt-1">
                        <i className="fe fe-check"></i>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="d-flex gap-2">
                        <strong>Logo</strong>
                        <span onClick={() => handleEditLogo()}>
                          <i className="fe fe-edit"></i>
                        </span>
                      </div>
                      <img
                        src={
                          LogoImage
                            ? `${process.env.REACT_APP_BACKEND_URL}/${LogoImage}`
                            : defaultLogo
                        }
                        width={100}
                        height={100}
                        className="rounded-circle"
                        alt=""
                      />
                    </div>
                  </>
                )}
              </Col>
              <Col md={6} className="mb-3">
                {!property.featured_image ? (
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
                            : `${process.env.REACT_APP_BACKEND_URL}/${featureImage}`
                        }
                        width={350}
                        className="mt-1"
                        alt=""
                      />
                      <br />
                      <button onClick={handleCancelEditFimage} className="mt-1">
                        <i className="fe fe-x"></i>
                      </button>
                      <button type="submit" className="ms-1 mt-1">
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
                            ? `${process.env.REACT_APP_BACKEND_URL}/${featureImage}`
                            : defaultFeature
                        }
                        width={350}
                        className="mt-1"
                        alt=""
                      />
                      <br />
                      <button
                        onClick={handleCancelEditFimage}
                        className="me-1 mt-1"
                      >
                        <i className="fe fe-x"></i>
                      </button>
                      <button type="submit" className="mt-1">
                        <i className="fe fe-check"></i>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <>
                      <div>
                        <div className="d-flex gap-2">
                          <strong>Featured Image</strong>
                          <button onClick={() => handleEditFimage()}>
                            <i className="fe fe-edit"></i>
                          </button>
                        </div>
                        <img
                          src={
                            featureImage
                              ? `${process.env.REACT_APP_BACKEND_URL}/${featureImage}`
                              : defaultFeature
                          }
                          width={350}
                          alt=""
                        />
                      </div>
                    </>
                  </>
                )}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Skeleton circle={true} width={200} height={200} />
              </Col>
              <Col>
                <Skeleton height={200} />
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

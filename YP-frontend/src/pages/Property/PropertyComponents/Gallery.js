import React, { useCallback, useEffect, useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import { DropImg } from "./DropImg";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/alertSlice";
import Swal from "sweetalert2";

export default function Gallery() {
  const dispatch = useDispatch();
  const { uniqueId } = useParams();
  const [files, setFiles] = useState([]);
  const [property, setProperty] = useState("");

  const getProperty = useCallback(() => {
    dispatch(showLoading());
    API.get(`/property/${uniqueId}`).then(({ data }) => {
      setProperty(data);
      dispatch(hideLoading());
    });
  }, [uniqueId, dispatch]);

  const getImages = useCallback(() => {
    dispatch(showLoading());
    API.get("/gallery").then(({ data }) => {
      setFiles(data.filter((files) => files.property_id === uniqueId));
      dispatch(hideLoading());
    });
  }, [uniqueId, dispatch]);

  useEffect(() => {
    getImages();
    getProperty();
  }, [getImages, getProperty]);

  const formik = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
    }),
    onSubmit: (values) => {
      if (typeof values.images[0] != "string") {
        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("property_id", uniqueId);
        formData.append("property_name", property.property_name);
        for (const image of values.images) {
          formData.append("images", image);
        }
        API.post(`/gallery`, formData).then((response) => {
          if (response.data.message) {
            toast.success(response.data.message);
            window.location.reload();
          } else if (response.data.error) {
            toast.error(response.data.error);
          }
        });
      }
    },
  });

  function PhotobookImage({ url }) {
    return (
      <div>
        <img className="img-fluid mb-2 br-7" src={url} alt="" />
      </div>
    );
  }

  const PhotoItem = ({ image, group }) => (
    <div>
      <LightgalleryItem group={group} src={image}>
        <PhotobookImage url={image} />
      </LightgalleryItem>
    </div>
  );

  const handleDeleteGallery = (uniqueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(showLoading());
          API.delete(`/gallery/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
        getImages();
      })
      .catch((error) => {
        dispatch(hideLoading());
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="tab-pane profiletab" id="tab-71">
        <Card>
          <Card.Header>
            <Card.Title as="h5">Gallery</Card.Title>
          </Card.Header>
          <Card.Body>
            {files.map((items) => (
              <>
                <Form.Label>
                  {items.title}
                  <span>
                    <Link
                      to={`/dashboard/edit/gallery/${items.property_name}/${items.uniqueId}`}
                    >
                      <button className="btn">
                        <i className="fe fe-edit text-primary"></i>
                      </button>
                    </Link>
                  </span>
                  <span>
                    <button
                      onClick={() => handleDeleteGallery(items.uniqueId)}
                      className="btn"
                    >
                      <i className="fe fe-trash text-primary"></i>
                    </button>
                  </span>
                </Form.Label>
                <div
                  id="lightgallery"
                  className="row mb-5 img-gallery"
                  lg-uid="lg0"
                >
                  <LightgalleryProvider>
                    {items.images.map((item) => {
                      return (
                        <div className="col-lg-3 col-md-6">
                          <PhotoItem
                            image={`http://localhost:5000/images/${item}`}
                            group="group1"
                          />
                        </div>
                      );
                    })}
                  </LightgalleryProvider>
                </div>
              </>
            ))}
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Add More Images to Gallery</Card.Title>
          </Card.Header>
          <Card.Body>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter Gallery Title..."
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.title && formik.touched.title ? (
                      <span className="text-danger">{formik.errors.title}</span>
                    ) : (
                      <span />
                    )}
                  </div>
                </Col>
                <div className="mb-3">
                  <Form.Label>Images</Form.Label>
                  <DropImg
                    type="file"
                    className="dropify"
                    imgtype="gallery"
                    formik={formik}
                  />
                </div>
              </Row>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

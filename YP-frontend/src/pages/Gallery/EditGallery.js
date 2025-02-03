import React, { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/Api";
import { useNavigate, useParams } from "react-router-dom";
import { DropImg } from "../Property/PropertyComponents/DropImg";
import { toast } from "react-toastify";

export default function EditGallery() {
    const navigate = useNavigate();
    const { property_name, uniqueId } = useParams();
    const [gallery, setGallery] = useState("");
    const [property, setProperty] = useState([]);

    useEffect(() => {
        const getgallery = () => {
            API.get(`/gallery/${uniqueId}`).then(({ data }) => {
                setGallery(data);
            })
        }
        const getProperty = () => {
            API.get("/property").then(({ data }) => {
                setProperty(data);
            })
        }
        getgallery();
        getProperty();
    }, []);

    const initialValues = {
        title: gallery.title || "",
        images: gallery.images || ""
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required.'),
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (typeof values.images[0] != 'string') {
                let formData = new FormData();
                formData.append("title", values.title);
                formData.append("property_id", uniqueId);
                for (const image of values.images) {
                    formData.append("images", image);
                    console.log(image)
                }
                API.patch(`/gallery/${uniqueId}`, formData).then((response) => {
                    if (response.data.message) {
                        toast.success(response.data.message);
                        // window.location.reload();
                    } else if (response.data.error) {
                        toast.error(response.data.error);
                    }
                });
            } else {
                toast.error("Image is required!")
            }
        },
    });

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Gallery</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                Edit
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item breadcrumds" aria-current="page"            >
                                Gallery
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item breadcrumds" aria-current="page"            >
                                {gallery.property_name}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page"            >
                                {gallery.uniqueId}
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

                <Card>
                    <Card.Header>
                        <h5>
                            <strong>
                                Edit Gallery
                            </strong>
                        </h5>
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
                                        {formik.errors.title && formik.touched.title ? <span className='text-danger'>{formik.errors.title}</span> : <span />}
                                    </div>
                                </Col>
                                <Col md={12}>
                                    {gallery.images?.map((items, key) => (
                                        <span key={key}>
                                            <img src={`http://localhost:5000/images/${items}`} className="editGalleryImages me-1" alt="images..." />
                                        </span>
                                    ))}
                                </Col>
                                <Col md={12}>
                                    <div className="mb-3">
                                        <Form.Label>Images</Form.Label>
                                        <DropImg
                                            type="file" className="dropify" imgtype="gallery"
                                            formik={formik}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
};
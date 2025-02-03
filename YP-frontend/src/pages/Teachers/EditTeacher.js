import React, { useEffect, useState } from "react";
import { Form, Button, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataRequest from "../../context/DataRequest";
import { API } from "../../context/Api";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function EditTeacher() {
    const navigate = useNavigate();
    const { property_name, uniqueId } = useParams();
    const [previewProfile, setPreviewProfile] = useState("");
    const [teacher, setTeacher] = useState("");
    const [status, setStatus] = useState([]);
    const [property, setProperty] = useState([]);

    useEffect(() => {
        getTeacher();
        getStatus();
    }, []);

    const getTeacher = () => {
        API.get(`/teacher/${uniqueId}`).then(({ data }) => {
            setTeacher(data);
        })
    };

    const getStatus = () => {
        API.get(`/status`).then(({ data }) => {
            setStatus(data);
        })
    };

    const initialValues = {
        teacher_name: teacher.teacher_name || "",
        profile: teacher.profile || "",
        designation: teacher.designation || "",
        experience: teacher.experience || "",
        status: teacher.status || ""
    }

    const validationSchema = Yup.object({
        teacher_name: Yup.string()
            .required('Name is required.')
            .matches(/^[a-zA-Z\s]+$/, "Name must be alphabets only!"),
        profile: Yup.string()
            .required('Profile is required.'),
        designation: Yup.string()
            .required('Designation is required.'),
        experience: Yup.string()
            .required('Experience is required.'),
        status: Yup.string()
            .required('Status is required.'),
    })

    const onSubmit = async (values) => {
        if (typeof values.profile == 'object' || typeof values.profile != 'object') {
            let formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            API.patch(`/teacher/${uniqueId}`, formData).then((response) => {
                if (response.data.message) {
                    toast.success(response.data.message)
                    navigate(`/dashboard/view/teacher/${property_name}/${uniqueId}`);
                } else if (response.data.error) {
                    toast.error(response.data.message)
                }
            })
        }
    };

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    });

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Teacher</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                Edit
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item">
                                Teacher
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item breadcrumds" aria-current="page">
                                {property_name}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page"                            >
                                {teacher.uniqueId}
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

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Card className="border p-0">
                        <Card.Header>
                            <h4 className="fs-16 text-dark fw-semibold">
                                Edit Teacher
                            </h4>
                        </Card.Header>
                        <Card.Body className="">
                            <Row>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <input
                                            type="text"
                                            name="teacher_name"
                                            className="form-control"
                                            placeholder="Enter Teacher Name..."
                                            value={values.teacher_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.teacher_name && touched.teacher_name ? <span className='text-danger'>{errors.teacher_name}</span> : <span />}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Form.Label>Designation</Form.Label>
                                        <input
                                            type="text"
                                            name="designation"
                                            className="form-control"
                                            placeholder="Enter Teacher Designation..."
                                            value={values.designation}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.designation && touched.designation ? <span className='text-danger'>{errors.designation}</span> : <span />}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Form.Label>Experience</Form.Label>
                                        <input
                                            type="number"
                                            name="experience"
                                            className="form-control"
                                            placeholder="Enter Teacher Experience..."
                                            value={values.experience}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.experience && touched.experience ? <span className='text-danger'>{errors.experience}</span> : <span />}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <select
                                            name="status"
                                            className="form-control"
                                            value={values.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">--Select Status--</option>
                                            {status.map((item, key) => (
                                                <option key={key} value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                        {errors.status && touched.status ? <span className='text-danger'>{errors.status}</span> : <span />}
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="mb-3">
                                        <Form.Label>Profile</Form.Label>
                                        <input
                                            type="file"
                                            name="profile"
                                            className="form-control"
                                            onChange={(e) => {
                                                let reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setFieldValue("profile", e.target.files[0]);
                                                        setPreviewProfile(reader.result);
                                                    }
                                                }
                                                reader.readAsDataURL(e.target.files[0])
                                            }}
                                            onBlur={handleBlur}
                                        />
                                        {!previewProfile
                                            ? <img src={`http://localhost:5000/images/${teacher.profile}`} className="mt-1" width="100" alt="" />
                                            : <img src={previewProfile} className="mt-1" width="100" alt="" />
                                        }
                                        {errors.profile && touched.profile ? <span className='text-danger'>{errors.profile}</span> : <span />}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Card.Footer>
                    </Card>
                </form>
            </div>
        </>
    )
};
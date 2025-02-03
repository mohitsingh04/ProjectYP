import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

export default function EditPropertyCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { uniqueId } = useParams();
    const [propertyCourse, setPropertyCourse] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [courseTypes, setCourseTypes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseDurationValue, setCourseDuration] = useState([]);

    useEffect(() => {
        getPropertyCourse();
        getCourse();
    }, []);

    const getPropertyCourse = () => {
        dispatch(showLoading());
        API.get(`/property-course/${uniqueId}`).then(({ data }) => {
            dispatch(hideLoading());
            setPropertyCourse(data)
        })
    }

    const getCourse = () => {
        API.get("/course").then(({ data }) => {
            setCourses(data);
            const uniqueCourseTypes = [...new Set(data.map(item => item.course_type))];
            setCourseTypes(uniqueCourseTypes);
            const uniqueCourseDuration = [...new Set(data.map(item => item.duration))];
            setCourseDuration(uniqueCourseDuration);
        });
    }

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredCoursesDefault = courses.filter(course => course.course_type === selectedType);
    const filteredCourses = courses.filter(course => course.course_type === propertyCourse?.course_type);

    const initialValues = {
        course_type: propertyCourse.course_type || "",
        course_name: propertyCourse.course_name || "",
        price: propertyCourse.price || "",
        duration: propertyCourse.duration || "",
    }

    const validationSchema = Yup.object({
        course_type: Yup.string()
            .required('Course type is required.'),
        course_name: Yup.string()
            .required('Course is required.'),
        price: Yup.string()
            .required('Price is required.'),
        duration: Yup.string()
            .required('Duration is required.'),

    })

    const onSubmit = async (values) => {
        try {
            dispatch(showLoading());
            API.patch(`/property-course/${uniqueId}`, values).then((response) => {
                dispatch(hideLoading());
                if (response.data.message) {
                    toast.success(response.data.message)
                    // navigate("/dashboard/property")
                    window.location.reload();
                } else if (response.data.error) {
                    toast.error(response.data.error)
                }
            })
        } catch (err) {
            dispatch(hideLoading());
            toast.error(err.message)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Course</h1>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item" href="#">
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                            Edit
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                            Course
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                            {propertyCourse.property_name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                            {propertyCourse.uniqueId}
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
                            <h3 className="card-title">Edit Course</h3>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="courseType">Course Type</label>
                                            <select
                                                type="select"
                                                name="course_type"
                                                id="courseType"
                                                className="form-control"
                                                value={formik.values.course_type}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    handleTypeChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">-- Select Course --</option>
                                                {courseTypes.map((type, index) => (
                                                    <option key={index} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {formik.errors.course_type && formik.touched.course_type ? <span className='text-danger'>{formik.errors.course_type}</span> : <span />}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="course">Course</label>
                                            <select
                                                type="select"
                                                name="course_name"
                                                id="course"
                                                className="form-control"
                                                value={formik.values.course_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">-- Select Course --</option>
                                                {selectedType !== ""
                                                    ?
                                                    <>
                                                        {filteredCoursesDefault.map((course, index) => (
                                                            <option key={index} value={course.course_name}>{course.course_name}</option>
                                                        ))}
                                                    </>
                                                    :
                                                    <>
                                                        {filteredCourses.map((course, index) => (
                                                            <option key={index} value={course.course_name}>{course.course_name}</option>
                                                        ))}
                                                    </>
                                                }
                                            </select>
                                            {formik.errors.course_name && formik.touched.course_name ? <span className='text-danger'>{formik.errors.course_name}</span> : <span />}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="duration">Duration</label>
                                            <select
                                                id="duration"
                                                name="duration"
                                                className="form-control"
                                                placeholder="Duration"
                                                value={formik.values.duration}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">--Select--</option>
                                                {courseDurationValue.map((duration, index) => (
                                                    <option key={index} value={duration}>{duration}</option>
                                                ))}
                                            </select>
                                            {formik.errors.duration && formik.touched.duration ? <span className='text-danger'>{formik.errors.duration}</span> : <span />}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="price">Course Price</label>
                                            <input
                                                type="number"
                                                id="price"
                                                className="form-control"
                                                name="price"
                                                placeholder="Enter Amount ₹"
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.price && formik.touched.price ? <span className='text-danger'>{formik.errors.price}</span> : <span />}
                                        </div>
                                    </Col>
                                </Row>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
}
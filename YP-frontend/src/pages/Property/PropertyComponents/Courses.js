import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../../context/DataRequest";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";

export default function Courses() {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const { User } = DataRequest();
    const { uniqueId } = useParams();
    const [courses, setCourses] = useState([]);
    const [courseTypes, setCourseTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [property, setProperty] = useState("");
    const [showCourseForm, setShowCourseForm] = useState(true);
    const [courseDurationValue, setCourseDuration] = useState([]);
    const [courseDurationValueUnit, setCourseDurationUnit] = useState([]);
    const [propertyCourse, setPropertyCourse] = useState([]);

    useEffect(() => {
        getProperty();
        getPropertyCourse();
        getCourse();
    }, [])

    const getProperty = () => {
        dispatch(showLoading());
        API.get(`/property/${uniqueId}`).then(({ data }) => {
            dispatch(hideLoading());
            setProperty(data)
        })
    }

    const getPropertyCourse = () => {
        API.get("/property-course").then(({ data }) => {
            setPropertyCourse(data);
            // setPropertyCourse(data.filter(propertyCourse => propertyCourse?.property_id === uniqueId));
            console.log(data.filter(propertyCourse => propertyCourse?.property_id === uniqueId));
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

    const filteredCourses = courses.filter(course => course.course_type === selectedType);

    const initialValues = {
        userId: User.uniqueId,
        course_type: "",
        course_name: "",
        price: "",
        duration: "",
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
            values = { ...values, "property_id": property.uniqueId, "property_name": property.property_name }
            dispatch(showLoading());
            API.post(`/property-course`, values).then((response) => {
                dispatch(hideLoading());
                if (response.data.message) {
                    toast.success(response.data.message)
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

    const handleAddCourse = () => {
        setShowCourseForm(!showCourseForm)
    };

    const handleHideCourseForm = () => {
        setShowCourseForm(true)
    };

    return (
        <>
            <Card>
                <Card.Body>
                    {showCourseForm
                        ?
                        <>
                            {courses
                                ?
                                <>
                                    <div className="tab-pane " id="tab-61">
                                        <span className="widget-users row profiletab  mb-5">
                                            <li className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                <Card className="border p-0">
                                                    <Button onClick={handleAddCourse} variant="default">
                                                        <Card.Body className="text-center">
                                                            <img
                                                                className="avatar avatar-xxl brround cover-image mt-2"
                                                                src="data:image/png;base64,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"
                                                                alt=""
                                                            />
                                                            <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                                                                Add a New Course
                                                            </h4>
                                                        </Card.Body>
                                                    </Button>
                                                </Card>
                                            </li>
                                            {propertyCourse.map((items, key) => (
                                                <li key={key} className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                    <Link to={`/dashboard/view/course/${items.property_name}/${items.uniqueId}`}>
                                                        <Card className="border p-0">
                                                            <Card.Body className="text-center">
                                                                {/* <img
                                                                    className="avatar avatar-xxl brround cover-image mt-2"
                                                                    src="data:image/png;base64,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"
                                                                    alt=""
                                                                /> */}
                                                                <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                                                                    {items.course_name}
                                                                </h4>
                                                                <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                                                                    Price: {items.price}
                                                                </h4>
                                                                <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                                                                    Duration: {items.duration}
                                                                </h4>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                </li>
                                            ))}
                                        </span>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="tab-pane " id="tab-61">
                                        <span className="widget-users row profiletab  mb-5">
                                            <li className="col-lg-4 col-md-6 col-sm-12 col-12">
                                                <Card className="border p-0">
                                                    <Button onClick={handleAddCourse} variant="default">
                                                        <Card.Body className="text-center">
                                                            <img
                                                                className="avatar avatar-xxl brround cover-image mt-2"
                                                                src="data:image/png;base64,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"
                                                                alt=""
                                                            />
                                                            <h4 className="fs-16 mb-5 mt-5 text-dark fw-semibold">
                                                                Add a New Course
                                                            </h4>
                                                        </Card.Body>
                                                    </Button>
                                                </Card>
                                            </li>
                                        </span>
                                    </div>
                                </>
                            }
                        </>
                        :
                        <>
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
                                                {filteredCourses.map((course, index) => (
                                                    <option key={index} value={course.course_name}>{course.course_name}</option>
                                                ))}
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
                                <button type="submit" className="btn btn-primary">Add</button>
                                <button onClick={handleHideCourseForm} className="btn btn-danger ms-1">Cancel</button>
                            </form>
                        </>
                    }
                </Card.Body>
            </Card>
        </>
    )
};
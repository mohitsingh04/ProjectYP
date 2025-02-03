import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ViewPropertyCourse() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course, setCourse] = useState("");
    const { uniqueId } = useParams();

    useEffect(() => {
        dispatch(showLoading());
        API.get(`/property-course/${uniqueId}`).then(({ data }) => {
            dispatch(hideLoading());
            setCourse(data)
        })
    }, [])

    const handleDeleteCourse = (uniqueId) => {
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
                    API.delete(`/course/${uniqueId}`).then((response) => {
                        dispatch(hideLoading());
                        if (response.data.message) {
                            toast.success(response.data.message);
                        } else if (response.data.error) {
                            toast.success(response.data.error);
                        }
                    })
                    navigate(`/dashboard/property`);
                }
            }).catch((error) => {
                dispatch(hideLoading());
                toast.error(error.message)
            })
    }

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Course</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                View
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                Course
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                {course.property_name}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                                {course.uniqueId}
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
                    <Col md={12}>
                        <Card>
                            <Card.Body className="bg-white">
                                <div className="media-heading">
                                    <h5>
                                        <strong>View Course</strong>
                                        <span className="float-end">
                                            <Link data-bs-toggle="tooltip" title="Edit" to={`/dashboard/edit/course/${course.property_name}/${course.uniqueId}`} className="btn btn-primary me-1">
                                                <span>
                                                    <i className="fe fe-edit"></i>&nbsp;
                                                </span>
                                            </Link>
                                            <button onClick={() => handleDeleteCourse(course.uniqueId)} data-bs-toggle="tooltip" title="Delete" className="btn btn-danger">
                                                <span>
                                                    <i className="fe fe-trash"></i>&nbsp;
                                                </span>
                                            </button>
                                        </span>
                                    </h5>
                                </div>
                                <hr className="mt-5" />
                                <div className="table-responsive p-1">
                                    <Table className="table row table-borderless">
                                        <tbody className="col-lg-12 col-xl-6 p-0">
                                            <tr>
                                                <td>
                                                    <strong className="fs-6">Course Type: </strong> {course.course_type}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong className="fs-6">Price: </strong>Rs.{course.price}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="col-lg-12 col-xl-6 p-0"><tr>
                                            <td>
                                                <strong className="fs-6">Course: </strong> {course.course_name}
                                            </td>
                                        </tr>
                                            <tr>
                                                <td>
                                                    <strong className="fs-6">Duration: </strong>{course.duration}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
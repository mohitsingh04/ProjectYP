import React, { useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";


export default function CourseList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [course, setCourse] = useState("");

    useEffect(() => {
        getCourse()
    }, [])

    const getCourse = () => {
        try {
            API.get("/course").then(({ data }) => {
                setCourse(data);
            })
        } catch (err) {
            toast.error(err.message)
        }
    }

    const viewCourse = (uniqueId) => {
        navigate("/dashboard/course/view/" + uniqueId);
    }

    const editCourse = (uniqueId) => {
        navigate("/dashboard/course/edit/" + uniqueId);
    }

    const deleteCourse = (uniqueId) => {
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
                        toast.success(response.data.message);
                    })
                }
                getCourse();
            }).catch((error) => {
                dispatch(hideLoading());
                console.log(error.message)
            })
    }

    const columns = [
        {
            name: "S.NO",
            selector: (row) => [row.uniqueId],
            sortable: true,
        },
        {
            name: "IMAGE",
            selector: (row) => [
                <img src={`http://localhost:5000/images/${row.image}`} width={53} alt="" />
            ],
            sortable: true,
        },
        {
            name: "NAME",
            selector: (row) => [row.course_name],
            sortable: true,
        },
        {
            name: "STATUS",
            selector: (row) => [
                <>
                    {row.status === "Active" ? <span className="badge bg-success">{row.status}</span>
                        : row.status === "InActive" ? <span className="badge bg-danger">{row.status}</span>
                            : <span className="badge bg-warning">{row.status}</span>}
                </>
            ],
            sortable: true,
        },
        {
            name: "ACTION",
            selector: (row) => [
                <button data-bs-toggle="tooltip" title="View" onClick={() => viewCourse(row.uniqueId)}>
                    <i className="fe fe-eye"></i>
                </button>,
                <button data-bs-toggle="tooltip" title="Edit" onClick={() => editCourse(row.uniqueId)}>
                    <i className="fe fe-edit"></i>
                </button>,
                <button data-bs-toggle="tooltip" title="Delete" onClick={() => deleteCourse(row.uniqueId)}>
                    <i className="fe fe-trash-2"></i>
                </button>
            ],
        },
    ];

    const data = course;

    const tableData = {
        columns,
        data,
    };

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Course</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item">
                                <Link to="/dashboard/">
                                    Dashboard
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                                Course List
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="ms-auto pageheader-btn">
                        <Link to="/dashboard/course/add/" className="btn btn-primary btn-icon text-white me-3">
                            <span>
                                <i className="fe fe-plus"></i>&nbsp;
                            </span>
                            Add Course
                        </Link>
                    </div>
                </div>

                <Row className="row-sm">
                    <Col lg={12}>
                        <Card className="custom-card">
                            <Card.Body>
                                <div className="table">
                                    <DataTableExtensions {...tableData}>
                                        <DataTable
                                            columns={columns}
                                            data={data}
                                            noHeader
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            striped={true}
                                            center={true}
                                            persistTableHead
                                            pagination
                                            highlightOnHover
                                        />
                                    </DataTableExtensions>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
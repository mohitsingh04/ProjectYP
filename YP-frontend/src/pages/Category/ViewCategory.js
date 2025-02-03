import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function ViewCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { uniqueId } = useParams();
    const [category, setCategory] = useState("");

    useEffect(() => {
        const getCategory = () => {
            dispatch(showLoading());
            API.get(`/category/${uniqueId}`).then(({ data }) => {
                dispatch(hideLoading());
                setCategory(data)
            })
        };
        getCategory()
    }, [])

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Category</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item">
                                <Link to="/dashboard/">
                                    Dashboard
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item" aria-current="page">
                                <Link to="/dashboard/category/">
                                    Category
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active" aria-current="page">
                                View
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                                {category.uniqueId}
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
                    <Col lg={12} md={12}>
                        <Card className="productdesc">
                            <Card.Body>
                                <div className="text-center">
                                    <div className="bg-light-gray p-5">
                                        <img
                                            className="position-absolute bottom-0 start-0"
                                            alt="Product"
                                            src={`http://localhost:5000/images/${category.category_icon}`}
                                            width={100}
                                            style={{ margin: "165px 26px" }}
                                        />
                                        <img
                                            alt="Product"
                                            src={`http://localhost:5000/images/${category.featured_image}`}
                                            width={200}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="mt-4 mb-4">
                                    <p className="float-end">{category.status === "Active" ? <span className="badge bg-success">{category.status}</span>
                                        : category.status === "InActive" ? <span className="badge bg-danger">{category.status}</span>
                                            : <span className="badge bg-warning">{category.status}</span>}</p>
                                    <h3>{category.category_name}</h3>
                                    {category.description ? (
                                        <strong className="fs-6">Description: </strong>
                                    ) : (
                                        <strong className="fs-6">Description: Not Available</strong>
                                    )}

                                    {category.description && (
                                        <span>{category.description.replace(/<[^>]+>/g, '')}</span>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
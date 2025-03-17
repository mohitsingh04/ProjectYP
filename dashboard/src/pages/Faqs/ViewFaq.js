import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";

export default function ViewFaqs() {
    const navigate = useNavigate();
    const { uniqueId } = useParams();
    const [faqs, setFaqs] = useState("");

    useEffect(() => {
        getFaqs();
    }, [])

    const getFaqs = () => {
        API.get(`/faqs/${uniqueId}`).then(({ data }) => {
            setFaqs(data);
        });
    };

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Faqs</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                Faqs
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page"                            >
                                View Faqs
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
                                        <strong>View Faqs</strong>
                                    </h5>
                                </div>
                                <hr className="mt-5" />
                                <div className="table-responsive p-1">
                                    <Table className="table row table-borderless">
                                        <tbody className="col-lg-12 col-xl-6 p-0">
                                            <tr>
                                                <td>
                                                    <strong>Question:</strong> {faqs.question}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody className="col-lg-12 col-xl-6 p-0">
                                            <tr>
                                                <td>
                                                    <strong>Property Id:</strong> {faqs.property_id}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <Row className="row profie-img">
                                    <Col md={12}>
                                        <div className="media-heading">
                                            <h5>
                                                <strong>Description</strong>
                                            </h5>
                                        </div>
                                        <p className="mb-0">
                                            {faqs.answer}
                                            {/* {status.description.replace(/<[^>]+>/g, '')} */}
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
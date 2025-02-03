import React from "react";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";
import * as datatable from "../../data/Table/datatable/datatable";
import { Link, useNavigate } from "react-router-dom";

export default function Enquiry() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Enquiry</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                Dashboard
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                                Enquiry List
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

                <Row className=" row-sm">
                    <Col lg={12}>
                        <Card>
                            <Card.Header>
                                <h3 className="card-title">Datatable ExportCSV</h3>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive export-table">
                                    <datatable.ExportCSV />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
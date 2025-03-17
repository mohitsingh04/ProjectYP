import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CustomFooter() {
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="top-footer container">
                        <Row>
                            <Col md={12} lg={4}>
                                <h6>About</h6>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit
                                    voluptatem accusantium doloremque laudantium, totam rem
                                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                                    quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <p>
                                    Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur Excepteur sint
                                    occaecat .
                                </p>
                            </Col>
                            <Col md={12} lg={2}>
                                <h6>Pages</h6>
                                <ul className="list-unstyled mb-4">
                                    <li>
                                        <Link to="#">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Elements</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Forms</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Charts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Tables</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Other Pages</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={12} lg={2}>
                                <h6>Information</h6>
                                <ul className="list-unstyled mb-4">
                                    <li>
                                        <Link to="#">Our Team</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Contact US</Link>
                                    </li>
                                    <li>
                                        <Link to="#">About</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Services</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Blog</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Terms and Services</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={12} lg={4}>
                                <h6>Location</h6>
                                <ul className="list-unstyled mb-4">
                                    <li>
                                        <Link to="#">
                                            Address1:7363 Old Livingston Drive Dyersburg
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            Address2:4 Harrison St.Fairborn, OH 45324
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Phno1: +123 456 8976</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Phno2: +567 234 7865</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Mail1: yourdomain@gmail.com</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Mail2: infodomain@gmail.com</Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                    <footer className="main-footer ps-0 pe-0 container">
                        <Row>
                            <Col lg={12} xl={8} md={12} className=" footer1">
                                Copyright ©Zanex 2022. Design By
                                <Link to="https://spruko.com/"> Spruko</Link>
                            </Col>
                            <Col xl={4} lg={12} md={12} className=" ms-auto text-end">
                                <ul className="footer-social-list ">
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-google"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <i className="fa fa-linkedin"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </footer>
                </Card.Body>
            </Card>
        </>
    )
};
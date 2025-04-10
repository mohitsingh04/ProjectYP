import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";


const Underconstruction = () => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateTimer = () => {
    const future = new Date("Dec 19, 2024 11:30:00").getTime();
    const now = new Date().getTime();
    const diff = future - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });
  };

  return (
    <Fragment>
      <Container>
        <Row className="text-center mx-auto mt-7 launch_date">
          <Col lg={8} sm={12} className="center-block align-items-center construction mx-auto ">
            <Card className="text-white bg-transparent border-0">
              <Card.Body className="mt-6 mt-sm-0">
                <h1 className="display-2 mb-0 fw-semibold text-fixed-white fs-64 mt-4">Coming Soon</h1>
                <div className="d-sm-flex mb-4 justify-content-center">
                  <div class="">
                    <div class="p-3 under-maintenance-time">
                      <p class="mb-1 fs-12 op-5">DAYS</p>
                      <h4 class="fw-semibold mb-0">{timeRemaining.days}</h4>
                    </div>
                  </div>
                  <div class="">
                    <div class="p-3 under-maintenance-time">
                      <p class="mb-1 fs-12 op-5">HOURS</p>
                      <h4 class="fw-semibold mb-0">{timeRemaining.hours}</h4>
                    </div>
                  </div>
                  <div class="">
                    <div class="p-3 under-maintenance-time">
                      <p class="mb-1 fs-12 op-5">MINUTES</p>
                      <h4 class="fw-semibold mb-0">{timeRemaining.minutes}</h4>
                    </div>
                  </div>
                  <div class="">
                    <div class="p-3 under-maintenance-time">
                      <p class="mb-1 fs-12 op-5">SECONDS</p>
                      <h4 class="fw-semibold mb-0">{timeRemaining.seconds}</h4>
                    </div>
                  </div>
                </div>
                <p className="text-fixed-white">we apologize for your in-convenience....any quaries contact me </p>
                <h5 className="text-fixed-white"><strong>Contact:</strong> Zanex@demo.com</h5>
                <div className="mt-4">
                  <button className="btn btn-icon border-0" type="button">
                    <span className="btn-inner--icon"><i className="ri-facebook-fill"></i></span>
                  </button>
                  <button className="btn btn-icon border-0" type="button">
                    <span className="btn-inner--icon"><i className="ri-google-fill"></i></span>
                  </button>
                  <button className="btn btn-icon border-0" type="button">
                    <span className="btn-inner--icon"><i className="ri-twitter-x-fill"></i></span>
                  </button>
                  <button className="btn btn-icon border-0" type="button">
                    <span className="btn-inner--icon"><i className="ri-pinterest-fill"></i></span>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Underconstruction
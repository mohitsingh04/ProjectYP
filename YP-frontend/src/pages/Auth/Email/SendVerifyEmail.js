import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";

export default function SendVerifyEmail() {
  const { email } = useParams();
  const [isRunning, setIsRunning] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) {
      setIsRunning(false);
      setTimer(60);
    }
  }, [timer]);

  useEffect(() => {
    if (isRunning) {
      setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  }, [isRunning]);

  const handleResendMail = async () => {
    try {
      const response = await API.post(`/verify-email`, { email });
      toast.success(response.data.message);
      setTimer(60);
      setIsRunning(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="login-img">
        <div className="page">
          <Fragment>
            <div className="col-login mx-auto">
              <div className="text-center">
                <img
                  src={require("../../../assets/custom-logo/logo.png")}
                  className="header-brand-img"
                  alt="Logo"
                />
              </div>
            </div>

            <div className="container-login100">
              <Card
                className="wrap-login100 p-0"
                style={{ height: "300px", width: "500px" }}
              >
                <Card.Body>
                  <div className="text-center" style={{ marginTop: "50px" }}>
                    <h4>Verify your email</h4>
                    <p className="my-4">
                      A verification email has been sent to your email address.
                      The verification email will expire after 24 hours.
                    </p>
                    {isRunning ? (
                      <p>
                        You can resend Email after{" "}
                        <span
                          type="button"
                          className="text-danger"
                          onClick={handleResendMail}
                        >
                          {timer} sec
                        </span>
                      </p>
                    ) : (
                      <p>
                        Didn’t receive an email?{" "}
                        <span type="button" onClick={handleResendMail}>
                          <u>Resend the verification email</u>
                        </span>
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
}

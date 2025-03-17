import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { API } from "../../../context/Api";

export default function EmailVerified() {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      API.get(`/verify-email/${token}`).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          setMessage(response.data.message);
        } else if (response.data.error) {
          toast.error(response.data.error);
          setMessage(response.data.error);
        }
      });
    } catch (err) {
      console.error(err?.message);
    }
  }, [token]);

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center my-5">{message}</h1>
          <Link to="/dashboard">
            <button className="btn btn-primary">Dashboard</button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

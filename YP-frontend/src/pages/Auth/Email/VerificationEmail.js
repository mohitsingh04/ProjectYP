import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";

export default function VerificationEmail() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const response = await API.get(`/verify-email/${token}`);

        console.log(response);
        if (response.data.message) {
          Swal.fire({
            title: "Verified!",
            text: response.data.message,
            icon: "success",
            timer: 2000,
          }).then(() => {
            navigate("/login");
          });
        } else {
          console.log(response);
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token,navigate]);

  return (
    <div className="login-img">
      <div className="page">
        <div className="position-absolute top-50 start-50 translate-middle text-light">
          {loading ? <p>Verifying...</p> : <h1>Invalid Token!</h1>}
        </div>
      </div>
    </div>
  );
}

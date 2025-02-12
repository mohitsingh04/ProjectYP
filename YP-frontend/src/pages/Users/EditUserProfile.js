import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../context/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function EditUserProfile() {
  const [previewProfile, setPreviewProfile] = useState("");
  const [user, setUser] = useState({});
  const { uniqueId } = useParams();

  useEffect(() => {
    API.get(`/user/${uniqueId}`).then(({ data }) => {
      setUser(data);
    });
  }, [uniqueId]);

  const validationSchema = Yup.object({
    profile: Yup.string().required("Profile is required"),
  });

  const handleUpdateProfile = async (values) => {
    try {
      const formData = new FormData();
      formData.append("profile", values.profile);
      const response = await API.patch(`/user/profile/${uniqueId}`, formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: {
      profile: user.profile || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  return (
    <div className="d-flex mb-3">
      <img
        src={
          previewProfile ||
          `http://localhost:5000/images/${user.profile || "default.jpg"}`
        }
        className="rounded-circle avatar-lg me-2"
        alt="user avatar"
      />
      <div className="ms-auto mt-xl-2 mt-lg-0 me-lg-2">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="file"
            name="profile"
            onChange={(e) => {
              let reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setPreviewProfile(reader.result);
                  formik.setFieldValue("profile", e.target.files[0]);
                }
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          <button type="submit">
            <i className="fe fe-check"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

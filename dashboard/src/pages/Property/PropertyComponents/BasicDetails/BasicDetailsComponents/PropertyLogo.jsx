import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ALLImages from "../../../../../common/Imagesdata";
import { API } from "../../../../../context/API";
import Swal from "sweetalert2";

export default function PropertyLogo({ property }) {
  const { objectId } = useParams();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setFile(null);
  };

  const handleConfirm = async () => {
    if (!file || !objectId) return;

    const formData = new FormData();
    formData.append("property_logo", file);

    try {
      setUploading(true);
      const response = await API.patch(
        `/property/images/${objectId}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Logo Updated",
        text:
          response.data.message ||
          "Your property logo has been successfully updated.",
        timer: 2000,
        showConfirmButton: false,
      });
      window.location.reload();
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          err.response.data.error ||
          "Something went wrong while uploading the image.",
      });
    } finally {
      setUploading(false);
    }
  };

  const getImageSrc = () => {
    if (preview) return preview;
    if (property?.property_logo?.[0])
      return `${import.meta.env.VITE_MEDIA_URL}/${property?.property_logo[0]}`;
    return ALLImages("face8");
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column text-center">
      <img
        src={getImageSrc()}
        alt="Property Logo"
        width="150"
        className="rounded-circle mb-3 profile-ratio shadow-sm"
      />

      <div className="d-flex align-items-center justify-content-center gap-2">
        <h5 className="mb-0">Property Logo</h5>

        <label
          className="btn btn-outline-light btn-sm mb-0"
          htmlFor="logoUpload"
        >
          <i className="bi bi-pencil-fill"></i>
        </label>
        <input
          id="logoUpload"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {preview && (
          <>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={handleConfirm}
              disabled={uploading}
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <i className="bi bi-check-circle-fill"></i>
              )}
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancel}
              disabled={uploading}
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </>
        )}
      </div>

      <small className="text-muted">Your Property logo preview</small>
    </div>
  );
}

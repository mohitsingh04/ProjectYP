import React, { useCallback, useEffect, useState } from "react";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Col } from "react-bootstrap";

export default function EditGallery({
  gallleryId,
  getGallery,
  setToggleGalleryPage,
}) {
  const [gallery, setGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [title, setTitle] = useState("");
  const [newImages, setNewImages] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [error, setError] = useState("");

  const fetchGallery = useCallback(async () => {
    try {
      const response = await API.get(`/gallery/${gallleryId}`);
      setGallery(response.data);
      setGalleryImages(response.data.gallery || []);
      setTitle(response.data.title || "");
      setPropertyId(response.data.propertyId);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [gallleryId]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const removeImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateGallery = async () => {
    if (!/^[A-Za-z\s]+$/.test(title)) {
      setError("Title must contain only alphabets and spaces.");
      return;
    }

    if (title.length < 3) {
      setError("Title year at least 3 Char long.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("propertyId", propertyId);

    if (Array.isArray(galleryImages) && galleryImages.length > 0) {
      galleryImages.forEach((item) => {
        formData.append("gallery", item);
      });
    } else {
      formData.append("gallery", "");
    }
    if (newImages.length > 0) {
      newImages.forEach((item) => {
        formData.append("newImages", item);
      });
    }

    try {
      const response = await API.patch(
        `/gallery/${gallery?.uniqueId}`,
        formData
      );
      toast.success(response.data.message);
      setToggleGalleryPage(true);
      getGallery();
      window.scrollTo(0, 0);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const filePreviews = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setNewImages((prev) => [...prev, ...filePreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
  });

  const handleImageInUpdate = (img, index) => {
    const splitImage = img.split(".");
    const extension = splitImage.pop();
    if (extension === "webp") {
      return (
        <Col key={index} lg={3} md={3} sm={6} className="col-12">
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/${img}`}
            alt={img}
            style={{ aspectRatio: "2/2", objectFit: "cover" }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute top-0 end-0"
            onClick={() => removeImage(index)}
          >
            Remove
          </button>
        </Col>
      );
    }

    return;
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Enter a Title for Gallery"
          className="form-control"
        />
        <span className="text-danger">{error}</span>
      </div>
      <div
        {...getRootProps({
          className: "border border-dashed p-5 rounded-3 text-center",
        })}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
      <div className="row mt-4 px-4">
        {galleryImages.map((item, index) => handleImageInUpdate(item, index))}
        {newImages.length > 0 &&
          newImages.map((item, index) => (
            <div key={index} className="col-md-3 p-0 px-1 position-relative">
              <img
                src={
                  item.preview || `${process.env.REACT_APP_MEDIA_URL}/${item}`
                }
                alt="Preview"
                className="img-fluid w-100 h-100"
                style={{ aspectRatio: "2/2", objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                onClick={() => removeNewImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
      <button
        type="submit"
        onClick={handleUpdateGallery}
        className="mt-3 btn btn-primary"
      >
        Update
      </button>
    </div>
  );
}

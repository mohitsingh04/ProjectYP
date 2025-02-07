import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../../context/Api";

export default function AddGallery({ getGallery }) {
  const [images, setImages] = useState([]);
  const { uniqueId } = useParams();

  useEffect(() => {
    return () => {
      images.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const initialValues = {
    propertyId: uniqueId || "",
    title: "",
    gallery: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    gallery: Yup.array()
      .min(1, "You must select at least one image.")
      .required("Image selection is required."),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (uniqueId) {
        formData.append("propertyId", uniqueId);
      }
      formData.append("title", values.title);
      values.gallery.forEach((image) => {
        formData.append("gallery", image);
      });

      const response = await API.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
      getGallery();
      formik.resetForm();
      setImages([]);
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.error || "An error occurred!");
      } else {
        toast.error(error);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filePreviews = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setImages((prev) => [...prev, ...filePreviews]);
      formik.setFieldValue("gallery", [
        ...formik.values.gallery,
        ...acceptedFiles,
      ]);
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
  });

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    const updatedGallery = formik.values.gallery.filter((_, i) => i !== index);
    formik.setFieldValue("gallery", updatedGallery);

    // Manually trigger validation
    formik.setTouched({ gallery: true });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4"
      encType="multipart/form-data"
    >
      <div className="mb-3 col-md-4 p-0">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter a Title for Gallery"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="form-control"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger mt-1">{formik.errors.title}</div>
        ) : null}
      </div>

      <div
        {...getRootProps({
          className: "border border-dashed p-5 rounded-3 text-center",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <div className="row mt-4 px-4">
        {images.map((file, index) => (
          <div key={index} className="col-md-3 p-2 mx-1 position-relative">
            <img
              src={file.preview}
              alt="Preview"
              className="img-fluid"
              style={{ aspectRatio: "2/2", objectFit: "cover",width:"100%",height:"100%" }}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => {
                removeImage(index);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {formik.touched.gallery && formik.errors.gallery ? (
        <div className="text-danger mt-2">{formik.errors.gallery}</div>
      ) : null}

      <button type="submit" className="mt-3 btn btn-primary">
        Add
      </button>
    </form>
  );
}

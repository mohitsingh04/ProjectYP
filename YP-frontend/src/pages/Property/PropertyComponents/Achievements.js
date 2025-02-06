import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";

export default function Achievements() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [images, setImages] = useState([]);
  const { uniqueId } = useParams();
  const [property, setProperty] = useState("");
  const [oldAchievements, setOldAchievements] = useState([]);

  const getProperty = useCallback(async () => {
    const response = await API.get(`/property/${uniqueId}`);
    setProperty(response.data);
  }, [uniqueId]);

  const getAchievements = useCallback(async () => {
    const response = await API.get(`/achievements/${uniqueId}`);
    setOldAchievements(response.data.achievements);
  }, [uniqueId]);

  useEffect(() => {
    getAchievements();
  }, [getAchievements]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const onDrop = useCallback((acceptedFiles) => {
    const filePreviews = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => [...prev, ...filePreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
  });

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const removeOldImage = (index) => {
    setOldAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAchievements = async () => {
    try {
      const formData = new FormData();
      formData.append("property_id", property.uniqueId);
      if (images.length > 0) {
        images.forEach((item) => {
          formData.append("achievements", item);
        });
      }

      if (oldAchievements.length > 0) {
        oldAchievements.forEach((item) => {
          formData.append("oldAchievements", item);
        });
      } else if (oldAchievements === 0) {
        formData("oldAchievements", "");
      }

      const response = await API.post(`/achievements`, formData);
      toast.success(response.data.message);
      getAchievements();
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="tab-pane profiletab show">
        <div id="achievements-log-switch">
          {isUpdating ? (
            <Card>
              <Card.Header>
                <h5>
                  <strong>Achievements</strong>
                </h5>
                <div className="ms-auto">
                  <button onClick={() => setIsUpdating(false)}>
                    <i className="fe fe-x"></i>
                  </button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col">
                    <div
                      {...getRootProps({
                        className:
                          "border border-dashed p-5 rounded-3 text-center",
                      })}
                    >
                      <input {...getInputProps()} />
                      <p>
                        {isDragActive
                          ? "Drop the files here ..."
                          : "Drag 'n' drop some files here, or click to select files"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  {oldAchievements.length > 0 &&
                    oldAchievements.map((item, index) => (
                      <div
                        key={index}
                        className="col-md-3 p-0 px-2 position-relative"
                      >
                        <img
                          src={item.preview || `http://localhost:5000/${item}`}
                          alt={item.preview}
                          className="img-fluid"
                          style={{ aspectRatio: "2/2", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          onClick={() => removeOldImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  {images.length > 0 &&
                    images.map((item, index) => (
                      <div
                        key={index}
                        className="col-md-3 p-0 px-2 position-relative"
                      >
                        <img
                          src={item.preview || `http://localhost:5000/${item}`}
                          alt={item.preview}
                          className="img-fluid"
                          style={{ aspectRatio: "2/2", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <div>
                    <button
                      onClick={handleAchievements}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                <h5>
                  <strong>Achievements</strong>
                </h5>
                <div className="ms-auto">
                  <button onClick={() => setIsUpdating(true)}>
                    <i className="fe fe-edit"></i>
                  </button>
                </div>
              </Card.Header>
              <Card.Body className="bg-white">
                <div className="row mt-4">
                  {oldAchievements.length > 0
                    ? oldAchievements.map((item, index) => (
                        <div className="col-md-3 p-1" key={index}>
                          <img
                            src={`http://localhost:5000/${item}`}
                            style={{ aspectRatio: "2/2", objectFit: "cover" }}
                            alt={item}
                          />
                        </div>
                      ))
                    : <p>There are No Achievements</p>}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

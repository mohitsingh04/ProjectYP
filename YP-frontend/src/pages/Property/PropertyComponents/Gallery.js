import React, { useEffect, Fragment, useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import AddGallery from "./GalleryComponents/AddGalleryComponents";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import EditGallery from "./GalleryComponents/EditGallery";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [toggleGalleryPage, setToggleGalleryPage] = useState(true);
  const { uniqueId } = useParams();
  const [gallery, setGallery] = useState([]);
  const [galleryUniqueId, setGalleryUniqueId] = useState("");

  const fetchGallery = useCallback(async () => {
    try {
      const response = await API.get("/gallery");
      const filteredGallery = response.data.filter(
        (gallery) => gallery.propertyId === Number(uniqueId)
      );
      setGallery(filteredGallery);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  }, [uniqueId]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleShowGalleryPage = () => {
    setToggleGalleryPage(true);
  };

  const handleEditGallery = (id) => {
    setToggleGalleryPage(false);
    setGalleryUniqueId(id);
  };

  const handleDeleteGallery = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteResponse = await API.delete(`/gallery/${id}`);
          toast.success(deleteResponse.data.message);
          fetchGallery();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {toggleGalleryPage ? (
        <>
          {gallery.length > 0 ? (
            <>
              {gallery.map((item, index) => (
                <Card key={index}>
                  <Card.Header>
                    <div>
                      <h5>
                        <strong>{item.title}</strong>
                      </h5>
                    </div>
                    <div className="ms-auto">
                      <button onClick={() => handleEditGallery(item.uniqueId)}>
                        <i className="fe fe-edit"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteGallery(item.uniqueId)}
                      >
                        <i className="fe fe-trash-2"></i>
                      </button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-4 img-gallery">
                      {item?.gallery.map((items, index) => (
                        <Col
                          key={index}
                          lg={3}
                          md={3}
                          sm={6}
                          className="col-12"
                        >
                          <Link
                            to="#"
                            onClick={() => setOpen(true)}
                            className="glightbox card"
                          >
                            <img
                              src={`http://localhost:5000/${items}`}
                              alt={items + 1}
                              style={{ aspectRatio: "2/2", objectFit: "cover" }}
                            />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card>
                <Card.Body>
                  <p>No Gallery Found.</p>
                </Card.Body>
              </Card>
            </>
          )}
        </>
      ) : (
        <>
          <Card>
            <Card.Header>
              <div className="media-heading">
                <h5>
                  {gallery.length > 0 ? (
                    toggleGalleryPage ? (
                      <strong>Gallery</strong>
                    ) : (
                      <strong>Edit Gallery</strong>
                    )
                  ) : (
                    <strong>Gallery</strong>
                  )}
                </h5>
              </div>
              <div className="ms-auto">
                {gallery.length > 0 ? (
                  toggleGalleryPage ? null : (
                    <button onClick={handleShowGalleryPage}>
                      <i className="fe fe-x"></i>
                    </button>
                  )
                ) : null}
              </div>
            </Card.Header>
            <Card.Body>
              <EditGallery
                gallleryId={galleryUniqueId}
                getGallery={fetchGallery}
                setToggleGalleryPage={setToggleGalleryPage}
              />
            </Card.Body>
          </Card>
        </>
      )}

      {toggleGalleryPage ? (
        <>
          <Card>
            <Card.Header>
              <div className="media-heading">
                <h5>
                  <strong>Add Gallery</strong>
                </h5>
              </div>
            </Card.Header>
            <Card.Body>
              <AddGallery getGallery={fetchGallery} />
            </Card.Body>
          </Card>
        </>
      ) : null}
    </Fragment>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import AddHostel from "./AddHostel";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/API";
import { Button, Card, Col, Row } from "react-bootstrap";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import EditHostel from "./EditHostel";
import AddHostelImages from "./AddHostelImages";
import RemoveHostelImages from "./RemoveHostelImages";

export default function Hostel() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [authuser, setAuthUser] = useState("");
  const [hostel, setHostel] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [isUpdating, setIsUpdating] = useState("");
  const [addingImages, setAddingImages] = useState();
  const [removing, setRemoving] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);

  const getProperty = useCallback(async () => {
    try {
      const response = await API.get(`/property/${objectId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const getAuthUser = useCallback(async () => {
    try {
      const response = await API.get("/profile");
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  const getHostel = useCallback(async () => {
    try {
      if (property) {
        const response = await API.get(`/hostel/${property?.uniqueId}`);
        setHostel(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  useEffect(() => {
    getHostel();
  }, [getHostel]);

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getTruncatedHTML = (html, isExpanded) => {
    const plainText = html.replace(/<[^>]+>/g, "");
    const words = plainText.split(" ");

    if (words.length <= 300 || isExpanded) {
      return html;
    }

    const truncatedText = words.slice(0, 300).join(" ") + "...";
    return `<p>${truncatedText}</p>`;
  };

  return (
    <div>
      {hostel?.length > 0 ? (
        !isUpdating ? (
          !removing ? (
            !addingImages ? (
              hostel.map((item, index) => {
                const isExpanded = expandedDescriptions[index] || false;
                const wordCount = item?.hostel_description
                  ?.replace(/<[^>]+>/g, "")
                  .split(" ").length;

                const webpImages =
                  item?.hostel_images?.filter((img) => img.endsWith(".webp")) ||
                  [];

                return (
                  <Row key={index} className="mb-4">
                    <Col>
                      <Card>
                        <Card.Header className="d-flex justify-content-between">
                          <Card.Title>{item.hostel_name}</Card.Title>
                          <div>
                            <Button
                              size="sm"
                              onClick={() => setAddingImages(item)}
                            >
                              Add Images
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              className="ms-1"
                              onClick={() => setRemoving(item)}
                            >
                              Remove Images
                            </Button>
                            <Button
                              size="sm"
                              variant="success"
                              className="ms-1"
                              onClick={() => setIsUpdating(item)}
                            >
                              Edit Hostel
                            </Button>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            {item?.hostel_price?.map((cur, i) => (
                              <Col key={i}>
                                <Button variant="outline-light">{cur}</Button>
                              </Col>
                            ))}
                          </Row>

                          <Row className="my-4">
                            <Col md={12}>
                              <div
                                className="px-2"
                                dangerouslySetInnerHTML={{
                                  __html: getTruncatedHTML(
                                    item.hostel_description,
                                    isExpanded
                                  ),
                                }}
                              />
                              {wordCount > 300 && (
                                <Button
                                  variant="link"
                                  className="p-0"
                                  onClick={() => toggleDescription(index)}
                                >
                                  {isExpanded ? "Show Less" : "Show More"}
                                </Button>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>

                        {item.hostel_images.length > 0 && (
                          <Card.Footer>
                            {webpImages.length > 0 ? (
                              <>
                                <Row>
                                  {webpImages.map((img, i) => (
                                    <Col
                                      key={i}
                                      xs={6}
                                      md={3}
                                      className="mb-2 position-relative"
                                    >
                                      <img
                                        src={`${
                                          import.meta.env.VITE_MEDIA_URL
                                        }/${img}`}
                                        alt={`Hostel Image ${i + 1}`}
                                        className="w-100 rounded profile-ratio"
                                        onClick={() => {
                                          setLightboxImages(
                                            webpImages.map((src) => ({
                                              src: `${
                                                import.meta.env.VITE_MEDIA_URL
                                              }/${src}`,
                                            }))
                                          );
                                          setLightboxIndex(i);
                                        }}
                                      />
                                    </Col>
                                  ))}
                                </Row>

                                <Lightbox
                                  open={lightboxIndex !== null}
                                  close={() => setLightboxIndex(null)}
                                  index={lightboxIndex}
                                  slides={lightboxImages}
                                  plugins={[
                                    Fullscreen,
                                    Slideshow,
                                    Thumbnails,
                                    Zoom,
                                  ]}
                                />
                              </>
                            ) : (
                              <p className="text-muted">
                                No WebP images found for this hostel.
                              </p>
                            )}
                          </Card.Footer>
                        )}
                      </Card>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <AddHostelImages
                setAddingImages={setAddingImages}
                hostel={addingImages}
                getHostelData={getHostel}
              />
            )
          ) : (
            <RemoveHostelImages
              hostel={removing}
              getHostelData={getHostel}
              setRemoving={setRemoving}
            />
          )
        ) : (
          <EditHostel
            hostel={isUpdating}
            getHostel={getHostel}
            setIsUpdating={setIsUpdating}
          />
        )
      ) : (
        <AddHostel
          property={property}
          authUser={authuser}
          getHostel={getHostel}
        />
      )}
    </div>
  );
}

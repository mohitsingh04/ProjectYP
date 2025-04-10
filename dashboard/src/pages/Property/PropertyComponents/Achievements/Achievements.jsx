import React, { useCallback, useEffect, useState } from "react";
import AddAchievements from "./AddAchievements";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/API";
import { Button, Card, Col, Row } from "react-bootstrap";

import Lightbox from "yet-another-react-lightbox";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import AddNewAchievements from "./AddNewAchievements";
import RemoveAchievements from "./RemoveAchievements";

export default function Achievements() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [achievements, setAchievement] = useState("");
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [addingMore, setAddingMore] = useState(false);
  const [removing, setRemoving] = useState(false);

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

  const getAchievements = useCallback(async () => {
    try {
      if (property) {
        const response = await API.get(`/achievements/${property?.uniqueId}`);
        setAchievement(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  useEffect(() => {
    getAchievements();
  }, [getAchievements]);

  const getAuthUser = async () => {
    try {
      const response = await API.get(`/profile`);
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  const filteredImages =
    achievements?.achievements?.filter((img) =>
      img.toLowerCase().endsWith(".webp")
    ) || [];

  const slides = filteredImages.map((img) => ({
    src: `${import.meta.env.VITE_MEDIA_URL}${img}`,
  }));

  return (
    <div>
      {achievements ? (
        !addingMore ? (
          !removing ? (
            <Row>
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <Card.Title className="mb-0">View Achievements</Card.Title>
                    <div>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => setAddingMore(true)}
                      >
                        <i className="ri-trophy-line me-1"></i>Add Achievement
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="ms-1"
                        onClick={() => setRemoving(true)}
                      >
                        <i className="fe fe-award me-1"></i>Remove Achievement
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      {filteredImages.map((achievement, index) => (
                        <Col key={index} md={3} sm={6} xs={12}>
                          <img
                            src={`${
                              import.meta.env.VITE_MEDIA_URL
                            }${achievement}`}
                            className="img-fluid profile-ratio w-100 rounded"
                            alt={`achievement-${index}`}
                            onClick={() => {
                              setLightboxIndex(index);
                              setOpenLightbox(true);
                            }}
                          />
                        </Col>
                      ))}
                    </Row>

                    <Lightbox
                      open={openLightbox}
                      close={() => setOpenLightbox(false)}
                      index={lightboxIndex}
                      slides={slides}
                      plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                      zoom={{ maxZoomPixelRatio: 10, scrollToZoom: true }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <RemoveAchievements
              achievements={achievements}
              getAchievements={getAchievements}
              property={property}
              setRemoving={setRemoving}
            />
          )
        ) : (
          <AddNewAchievements
            property={property}
            setAddingMore={setAddingMore}
            getAchievements={getAchievements}
          />
        )
      ) : (
        <AddAchievements
          property={property}
          authUser={authUser}
          getAchievements={getAchievements}
        />
      )}
    </div>
  );
}

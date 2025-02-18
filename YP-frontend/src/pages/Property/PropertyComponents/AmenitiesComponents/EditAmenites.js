import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/Api";

const amenitiesData = {
  Mandatory: ["Air Conditioning", "Laundry", "Newspaper", "Parking"],
  "Basic Facilities": ["WiFi", "Power Backup", "Elevator"],
  "General Services": ["Room Service", "Security", "Concierge"],
  "Outdoor Activities and Sports": ["Swimming Pool", "Gym", "Tennis Court"],
  "Common Area": ["Lounge", "Terrace", "Garden"],
  "Food and Drink": ["Restaurant", "Cafe"],
};

export default function EditAmenities() {
  const { uniqueId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Mandatory");
  const [parkingType, setParkingType] = useState("");
  const [wifiType, setWifiType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amenitiesListData, setAmenitiesListData] = useState([]);

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        const response = await API.get(`/amenities`);
        const filteredAmenities = response.data.filter(
          (amenities) => amenities.propertyId === Number(uniqueId)
        );

        setAmenitiesListData(filteredAmenities);

        if (filteredAmenities.length > 0) {
          const fetchedAmenities =
            filteredAmenities[0]?.selectedAmenities || {};

          // Set default values in amenities state
          if (fetchedAmenities) {
            setAmenities(() => {
              return Object.fromEntries(
                Object.entries(amenitiesData).map(([category, items]) => [
                  category,
                  Object.fromEntries(
                    items.map((amenity) => [
                      amenity,
                      fetchedAmenities[0][category]?.some((item) =>
                        typeof item === "object"
                          ? item[amenity] !== undefined
                          : item === amenity
                      ) || false,
                    ])
                  ),
                ])
              );
            });
          }

          filteredAmenities[0]?.selectedAmenities[0].Mandatory.forEach(
            (item) => {
              Object.entries(item).forEach(([key, value]) => {
                if (key === "Parking") {
                  setParkingType(value);
                }
              });
            }
          );

          filteredAmenities[0]?.selectedAmenities[0][
            "Basic Facilities"
          ]?.forEach((item) => {
            Object.entries(item).forEach(([key, value]) => {
              if (key === "WiFi") {
                setWifiType(value);
              }
            });
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAmenitiesData();
  }, [uniqueId]);

  const [amenities, setAmenities] = useState(() =>
    Object.fromEntries(
      Object.entries(amenitiesData).map(([category, items]) => [
        category,
        Object.fromEntries(items.map((amenity) => [amenity, null])),
      ])
    )
  );

  const handleSelection = (category, amenity, value) => {
    setAmenities((prev) => ({
      ...prev,
      [category]: { ...prev[category], [amenity]: value },
    }));

    if (amenity === "Parking" && !value) {
      setParkingType("");
    }
    if (amenity === "WiFi" && !value) {
      setWifiType("");
    }
  };

  const formatAmenitiesForSubmission = () => {
    const formattedAmenities = {};

    Object.entries(amenities).forEach(([category, amenityList]) => {
      const selected = Object.entries(amenityList)
        .filter(([_, value]) => value === true)
        .map(([amenity]) => {
          if (amenity === "WiFi" && wifiType) {
            return { [amenity]: wifiType };
          } else if (amenity === "Parking" && parkingType) {
            return { [amenity]: parkingType };
          }
          return { [amenity]: true };
        });

      if (selected.length > 0) {
        formattedAmenities[category] = selected;
      }
    });

    return [formattedAmenities];
  };

  const formik = useFormik({
    initialValues: {
      propertyId: uniqueId || "",
    },
    onSubmit: async (values) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        const payload = {
          propertyId: values.propertyId,
          selectedAmenities: formatAmenitiesForSubmission(),
        };

        const response = await API.put(
          `/amenities/${amenitiesListData[0]?.uniqueId}`,
          payload
        );

        if (response.status === 200) {
          toast.success("Amenities added successfully!");
          window.location.reload();
        }
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error(error.response.data.error || "Bad Request");
          } else if (status === 404) {
            toast.error("Resource not found");
          } else {
            toast.error("An error occurred while saving amenities");
          }
        } else {
          toast.error("Network error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const renderAmenityItem = (category, amenity) => {
    const isSelected = amenities[category][amenity];

    return (
      <div key={amenity}>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="text-muted">{amenity}</span>
          <div className="d-flex gap-3">
            <button
              type="button"
              onClick={() => handleSelection(category, amenity, false)}
              className={`px-4 py-2 ${
                isSelected === false
                  ? "bg-danger text-white"
                  : "border border-dark"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handleSelection(category, amenity, true)}
              className={`px-4 py-2 ${
                isSelected === true
                  ? "bg-success text-white"
                  : "border border-dark"
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* Show Parking Type selection within Mandatory section */}
        {category === "Mandatory" && amenity === "Parking" && isSelected && (
          <div className="mt-2">
            <select
              onChange={(e) => setParkingType(e.target.value)}
              className="w-100 p-2 border border-dark"
              value={parkingType}
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Valet">Valet</option>
            </select>
          </div>
        )}

        {/* Show WiFi Type selection within Basic Facilities section */}
        {category === "Basic Facilities" &&
          amenity === "WiFi" &&
          isSelected && (
            <div className="ms-5 mt-2">
              <select
                value={wifiType}
                onChange={(e) => setWifiType(e.target.value)}
                className="w-100 p-2 border border-dark"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          )}
      </div>
    );
  };

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} className="mx-auto p-4">
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold mb-4">
                Property Amenities
              </Form.Label>
              <div className="d-flex w-100 bg-white shadow overflow-hidden">
                {/* Sidebar */}
                <Container>
                  <Row>
                    <div className="col-md-4 p-0 align-content-center">
                      {Object.keys(amenitiesData).map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`block w-100 text-left p-4 transition-colors ${
                            selectedCategory === category
                              ? "btn-primary"
                              : "text-muted"
                          }`}
                        >
                          {category} ({amenitiesData[category].length})
                        </button>
                      ))}
                    </div>

                    {/* Amenities Selection */}
                    <div className="col-md-8 align-content-center">
                      <h2 className="fw-semibold mb-4">{selectedCategory}</h2>
                      <div>
                        {amenitiesData[selectedCategory].map((amenity) =>
                          renderAmenityItem(selectedCategory, amenity)
                        )}
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-6 d-flex justify-content-end">
          <Button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Saving..." : "Save Amenities"}
          </Button>
        </div>
      </Form>
    </Fragment>
  );
}

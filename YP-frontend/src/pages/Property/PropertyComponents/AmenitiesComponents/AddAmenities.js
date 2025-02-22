import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
import { API } from "../../../../context/Api";
import { useParams } from "react-router-dom";

const amenitiesData = {
  Mandatory: ["Air Conditioning", "Laundry", "Newspaper", "Parking"],
  "Basic Facilities": ["WiFi", "Power Backup", "Elevator"],
  "General Services": ["Room Service", "Security", "Concierge"],
  "Outdoor Activities and Sports": ["Swimming Pool", "Gym", "Tennis Court"],
  "Common Area": ["Lounge", "Terrace", "Garden"],
  "Food and Drink": ["Restaurant", "Cafe"],
};

export default function AddAmenities({ getAmenities }) {
  const { objectId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Mandatory");
  const [parkingType, setParkingType] = useState("");
  const [wifiType, setWifiType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [property, setProperty] = useState("");

  const getProperty = useCallback(async () => {
    const response = await API.get(`/property/${objectId}`);
    setProperty(response.data);
  }, [objectId]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

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

  const initialValues = {
    propertyId: property?.uniqueId,
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        const payload = {
          propertyId: values.propertyId,
          selectedAmenities: formatAmenitiesForSubmission(),
        };

        console.log(values);

        const response = await API.post("/amenities", payload);

        if (response.status === 200) {
          toast.success(response.data.message);
          getAmenities();
          // Reset form or redirect as needed
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
        <div className="d-flex justify-content-between align-items-center py-3 border">
          <span className="text-muted">{amenity}</span>
          <div className="d-flex gap-3">
            <Button
              variant={isSelected === false ? "danger" : "outline-dark"}
              onClick={() => handleSelection(category, amenity, false)}
              className="px-4"
            >
              No
            </Button>
            <Button
              variant={isSelected === true ? "success" : "outline-dark"}
              onClick={() => handleSelection(category, amenity, true)}
              className="px-4"
            >
              Yes
            </Button>
          </div>
        </div>

        {category === "Mandatory" && amenity === "Parking" && isSelected && (
          <Form.Group className="mt-2">
            <Form.Select
              value={parkingType}
              onChange={(e) => setParkingType(e.target.value)}
            >
              <option value="">Select Parking Type</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Valet">Valet</option>
            </Form.Select>
          </Form.Group>
        )}

        {category === "Basic Facilities" &&
          amenity === "WiFi" &&
          isSelected && (
            <Form.Group className="mt-2">
              <Form.Select
                value={wifiType}
                onChange={(e) => setWifiType(e.target.value)}
              >
                <option value="">Select WiFi Type</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </Form.Select>
            </Form.Group>
          )}
      </div>
    );
  };

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit} className="my-4">
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label className="h4 mb-4">Property Amenities</Form.Label>
              <div className="bg-white shadow overflow-hidden">
                <Row className="g-0">
                  <Col md={4} className="border-end">
                    <div className="list-group list-group-flush">
                      {Object.keys(amenitiesData).map((category) => (
                        <Button
                          key={category}
                          variant="link"
                          className={`list-group-item list-group-item-action text-start ${
                            selectedCategory === category ? "active" : ""
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category} ({amenitiesData[category].length})
                        </Button>
                      ))}
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="p-4">
                      <h2 className="h4 mb-4">{selectedCategory}</h2>
                      <div className="d-flex flex-column gap-3">
                        {amenitiesData[selectedCategory].map((amenity) =>
                          renderAmenityItem(selectedCategory, amenity)
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="px-4"
          >
            {isSubmitting ? "Saving..." : "Save Amenities"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

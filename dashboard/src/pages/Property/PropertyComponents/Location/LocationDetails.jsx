import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Property_Address from "./LocationComponent/Property_Address";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/API";
import PropertyPincode from "./LocationComponent/Property_pincode";
import PropertyCountry from "./LocationComponent/PropertyCountry";
import PropertyState from "./LocationComponent/Property_states";
import PropertyCity from "./LocationComponent/Property_city";

export default function LocationDetails() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [location, setLocation] = useState("");

  const getProperty = useCallback(async () => {
    try {
      const response = await API.get(`/property/${objectId}`);
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [objectId]);

  const getLocation = useCallback(async () => {
    try {
      const response = await API.get(
        `/property/location/${property?.uniqueId}`
      );
      setLocation(response.data);
      setSelectedCountry(response.data.property_country);
      setSelectedState(response.data.property_state);
    } catch (error) {
      console.log(error);
    }
  }, [property]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Property_Address
                    property={property}
                    location={location}
                    getProperty={getProperty}
                  />
                </Col>
                <Col md={6}>
                  <PropertyPincode
                    property={property}
                    location={location}
                    getProperty={getProperty}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <PropertyCountry
                    property={property}
                    location={location}
                    getProperty={getProperty}
                    setSelectedCountry={setSelectedCountry}
                  />
                </Col>
                <Col md={4}>
                  <PropertyState
                    property={property}
                    location={location}
                    getProperty={getProperty}
                    selectedCountry={selectedCountry}
                    setSelectedState={setSelectedState}
                  />
                </Col>
                <Col md={4}>
                  <PropertyCity
                    property={property}
                    location={location}
                    getProperty={getProperty}
                    selectedState={selectedState}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

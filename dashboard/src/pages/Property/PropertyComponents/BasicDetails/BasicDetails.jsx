import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/API";
import BasicValues from "./BasicDetailsComponents/BasicValues";
import Property_Description from "./BasicDetailsComponents/Property_Description";
import AltMobileInput from "./BasicDetailsComponents/AltMobileInput";
import WebsiteInput from "./BasicDetailsComponents/WebsiteInput";
import PropertyLogo from "./BasicDetailsComponents/PropertyLogo";
import FeaturedImage from "./BasicDetailsComponents/FeaturedImage";

export default function BasicDetails() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");

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

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Property Images</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="align-content-center my-2">
                  <PropertyLogo property={property} />
                </Col>
                <Col md={6}>
                  <FeaturedImage property={property} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="m-0">
            <Card.Header>
              <h5 className="mb-0">Basic Details</h5>
            </Card.Header>
            <Card.Body>
              <BasicValues property={property} />
              <Row>
                <Col md={6}>
                  <AltMobileInput
                    objectId={objectId}
                    value={property.property_alt_mobile_no}
                    onUpdated={getProperty}
                  />
                </Col>
                <Col md={6}>
                  <WebsiteInput
                    objectId={objectId}
                    value={property.property_website}
                    onUpdated={getProperty}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Property_Description />
          </Card>
        </Col>
      </Row>
    </>
  );
}

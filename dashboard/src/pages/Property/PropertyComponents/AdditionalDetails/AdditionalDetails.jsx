import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../../../context/API";
import Category from "./AdditionalComponents/Category";
import Property_type from "./AdditionalComponents/Property_type";
import Property_status from "./AdditionalComponents/Property_status";
import EstablishmentYear from "./AdditionalComponents/EstablishmentYear";

export default function AdditionalDetails() {
  const { objectId } = useParams();
  const [property, setProperty] = useState();
  const [authUser, setAuthUser] = useState("");

  const getAuthUsre = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setAuthUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAuthUsre();
  }, [getAuthUsre]);

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
    <div>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Additional Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Category property={property} getProperty={getProperty} />
                </Col>
                <Col md={6} className="mb-3">
                  <Property_type
                    property={property}
                    getProperty={getProperty}
                  />
                </Col>
                {(authUser?.role === "Super Admin" ||
                  authUser?.role === "Editor") && (
                  <Col md={6} className="mb-3">
                    <Property_status
                      property={property}
                      getProperty={getProperty}
                    />
                  </Col>
                )}

                <Col md={6} className="mb-3">
                  <EstablishmentYear
                    property={property}
                    getProperty={getProperty}
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

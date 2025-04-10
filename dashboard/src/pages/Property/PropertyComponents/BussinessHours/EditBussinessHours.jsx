import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { API } from "../../../../context/API";
import Swal from "sweetalert2";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function EditBusinessHours({
  existingHours,
  property,
  setIsExisting,
  onUpdated,
}) {
  const [formState, setFormState] = useState(
    days.reduce((acc, day) => {
      acc[day] = existingHours[day] || { open: "", close: "" };
      return acc;
    }, {})
  );

  const handleTimeChange = (day, time, value) => {
    setFormState((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.patch(
        `/business-hours/${property?.uniqueId}`,
        formState
      );

      Swal.fire({
        title: "Updated",
        text: response.data.message,
        icon: "success",
      });
      onUpdated?.();
      setIsExisting(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <h5 className="mb-0">Edit Working Hours</h5>
        <Button variant="danger" size="sm" onClick={() => setIsExisting(false)}>
          Cancel
        </Button>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {days.map((day) => (
            <Row className="mb-3" key={day}>
              <Form.Label column sm={2} className="text-capitalize">
                {day}
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  value={formState[day].open}
                  onChange={(e) =>
                    handleTimeChange(day, "open", e.target.value)
                  }
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="time"
                  value={formState[day].close}
                  onChange={(e) =>
                    handleTimeChange(day, "close", e.target.value)
                  }
                />
              </Col>
            </Row>
          ))}
          <div className="d-flex justify-content-between align-items-center">
            <Button type="submit" variant="primary">
              Update
            </Button>
            <p className="mb-0 text-muted">
              Note: If no time is selected, that day will be considered Closed.
            </p>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

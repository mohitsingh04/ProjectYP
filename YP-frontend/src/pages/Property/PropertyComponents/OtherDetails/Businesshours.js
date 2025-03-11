import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export default function Businesshours({ property }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [bussinessHours, setBussinessHours] = useState([]);

  const getBussinessHours = useCallback(async () => {
    if (property) {
      const response = await API.get(`/business-hours/${property?.uniqueId}`);
      setBussinessHours(response.data);
    }
  }, [property]);

  useEffect(() => {
    getBussinessHours();
  }, [getBussinessHours]);

  const [formState, setFormState] = useState({
    monday: { open: null, close: null },
    tuesday: { open: null, close: null },
    wednesday: { open: null, close: null },
    thursday: { open: null, close: null },
    friday: { open: null, close: null },
    saturday: { open: null, close: null },
    sunday: { open: null, close: null },
  });

  useEffect(() => {
    if (bussinessHours) {
      setFormState({
        monday: {
          open: bussinessHours.monday?.open || "",
          close: bussinessHours.monday?.close || "",
        },
        tuesday: {
          open: bussinessHours.tuesday?.open || "",
          close: bussinessHours.tuesday?.close || "",
        },
        wednesday: {
          open: bussinessHours.wednesday?.open || "",
          close: bussinessHours.wednesday?.close || "",
        },
        thursday: {
          open: bussinessHours.thursday?.open || "",
          close: bussinessHours.thursday?.close || "",
        },
        friday: {
          open: bussinessHours.friday?.open || "",
          close: bussinessHours.friday?.close || "",
        },
        saturday: {
          open: bussinessHours.saturday?.open || "",
          close: bussinessHours.saturday?.close || "",
        },
        sunday: {
          open: bussinessHours.sunday?.open || "",
          close: bussinessHours.sunday?.close || "",
        },
      });
    }
  }, [bussinessHours]);

  const initialValues = {
    property_name: property.property_name || "",
    property_id: property.uniqueId || "",
  };

  const onSubmit = async (values) => {
    try {
      values = { ...values };
      const data = {
        ...values,
        monday: formState.monday,
        tuesday: formState.tuesday,
        wednesday: formState.wednesday,
        thursday: formState.thursday,
        friday: formState.friday,
        saturday: formState.saturday,
        sunday: formState.sunday,
      };
      API.post(`/business-hours`, data).then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          setIsUpdating(false);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const handleTimeChange = (day, time, value) => {
    setFormState({
      ...formState,
      [day]: { ...formState[day], [time]: value },
    });
  };

  const formatTime = (time) => {
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr || "00";
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };
  return (
    <Card>
      <Card.Header>
        <div>
          <h5>
            <strong>Business Hours</strong>
          </h5>
        </div>
        <div className="ms-auto">
          <button onClick={() => setIsUpdating(!isUpdating)}>
            <i className={`fe fe-${isUpdating ? "x" : "edit"}`}></i>
          </button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={12} className="mt-3">
            {isUpdating ? (
              <form onSubmit={handleSubmit}>
                {Object.entries(formState).map(([day, times]) => (
                  <div key={day}>
                    <div className="mb-1 row">
                      <div className="col-md-2">
                        <label>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                      </div>
                      <div className="col-5">
                        <input
                          type="time"
                          className="form-control"
                          name="businessHours"
                          value={times.open || ""}
                          onChange={(e) =>
                            handleTimeChange(day, "open", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-5">
                        <input
                          type="time"
                          className="form-control"
                          name="businessHours"
                          value={times.close || ""}
                          onChange={(e) =>
                            handleTimeChange(day, "close", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn">
                    <i className="fe fe-check text-primary"></i>
                  </button>
                  <p>
                    Note: If the opening or closing time for a day is not
                    provided, it will be considered as Closed for that day.
                  </p>
                </div>
              </form>
            ) : bussinessHours && Object.keys(bussinessHours).length > 0 ? (
              <div className="p-0">
                <Table responsive borderless className="text-center">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Opening Time</th>
                      <th>Closing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bussinessHours)
                      .filter(([key]) =>
                        [
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                          "sunday",
                        ].includes(key)
                      )
                      .map(([day, time]) => (
                        <tr key={day}>
                          <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                          {time.open && time.close ? (
                            <>
                              <td>{formatTime(time?.open)}</td>
                              <td>{formatTime(time?.close)}</td>
                            </>
                          ) : (
                            <>
                              <td>Closed</td>
                              <td>Closed</td>
                            </>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p>No business hours available.</p>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

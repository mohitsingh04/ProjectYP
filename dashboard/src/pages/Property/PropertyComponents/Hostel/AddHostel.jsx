import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import JoditEditor from "jodit-react";
import { API } from "../../../../context/API";
import Swal from "sweetalert2";
import { hostelValidation } from "../../../../context/ValidationSchemas";

export default function AddHostel({ property, authUser, getHostel }) {
  const [prices, setPrices] = useState([]);
  const [currency, setCurrency] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const formik = useFormik({
    initialValues: {
      userId: authUser?.uniqueId || "",
      property_id: property?.uniqueId || "",
      hostel_name: "Co. Ed.",
      hostel_description: "",
    },
    validationSchema: hostelValidation,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const finalData = {
        ...values,
        hostel_price: prices,
      };

      try {
        const response = await API.post(`/hostel`, finalData);

        Swal.fire({
          icon: "success",
          title: "Hostel Added",
          text:
            response.data.message || "The hostel has been added successfully!",
          timer: 2000,
        });

        resetForm();
        setPrices([]);
        getHostel();
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Oops!",
          text:
            error.response.data.error ||
            "Something went wrong while adding the hostel.",
        });
      }
    },
  });

  const addPrice = () => {
    if (currency && priceInput) {
      const formatted = `${currency} ${priceInput}`;
      setPrices([...prices, formatted]);
      setPriceInput("");
      setCurrency("");
    }
  };

  const removePrice = (index) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title>Add Hostel</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                {/* Hostel Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Hostel Name</Form.Label>
                  <Form.Select
                    disabled
                    name="hostel_name"
                    onChange={formik.handleChange}
                    value={formik.values.hostel_name}
                    isInvalid={!!formik.errors.hostel_name}
                  >
                    <option value="">Select Hostel</option>
                    <option value="Co. Ed.">Co. Ed.</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.hostel_name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Hostel Price */}
                <Form.Label>Hostel Price</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    style={{ maxWidth: "200px" }}
                  >
                    <option value="">--select currency--</option>
                    <option value="INR">INR</option>
                    <option value="DOLLAR">DOLLAR</option>
                    <option value="EURO">EURO</option>
                  </Form.Select>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                  />
                  <Button variant="primary" onClick={addPrice}>
                    Add
                  </Button>
                </InputGroup>

                {/* Price List View */}
                {prices.length > 0 && (
                  <ListGroup className="mb-3">
                    {prices.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {item}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removePrice(index)}
                          className="p-1"
                        >
                          <i className="fe fe-x"></i>
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

                {/* Hostel Description */}
                <Form.Group className="mb-3">
                  <Form.Label>Hostel Description</Form.Label>
                  <JoditEditor
                    value={formik.values.hostel_description}
                    onBlur={() =>
                      formik.setFieldTouched("hostel_description", true)
                    }
                    onChange={(newContent) =>
                      formik.setFieldValue("hostel_description", newContent)
                    }
                  />
                  {formik.touched.hostel_description &&
                    formik.errors.hostel_description && (
                      <div className="text-danger mt-1">
                        {formik.errors.hostel_description}
                      </div>
                    )}
                </Form.Group>

                {/* Submit */}
                <Button type="submit" variant="success">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { API } from "../../../../../context/API";
import { stateValidation } from "../../../../../context/ValidationSchemas";

export default function PropertyState({
  property,
  getProperty,
  location,
  selectedCountry,
  setSelectedState,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allStates, setAllStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  const getStates = async () => {
    try {
      const response = await API.get(`/states`);
      setAllStates(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch states.", "error");
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    const newFiltered = allStates.filter(
      (item) => item.country_name === selectedCountry
    );
    setFilteredStates(newFiltered);
  }, [selectedCountry, allStates]);

  const formik = useFormik({
    initialValues: {
      property_state: location?.property_state || "",
    },
    validationSchema: stateValidation,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (values.property_state === location?.property_state) {
        Swal.fire("No Change", "Selected state is already set.", "info");
        setIsUpdating(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await API.patch(
          `/property/location/${property.uniqueId}`,
          {
            property_state: values.property_state,
          }
        );

        if (response?.status === 200) {
          Swal.fire("Updated!", "State updated successfully.", "success");
          setIsUpdating(false);
        } else {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      } catch (error) {
        const errorMsg =
          error?.response?.data?.message || "Failed to update state.";
        Swal.fire("Error", errorMsg, "error");
      } finally {
        setIsLoading(false);
        getProperty();
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setIsUpdating(false);
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>State</Form.Label>

        {!isUpdating ? (
          <div className="input-group">
            <Form.Control
              value={location?.property_state || "N/A"}
              disabled
              readOnly
            />
            <Button onClick={() => setIsUpdating(true)}>
              <i className="fe fe-edit"></i>
            </Button>
          </div>
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              <Form.Select
                name="property_state"
                value={formik.values.property_state}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedState(e.target.value);
                }}
                isInvalid={formik.errors.property_state}
              >
                <option value="">
                  {filteredStates.length > 0
                    ? "Select State"
                    : "No states available"}
                </option>
                {filteredStates.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>

              <Button variant="success" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <i className="fe fe-check-circle"></i>
                )}
              </Button>

              <Button variant="danger" onClick={handleCancel}>
                <i className="fe fe-x"></i>
              </Button>
            </div>

            {formik.errors.property_state && (
              <Form.Text className="text-danger">
                {formik.errors.property_state}
              </Form.Text>
            )}
          </Form>
        )}
      </Form.Group>
    </div>
  );
}

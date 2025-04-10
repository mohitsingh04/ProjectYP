import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { API } from "../../../../../context/API";
import { countryValidation } from "../../../../../context/ValidationSchemas";

export default function PropertyCountry({
  property,
  getProperty,
  location,
  setSelectedCountry,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await API.get(`/countries`);
      const data = response.data;
      setCountries(data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch countries.", "error");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const formik = useFormik({
    initialValues: {
      property_country: location?.property_country || "",
    },
    validationSchema: countryValidation,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await API.patch(
          `/property/location/${property?.uniqueId}`,
          {
            property_country: values.property_country,
          }
        );

        if (response?.status === 200) {
          Swal.fire("Updated!", "Country updated successfully.", "success");
          setIsUpdating(false);
        } else {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      } catch (error) {
        const errorMsg =
          error?.response?.data?.message || "Failed to update country.";
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
        <Form.Label>Country</Form.Label>

        {!isUpdating ? (
          <div className="input-group">
            <Form.Control
              value={location?.property_country || "N/A"}
              disabled
            />
            <Button onClick={() => setIsUpdating(true)}>
              <i className="fe fe-edit"></i>
            </Button>
          </div>
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              <Form.Select
                name="property_country"
                value={formik.values.property_country}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedCountry(e.target.value);
                }}
                isInvalid={
                  formik.touched.property_country &&
                  !!formik.errors.property_country
                }
              >
                <option value="">Select Country</option>
                {countries.map((item) => (
                  <option key={item._id} value={item.country_name}>
                    {item.country_name}
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

            {formik.errors.property_country && (
              <Form.Text className="text-danger">
                {formik.errors.property_country}
              </Form.Text>
            )}
          </Form>
        )}
      </Form.Group>
    </div>
  );
}

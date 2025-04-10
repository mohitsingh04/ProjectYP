import React from "react";
import { Button, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { API } from "../../../../../context/API";

const AltMobileInput = ({ objectId, value, onUpdated }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      property_alt_mobile_no: value || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await API.patch(`/property/${objectId}`, values);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Updated successfully",
        }).then(() => {
          setIsEditing(false);
          onUpdated();
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.error || "Update failed",
        });
      }
    },
  });

  return (
    <Form.Group>
      <Form.Label className="fw-bold">Alt Contact</Form.Label>
      <div className="input-group">
        {isEditing ? (
          <Form onSubmit={formik.handleSubmit}>
            <div className="d-flex">
              <PhoneInput
                country="in"
                value={formik.values.property_alt_mobile_no}
                onChange={(mobile) =>
                  formik.setFieldValue("property_alt_mobile_no", mobile)
                }
                inputClass="input100 w-100 border rounded-end-0"
                inputStyle={{ height: "45px" }}
                buttonClass="bg-white border"
              />
              <Button
                className="rounded-start-0"
                variant="success"
                onClick={formik.handleSubmit}
              >
                <i className="fe fe-check-circle"></i>
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <Form.Control type="text" value={value || "N/A"} disabled />
            <Button onClick={() => setIsEditing(true)}>
              <i className="fe fe-edit"></i>
            </Button>
          </>
        )}
      </div>
    </Form.Group>
  );
};

export default AltMobileInput;

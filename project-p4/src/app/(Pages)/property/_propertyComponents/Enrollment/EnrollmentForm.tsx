"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import API from "@/service/API/API";

interface Property {
  property_name?: string;
}

interface EnrollmentFormProps {
  property?: Property | null;
}

export default function EnrollmentForm({ property }: EnrollmentFormProps) {
  const { uniqueId } = useParams();
  const formik = useFormik({
    initialValues: {
      property_id: uniqueId || "",
      property_name: property?.property_name || "",
      name: "",
      email: "",
      contact: "",
      people: "",
      date: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Full Name must be at least 3 characters")
        .required("Full Name is required"),
      city: Yup.string()
        .min(3, "City must be at least 3 characters")
        .required("City is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
        .required("Contact number is required"),
      people: Yup.number()
        .min(1, "At least 1 person required")
        .required("Number of people is required"),
      date: Yup.date()
        .min(
          new Date(new Date().setDate(new Date().getDate())),
          "Date must be in the future"
        )
        .required("Preferred date is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await API.post("/add/enquiry", values);
        toast.success(response.data.message);
        formik.resetForm();
      } catch (error) {
        toast.error((error as any).response.data.error);
      }
    },
    enableReinitialize: true,
  });

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Enrollment Form</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                placeholder="Enter your full name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="invalid-feedback">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Contact</label>
              <input
                type="tel"
                className={`form-control ${
                  formik.touched.contact && formik.errors.contact
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your contact number"
                {...formik.getFieldProps("contact")}
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div className="invalid-feedback">{formik.errors.contact}</div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label className="form-label">No. of People</label>
              <input
                type="number"
                className={`form-control ${
                  formik.touched.people && formik.errors.people
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter number of people"
                {...formik.getFieldProps("people")}
              />
              {formik.touched.people && formik.errors.people ? (
                <div className="invalid-feedback">{formik.errors.people}</div>
              ) : null}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Preferred Date</label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.date && formik.errors.date ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("date")}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="invalid-feedback">{formik.errors.date}</div>
              ) : null}
            </div>
            {formik.touched.date && formik.errors.date ? (
              <div className="invalid-feedback">{formik.errors.date}</div>
            ) : null}
            <div className="col-md-6">
              <label className="form-label">Preferred Date</label>
              <input
                type="text"
                placeholder="Enter City"
                className={`form-control ${
                  formik.touched.city && formik.errors.city ? "is-invalid" : ""
                }`}
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="invalid-feedback">{formik.errors.city}</div>
              ) : null}
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

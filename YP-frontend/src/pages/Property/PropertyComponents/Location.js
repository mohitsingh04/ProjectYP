import React, { useCallback, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../../context/Api";

export default function Location() {
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const getProperty = useCallback(() => {
    try {
      API.get(`/property/${objectId}`).then(({ data }) => {
        setProperty(data);
        setSelectedState(data?.property_state);
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, [objectId]);

  const getState = useCallback(async () => {
    API.get("/states").then(({ data }) => {
      const sortedStates = data.sort((a, b) => a.name.localeCompare(b.name));
      setState(sortedStates);
    });
  }, []);

  const getCity = useCallback(async () => {
    const { data } = await API.get("/cities");
    let filteredCities = data;

    if (selectedState) {
      filteredCities = data.filter((item) => item.state_name === selectedState);
    }

    const sortedCities = filteredCities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCity(sortedCities);
  }, [selectedState]);

  const getCountry = useCallback(() => {
    API.get("/countries").then(({ data }) => {
      setCountry(data);
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    getCity();
    getState();
    getCountry();
  }, [getCity, getState, getCountry]);

  const [showAddressInInput, setShowAddressInInput] = useState(false);
  const [showCityInInput, setShowCityInInput] = useState(false);
  const [showStateInInput, setShowStateInInput] = useState(false);
  const [showPincodeInInput, setShowPincodeInInput] = useState(false);
  const [showCountryInInput, setShowCountryInInput] = useState(false);

  const handleEditAddress = () => {
    setShowAddressInInput(true);
  };
  const handleCancelEditAddress = () => {
    setShowAddressInInput(false);
  };
  const handleEditCity = () => {
    setShowCityInInput(true);
  };
  const handleCancelEditCity = () => {
    setShowCityInInput(false);
  };
  const handleEditPincode = () => {
    setShowPincodeInInput(true);
  };
  const handleCancelEditPincode = () => {
    setShowPincodeInInput(false);
  };
  const handleEditState = () => {
    setShowStateInInput(true);
  };
  const handleCancelEditState = () => {
    setShowStateInInput(false);
  };
  const handleEditCountry = () => {
    setShowCountryInInput(true);
  };
  const handleCancelEditCountry = () => {
    setShowCountryInInput(false);
  };

  const initialValues = {
    property_id: property.uniqueId || "",
    property_name: property.property_name || "",
    property_address: property.property_address || "",
    property_pincode: property.property_pincode || "",
    property_city: property.property_city || "",
    property_state: property.property_state || "",
    property_country: property.property_country || "",
  };

  const validationSchema = Yup.object({
    property_pincode: Yup.string().matches(
      /^[0-9]{6}$/,
      "Pincode must be exactly 6 digits."
    ),
  });

  const onSubmit = async (values) => {
    try {
      const response = await API.patch(`/property/${objectId}`, values);
      toast.success(response.data.message);
      getProperty();
      setShowAddressInInput(false);
      setShowCityInInput(false);
      setShowCountryInInput(false);
      setShowPincodeInInput(false);
      setShowStateInInput(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <div className="tab-pane locationtab show">
        <div id="location-log-switch">
          <Card>
            <Card.Header>
              <h5>
                <strong>Location</strong>
              </h5>
            </Card.Header>
            <Card.Body className="bg-white">
              <div className="table-responsive p-1">
                <Table className="table row table-borderless">
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        <strong>Address :</strong>
                        {!property.property_address ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <input
                                type="text"
                                name="property_address"
                                className="form-control"
                                placeholder="Enter Address..."
                                value={formik.values.property_address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_address &&
                                formik.touched.property_address && (
                                  <span className="text-danger">
                                    {formik.errors.property_address}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : showAddressInInput ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <input
                                type="text"
                                name="property_address"
                                className="form-control"
                                placeholder="Enter Address..."
                                value={formik.values.property_address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <span
                                onClick={handleCancelEditAddress}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_address &&
                                formik.touched.property_address && (
                                  <span className="text-danger">
                                    {formik.errors.property_address}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_address}
                              <span
                                onClick={() => handleEditAddress()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>State :</strong>{" "}
                        {!property.property_state ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_state"
                                className="form-control"
                                value={formik.values.property_state}
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  setSelectedState(e.target.value);
                                }}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {state.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_state &&
                                formik.touched.property_state && (
                                  <span className="text-danger">
                                    {formik.errors.property_state}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : showStateInInput ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_state"
                                className="form-control"
                                value={formik.values.property_state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {state.map((item, index) => (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <span
                                onClick={handleCancelEditState}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_state &&
                                formik.touched.property_state && (
                                  <span className="text-danger">
                                    {formik.errors.property_state}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_state}
                              <span
                                onClick={() => handleEditState()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Country : </strong>
                        {!property.property_country ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_country"
                                className="form-control"
                                value={formik.values.property_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {country.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_country &&
                                formik.touched.property_country && (
                                  <span className="text-danger">
                                    {formik.errors.property_country}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : showCountryInInput ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_country"
                                className="form-control"
                                value={formik.values.property_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {country.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <span
                                onClick={handleCancelEditCountry}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                              {formik.errors.property_country &&
                                formik.touched.property_country && (
                                  <span className="text-danger">
                                    {formik.errors.property_country}
                                  </span>
                                )}
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_country}
                              <span
                                onClick={() => handleEditCountry()}
                                className="mx-2 d-none"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        <strong>Pincode :</strong>
                        {!property.property_pincode ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <input
                                type="text"
                                name="property_pincode"
                                className="form-control"
                                placeholder="Enter Pincode..."
                                value={formik.values.property_pincode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                            {formik.errors.property_pincode &&
                            formik.touched.property_pincode ? (
                              <span className="text-danger">
                                {formik.errors.property_pincode}
                              </span>
                            ) : (
                              <span />
                            )}
                          </>
                        ) : showPincodeInInput ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <input
                                type="text"
                                name="property_pincode"
                                className="form-control"
                                placeholder="Enter Pincode..."
                                value={formik.values.property_pincode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <span
                                onClick={handleCancelEditPincode}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                            {formik.errors.property_pincode &&
                            formik.touched.property_pincode ? (
                              <span className="text-danger">
                                {formik.errors.property_pincode}
                              </span>
                            ) : (
                              <span />
                            )}
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_pincode}
                              <span
                                onClick={() => handleEditPincode()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>City : </strong>{" "}
                        {!property.property_city ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_city"
                                className="form-control"
                                placeholder="Enter City..."
                                value={formik.values.property_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {city.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showCityInInput ? (
                          <>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="d-flex"
                            >
                              <select
                                name="property_city"
                                className="form-control"
                                placeholder="Enter City..."
                                value={formik.values.property_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <option value="">--Select--</option>
                                {city.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <span
                                onClick={handleCancelEditCity}
                                className="mx-3 py-2"
                              >
                                <i className="fe fe-x"></i>
                              </span>
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_city}
                              <span
                                onClick={() => handleEditCity()}
                                className="mx-2"
                              >
                                <i className="fe fe-edit"></i>
                              </span>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

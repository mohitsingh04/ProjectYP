import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { API } from "../../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";

export default function Location() {
  const dispatch = useDispatch();
  const { objectId } = useParams();
  const [property, setProperty] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  useEffect(() => {
    getProperty();
    getCity();
    getState();
    getCountry();
  }, []);

  const getProperty = () => {
    try {
      dispatch(showLoading());
      API.get(`/property/${objectId}`).then(({ data }) => {
        dispatch(hideLoading());
        setProperty(data);
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const getCity = () => {
    API.get("/cities").then(({ data }) => {
      setCity(data);
    });
  };

  const getState = () => {
    API.get("/states").then(({ data }) => {
      setState(data);
    });
  };

  const getCountry = () => {
    API.get("/countries").then(({ data }) => {
      setCountry(data);
    });
  };

  const [showAddressInInput, setShowAddressInInput] = useState(false);
  const [showCityInInput, setShowCityInInput] = useState(false);
  const [showStateInInput, setShowStateInInput] = useState(false);
  const [showPincodeInInput, setShowPincodeInInput] = useState(false);
  const [showCountryInInput, setShowCountryInInput] = useState(false);

  const handleEditAddress = () => {
    setShowAddressInInput(true);
  };
  const handleUpdateAddress = () => {
    setShowAddressInInput(false);
  };
  const handleCancelEditAddress = () => {
    setShowAddressInInput(false);
  };
  const handleEditCity = () => {
    setShowCityInInput(true);
  };
  const handleUpdateCity = () => {
    setShowCityInInput(false);
  };
  const handleCancelEditCity = () => {
    setShowCityInInput(false);
  };
  const handleEditPincode = () => {
    setShowPincodeInInput(true);
  };
  const handleUpdatePincode = () => {
    setShowPincodeInInput(false);
  };
  const handleCancelEditPincode = () => {
    setShowPincodeInInput(false);
  };
  const handleEditState = () => {
    setShowStateInInput(true);
  };
  const handleUpdateState = () => {
    setShowStateInInput(false);
  };
  const handleCancelEditState = () => {
    setShowStateInInput(false);
  };
  const handleEditCountry = () => {
    setShowCountryInInput(true);
  };
  const handleUpdateCountry = () => {
    setShowCountryInInput(false);
  };
  const handleCancelEditCountry = () => {
    setShowCountryInInput(false);
  };

  const initialValues = {
    property_name: property.property_name || "",
    property_address: property.property_address || "",
    property_pincode: property.property_pincode || "",
    property_city: property.property_city || "",
    property_state: property.property_state || "",
    property_country: property.property_country || "",
  };

  const onSubmit = async (values) => {
    try {
      dispatch(showLoading());
      API.patch(`/property/${objectId}`, values).then((response) => {
        dispatch(hideLoading());
        if (response.data.message) {
          toast.success(response.data.message);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: validationSchema,
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
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_address"
                                className="form-control"
                                placeholder="Enter Address..."
                                value={values.property_address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <span onClick={handleCancelEditAddress} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showAddressInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_address"
                                className="form-control"
                                placeholder="Enter Address..."
                                value={values.property_address}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                        <strong>City :</strong>
                        {!property.property_city ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_city"
                                className="form-control"
                                placeholder="Enter City..."
                                value={values.property_city}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_city"
                                className="form-control"
                                placeholder="Enter City..."
                                value={values.property_city}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                    <tr>
                      <td>
                        <strong>Country : </strong>
                        {!property.property_country ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_country"
                                className="form-control"
                                value={values.property_country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">--Select--</option>
                                {country.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {/* <span onClick={handleCancelEditCountry} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showCountryInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_country"
                                className="form-control"
                                value={values.property_country}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                            </form>
                          </>
                        ) : (
                          <>
                            <>
                              <br />
                              {property.property_country}
                              <span
                                onClick={() => handleEditCountry()}
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
                  <tbody className="col-lg-12 col-xl-6 p-0">
                    <tr>
                      <td>
                        <strong>Pincode :</strong>
                        {!property.property_pincode ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_pincode"
                                className="form-control"
                                placeholder="Enter Pincode..."
                                value={values.property_pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {/* <span onClick={handleCancelEditPincode} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                              <button type="submit" className="btn">
                                <i className="fe fe-check text-primary"></i>
                              </button>
                            </form>
                          </>
                        ) : showPincodeInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <input
                                type="text"
                                name="property_pincode"
                                className="form-control"
                                placeholder="Enter Pincode..."
                                value={values.property_pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                        <strong>State : </strong>
                        {!property.property_state ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_state"
                                className="form-control"
                                value={values.property_state}
                                // onChange={(e) => setFilteredState(e.target.value)}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                            </form>
                          </>
                        ) : showStateInInput ? (
                          <>
                            <form onSubmit={handleSubmit} className="d-flex">
                              <select
                                name="property_state"
                                className="form-control"
                                value={values.property_state}
                                // onChange={(e) => setFilteredState(e.target.value)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">--Select--</option>
                                {state.map((item) => (
                                  <option key={item.id} value={item.name}>
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

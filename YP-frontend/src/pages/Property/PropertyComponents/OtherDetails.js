import React, { useEffect, useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { API } from "../../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertSlice";
import DataRequest from "../../../context/DataRequest";

export default function OtherDetails() {
  const dispatch = useDispatch();
  const { User } = DataRequest();
  const { uniqueId } = useParams();
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState([]);
  const [property, setProperty] = useState("");

  const [bussinessHours, setBussinessHours] = useState([]);

  const getProperty = useCallback(async () => {
    dispatch(showLoading());
    await API.get(`/property/${uniqueId}`).then(({ data }) => {
      dispatch(hideLoading());
      setProperty(data);
    });
  }, [dispatch, uniqueId]);

  const getCategory = useCallback(async () => {
    dispatch(showLoading());
    API.get(`/category`).then(({ data }) => {
      dispatch(hideLoading());
      setCategory(data);
    });
  }, [dispatch]);

  const getStatus = useCallback(async () => {
    dispatch(showLoading());
    await API.get(`/status`).then(({ data }) => {
      dispatch(hideLoading());
      setStatus(data);
    });
  }, [dispatch]);

  const getBussinessHours = useCallback(async () => {
    const response = await API.get(`/business-hours/${property.uniqueId}`);
    setBussinessHours(response.data[0]);
  }, []);

  useEffect(() => {
    getProperty();
    getCategory();
    getStatus();
    getBussinessHours();
  }, [getBussinessHours, getProperty, getCategory, getStatus]);

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

  const [showCategoryInInput, setShowCategoryInInput] = useState(false);
  const [showStatusInInput, setShowStatusInInput] = useState(false);
  const [showEstDateInInput, setShowEstDateInInput] = useState(false);

  const handleEditCategory = () => {
    setShowCategoryInInput(true);
  };
  const handleCancelEditCategory = () => {
    setShowCategoryInInput(false);
  };
  const handleEditStatus = () => {
    setShowStatusInInput(true);
  };
  const handleCancelEditStatus = () => {
    setShowStatusInInput(false);
  };
  const handleEditEstDate = () => {
    setShowEstDateInInput(true);
  };
  const handleCancelEditEstDate = () => {
    setShowEstDateInInput(false);
  };

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
      dispatch(showLoading());
      API.post(`/business-hours`, data).then((response) => {
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

  const { values, handleSubmit } = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const handleTimeChange = (day, time, value) => {
    setFormState({
      ...formState,
      [day]: { ...formState[day], [time]: value },
    });
  };

  const [activeCategory, setActiveCategory] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const handleCateogory = async (e) => {
    e.preventDefault();
    let data = {};
    if (activeCategory) {
      data = {
        ...initialValues,
        category: activeCategory,
      };
    }

    if (activeStatus) {
      data = {
        ...initialValues,
        status: activeStatus,
      };
    }

    if (establishmentYear) {
      data = {
        ...initialValues,
        est_year: establishmentYear,
      };
    }
    try {
      const response = await API.patch(
        `/property/${initialValues?.property_id}`,
        data
      );
      toast.success(response.data.message);
      setActiveCategory("");
      await getProperty();
      handleCancelEditCategory();
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="tab-pane profiletab show">
        <div id="profile-log-switch">
          <Card>
            <Card.Header>
              <h5>
                <strong>Other Details</strong>
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <strong>Category :</strong>
                  {!property.category ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <select
                          name="category"
                          id="category"
                          className="form-control"
                          value={values.category}
                          onChange={(e) => setActiveCategory(e.target.value)}
                        >
                          <option value="">--Select Category--</option>
                          {category.map((item, key) => (
                            <option key={key} value={item.category_name}>
                              {item.category_name}
                            </option>
                          ))}
                        </select>
                        {/* <span onClick={handleCancelEditCategory} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : showCategoryInInput ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <select
                          name="category"
                          id="category"
                          className="form-control"
                          value={values.category}
                          onChange={(e) => setActiveCategory(e.target.value)}
                        >
                          <option value="">--Select Category--</option>
                          {category.map((item, key) => (
                            <option key={key} value={item.category_name}>
                              {item.category_name}
                            </option>
                          ))}
                        </select>
                        <span
                          onClick={handleCancelEditCategory}
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
                        {property.category}
                        <span
                          onClick={() => handleEditCategory()}
                          className="mx-2"
                        >
                          <i className="fe fe-edit"></i>
                        </span>
                      </>
                    </>
                  )}
                </Col>
                {User.role === "Admin" || User.role === "Editor" ? (
                  <>
                    <Col md={6} className="mb-3">
                      <strong>Status :</strong>
                      {!property.status ? (
                        <>
                          <form onSubmit={handleCateogory} className="d-flex">
                            <select
                              name="status"
                              id="status"
                              className="form-control"
                              value={values.status}
                              onChange={(e) => setActiveStatus(e.target.value)}
                            >
                              <option value="">--Select Status--</option>
                              {status.map((item, key) => (
                                <option key={key} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {/* <span onClick={handleCancelEditStatus} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                            <button type="submit" className="btn">
                              <i className="fe fe-check text-primary"></i>
                            </button>
                          </form>
                        </>
                      ) : showStatusInInput ? (
                        <>
                          <form onSubmit={handleCateogory} className="d-flex">
                            <select
                              name="status"
                              id="status"
                              className="form-control"
                              value={values.status}
                              onChange={(e) => setActiveStatus(e.target.value)}
                            >
                              <option value="">--Select Status--</option>
                              {status.map((item, key) => (
                                <option key={key} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <span
                              onClick={handleCancelEditStatus}
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
                            {property.status}
                            <span
                              onClick={() => handleEditStatus()}
                              className="mx-2"
                            >
                              <i className="fe fe-edit"></i>
                            </span>
                          </>
                        </>
                      )}
                    </Col>
                  </>
                ) : null}
                <Col md={6}>
                  <strong>Established Year :</strong>
                  {!property.est_year ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <input
                          type="number"
                          name="est_year"
                          className="form-control"
                          placeholder="Enter established year..."
                          value={values.est_year}
                          onChange={(e) => setEstablishmentYear(e.target.value)}
                        />
                        {/* <span onClick={handleCancelEditEstDate} className="mx-3 py-2"><i className="fe fe-x"></i></span> */}
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : showEstDateInInput ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <input
                          type="number"
                          name="est_year"
                          className="form-control"
                          placeholder="Enter established year..."
                          value={values.est_year}
                          onChange={(e) => setEstablishmentYear(e.target.value)}
                        />
                        <span
                          onClick={handleCancelEditEstDate}
                          className="mx-3 py-2"
                        >
                          <i className="fe fe-x"></i>
                        </span>
                        {/* <span onClick={handleUpdateName} className="mx-3 py-2"><i className="fe fe-check"></i></span> */}
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <>
                        <br />
                        {property.est_year}
                        <span
                          onClick={() => handleEditEstDate()}
                          className="mx-2"
                        >
                          <i className="fe fe-edit"></i>
                        </span>
                      </>
                    </>
                  )}
                </Col>
                <Col md={12} className="mt-3">
                  <strong>Opening Hours :</strong>
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
                              value={times.open}
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
                              value={times.close}
                              onChange={(e) =>
                                handleTimeChange(day, "close", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button type="submit" className="btn">
                      <i className="fe fe-check text-primary"></i>
                    </button>
                  </form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

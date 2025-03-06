import React, { useEffect, useState, useCallback } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../../context/Api";
import { toast } from "react-toastify";
import Businesshours from "./Businesshours";

export default function OtherDetails() {
  const { objectId } = useParams();
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState([]);
  const [property, setProperty] = useState("");

  const getProperty = useCallback(async () => {
    await API.get(`/property/${objectId}`).then(({ data }) => {
      setProperty(data);
      setActiveCategory(data?.category);
      setEstablishmentYear(data?.est_year);
      setActiveStatus(data?.status);
    });
  }, [objectId]);

  const getCategory = useCallback(async () => {
    API.get(`/category`).then(({ data }) => {
      setCategory(data);
      const mainCategory = data.filter((item) => item.status === "Active");
      if (mainCategory) {
        setCategory(mainCategory);
      }
    });
  }, []);

  const getStatus = useCallback(async () => {
    await API.get(`/status`).then(({ data }) => {
      setStatus(data);
      const mainStatus = data.filter((item) => item.name === "Property");
      if (mainStatus) {
        setStatus(mainStatus);
      }
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  useEffect(() => {
    getCategory();
    getStatus();
  }, [getCategory, getStatus]);

  const [showCategoryInInput, setShowCategoryInInput] = useState(false);
  const [showStatusInInput, setShowStatusInInput] = useState(false);
  const [showEstDateInInput, setShowEstDateInInput] = useState(false);

  const handleEditCategory = () => {
    console.log("Edit");
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

  const [activeCategory, setActiveCategory] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [error, setError] = useState("");
  const handleCateogory = async (e) => {
    e.preventDefault();
    let data = {};

    if (!/^\d+$/.test(establishmentYear)) {
      setError("Establishment year must contain only numbers.");
      return;
    }
    if (String(establishmentYear).length !== 4) {
      setError("Establishment year must be exactly 4 digits.");
      return;
    }

    data = {
      ...initialValues,
      category: activeCategory,
      status: activeStatus,
      est_year: establishmentYear,
    };

    try {
      const response = await API.patch(`/property/${objectId}`, data);
      console.log(response);
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
                  {property.category && showCategoryInInput ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <div className="input-group">
                          <select
                            name="category"
                            id="category"
                            className="form-control"
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                          >
                            <option value="">--Select Category--</option>
                            {category.map((item, key) => (
                              <option key={key} value={item.category_name}>
                                {item.category_name}
                              </option>
                            ))}
                          </select>
                          <button type="submit" className="btn btn-success">
                            <i className="fe fe-check"></i>
                          </button>
                          <button
                            onClick={handleCancelEditCategory}
                            className="btn btn-danger"
                          >
                            <i className="fe fe-x"></i>
                          </button>
                        </div>
                      </form>
                      {category.length === 0 && (
                        <Row>
                          <Col className="d-flex pt-3">
                            <div>
                              <p className="text-danger">
                                No categories available. Please add a category
                                to continue.
                              </p>
                            </div>
                            <div className="ms-auto">
                              <Link
                                to={`/dashboard/category/add`}
                                className="btn btn-primary"
                              >
                                Add Category
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </>
                  ) : (
                    <>
                      <>
                        <div className="d-flex justify-content-between align-items-center">
                          {property.category}
                          <button
                            onClick={() => handleEditCategory()}
                            className="btn btn-primary"
                          >
                            <i className="fe fe-edit"></i>
                          </button>
                        </div>
                      </>
                    </>
                  )}
                </Col>
                <Col md={6} className="mb-3">
                  <strong>Status :</strong>
                  {property.status && showStatusInInput ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                          value={activeStatus}
                          onChange={(e) => setActiveStatus(e.target.value)}
                        >
                          <option value="">--Select Status--</option>
                          {status.map((item, key) => (
                            <option key={key} value={item.parent_status}>
                              {item.parent_status}
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
                          onChange={(e) => {
                            setEstablishmentYear(e.target.value);
                            setError("");
                          }}
                        />
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                      <span className="text-danger">{error}</span>
                    </>
                  ) : showEstDateInInput ? (
                    <>
                      <form onSubmit={handleCateogory} className="d-flex">
                        <input
                          type="number"
                          name="est_year"
                          className="form-control"
                          placeholder="Enter established year..."
                          value={establishmentYear}
                          onChange={(e) => {
                            setEstablishmentYear(e.target.value);
                            setError("");
                          }}
                        />
                        <span
                          onClick={handleCancelEditEstDate}
                          className="mx-3 py-2"
                        >
                          <i className="fe fe-x"></i>
                        </span>
                        <button type="submit" className="btn">
                          <i className="fe fe-check text-primary"></i>
                        </button>
                      </form>
                      <span className="text-danger">{error}</span>
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
              </Row>
            </Card.Body>
          </Card>
          <Businesshours property={property} />
        </div>
      </div>
    </>
  );
}

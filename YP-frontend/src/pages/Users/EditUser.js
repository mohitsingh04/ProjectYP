import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Card, Form, FormGroup, Breadcrumb } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown-select";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function EditUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [status, setStatus] = useState([]);
  const { objectId } = useParams();
  const [permissionData, setPermissionData] = useState([]);
  const mainUser = DataRequest();
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      const response = await API.get(`/user/${mainUser?.User?._id}`);
      setAuthUser(response.data);
      setAuthLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [mainUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setAuthPermissions(authUser?.permissions);
  }, [authUser]);

  useEffect(() => {
    API.get(`/user/${objectId}`).then(({ data }) => {
      setUser(data);
      setSelectedState(data.state);
      setLoading(false);
    }, []);
    API.get(`/status/`).then(({ data }) => {
      setStatus(data);
      const mainStatus = data.filter((item) => item.name === "User");
      if (mainStatus) {
        setStatus(mainStatus);
      }
    }, []);
    API.get("/permissions").then(({ data }) => {
      setPermissionData(data);
    }, []);
    API.get("/states").then(({ data }) => {
      const sortedStates = data.sort((a, b) => a.name.localeCompare(b.name));
      setState(sortedStates);
    });
  }, [objectId]);

  useEffect(() => {
    API.get("/cities").then(({ data }) => {
      let filteredCities = data;

      if (selectedState) {
        filteredCities = data.filter(
          (item) => item.state_name === selectedState
        );
      }

      const sortedCities = filteredCities.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCity(sortedCities);
    });
  }, [selectedState]);

  const initialValues = {
    uniqueId: user.uniqueId,
    name: user.name || "",
    email: user.email || "",
    mobile_no: user.mobile_no || "",
    pincode: user.pincode || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    role: user.role || "",
    status: user.status || "",
    permission: user.permissions || [],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Full Name must be at least 3 characters long.")
      .required("Full name is required.")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain alphabets and spaces."),

    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),

    mobile_no: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits.")
      .required("Mobile number is required."),

    address: Yup.string(),

    pincode: Yup.string().matches(
      /^[0-9]{6}$/,
      "Pincode must be exactly 6 digits."
    ),

    city: Yup.string().min(2, "City must be at least 2 characters long."),

    state: Yup.string()
      .min(2, "State must be at least 2 characters long.")
      .matches(/^[a-zA-Z\s]+$/, "State can only contain alphabets and spaces."),

    role: Yup.string().required("Role is required."),

    status: Yup.string().required("Status is required."),
  });

  const onSubmit = async (values) => {
    await API.patch(`/user/${objectId}`, values).then((response) => {
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/dashboard/user");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
      const hasPermission = authPermissions?.some(
        (item) => item.value === "Update User"
      );

      if (!hasPermission) {
        return (
          <div className="position-absolute top-50 start-50 translate-middle">
            <h2 className="text-danger fw-bold">Access Denied</h2>
            <p>You do not have the required permissions to access this page.</p>
          </div>
        );
      }
    }
  }

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">User</h1>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/" }}
                >
                  Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: "/dashboard/user/" }}
                >
                  User
                </Breadcrumb.Item>
                <Breadcrumb.Item>Edit</Breadcrumb.Item>
                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back
            </button>
          </div>
        </div>

        <Row>
          <Col lg={12} xl={12} md={12} sm={12}>
            <Card>
              <Card.Header>
                {loading ? (
                  <Skeleton width={200} height={25} />
                ) : (
                  <Card.Title as="h3">Edit User</Card.Title>
                )}
              </Card.Header>
              <Card.Body>
                {!loading ? (
                  <form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col lg={12} md={12}>
                        <FormGroup>
                          <label htmlFor="name">First Name</label>
                          <Form.Control
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="First Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="name"
                          />
                          {formik.errors.name && formik.touched.name ? (
                            <small className="text-danger">
                              {formik.errors.name}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup className="mt-2">
                      <label htmlFor="email">Email address</label>
                      <Form.Control
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="email"
                        onBlur={formik.handleBlur}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup className="mt-2">
                      <label htmlFor="mobile_no">Contact Number</label>
                      <Form.Control
                        type="number"
                        name="mobile_no"
                        className="form-control"
                        id="mobile_no"
                        placeholder="mobile number"
                        value={formik.values.mobile_no}
                        onChange={formik.handleChange}
                        autoComplete="mobile_no"
                        onBlur={formik.handleBlur}
                        disabled
                      />
                      {formik.errors.mobile_no && formik.touched.mobile_no ? (
                        <small className="text-danger">
                          {formik.errors.mobile_no}
                        </small>
                      ) : (
                        <span />
                      )}
                    </FormGroup>
                    <Row className="mt-3">
                      <Col lg={8} md={12}>
                        <FormGroup>
                          <label htmlFor="address">Address</label>
                          <Form.Control
                            type="text"
                            name="address"
                            className="form-control"
                            id="address"
                            placeholder="Address *"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            autoComplete="address"
                          />
                          {formik.errors.address && formik.touched.address ? (
                            <small className="text-danger">
                              {formik.errors.address}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg={4} md={12}>
                        <FormGroup>
                          <label htmlFor="pincode">Pincode</label>
                          <Form.Control
                            type="number"
                            name="pincode"
                            className="form-control"
                            id="pincode"
                            placeholder="Pincode *"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.pincode && formik.touched.pincode ? (
                            <small className="text-danger">
                              {formik.errors.pincode}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col lg={6} md={12}>
                        <FormGroup>
                          <label htmlFor="state">State</label>
                          <Form.Select
                            name="state"
                            className="form-control"
                            id="state"
                            value={formik.values.state}
                            onChange={(e) => {
                              formik.handleChange(e);
                              setSelectedState(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Select State *</option>
                            {state.map((state, index) => (
                              <option key={index} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </Form.Select>

                          {formik.errors.state && formik.touched.state ? (
                            <small className="text-danger">
                              {formik.errors.state}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg={6} md={12}>
                        <FormGroup>
                          <label htmlFor="city">City</label>
                          <Form.Select
                            name="city"
                            className="form-control"
                            id="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Select City *</option>
                            {city.map((city, index) => (
                              <option key={index} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </Form.Select>
                          {formik.errors.city && formik.touched.city ? (
                            <small className="text-danger">
                              {formik.errors.city}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg={6} md={12} className="mt-2">
                        <FormGroup>
                          <label htmlFor="status">Status</label>
                          <select
                            name="status"
                            className="form-control"
                            id="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">--Select--</option>
                            {status.map((item, key) => (
                              <option key={key} value={item.parent_status}>
                                {item.parent_status}
                              </option>
                            ))}
                          </select>
                          {formik.errors.status && formik.touched.status ? (
                            <small className="text-danger">
                              {formik.errors.status}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg={6} md={12} className="mt-2">
                        <FormGroup>
                          <label htmlFor="role">Role</label>
                          <select
                            name="role"
                            className="form-control"
                            id="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">--Select Role--</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Property Manager">
                              Property Manager
                            </option>
                            <option value="User">User</option>
                          </select>
                          {formik.errors.role && formik.touched.role ? (
                            <small className="text-danger">
                              {formik.errors.role}
                            </small>
                          ) : (
                            <span />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Permission</Form.Label>
                          <Dropdown
                            options={permissionData.map((group) => ({
                              label: group.name,
                              value: group.name,
                            }))}
                            keepSelectedInList={false}
                            name="permissions"
                            id="permissions"
                            multi={true}
                            placeholder="Choose Permissions"
                            value={formik.values.permission}
                            values={user?.permissions}
                            onChange={(value) =>
                              formik.setFieldValue("permission", value)
                            }
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.permission &&
                          formik.touched.permission ? (
                            <small className="text-danger">
                              {formik.errors.permission}
                            </small>
                          ) : (
                            <span />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 border-top">
                      <div>
                        <button
                          type="submit"
                          className="btn btn-success mt-3 me-2"
                        >
                          Update
                        </button>
                      </div>
                    </Row>
                  </form>
                ) : (
                  <Skeleton height={25} count={8} className="my-2" />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

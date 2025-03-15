import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function EditStatus() {
  const navigate = useNavigate();
  const { objectId } = useParams();
  const mainUser = DataRequest();
  const [allStatus, setAllStatus] = useState([]);
  const [status, setStatus] = useState({});
  const [error, setError] = useState("");
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      if (!mainUser?.User?._id) return;
      const response = await API.get(`/user/${mainUser.User._id}`);
      setAuthUser(response.data);
      setAuthLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [mainUser?.User?._id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setAuthPermissions(authUser?.permissions);
  }, [authUser]);

  const getAllStatus = async () => {
    try {
      const response = await API.get("/status");
      const uniqueStatus = Object.values(
        response.data.reduce((acc, item) => {
          acc[item.parent_status] = item;
          return acc;
        }, {})
      );
      setAllStatus(uniqueStatus);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    getAllStatus();
  }, []);

  useEffect(() => {
    API.get(`/status/${objectId}`).then(({ data }) => {
      setStatus(data);
      setLoading(false);
    });
  }, [objectId]);

  const validationSchema = Yup.object({
    parent_status: Yup.string()
      .min(3, "Status Name must be at least 3 characters.")
      .required("Status name is required.")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Status Name can only contain alphabets and spaces."
      ),
  });

  const formik = useFormik({
    initialValues: {
      parent_status: status.parent_status || "",
      status_name: status.name || "",
      description: status.description || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await API.patch(`/status/${objectId}`, values);
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/dashboard/status");
        } else if (response.data.error) {
          setError(response.data.error);
        }
      } catch (err) {
        toast.error(err.response.data.error);
      }
    },
    enableReinitialize: true,
  });

  if (!authLoading) {
    if (authPermissions?.length >= 0) {
      const hasPermission = authPermissions?.some(
        (item) => item.value === "Update Status"
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
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Status</h1>
          {loading ? (
            <Skeleton width={200} />
          ) : (
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: "/dashboard/status/" }}
              >
                Status
              </Breadcrumb.Item>
              <Breadcrumb.Item>Edit</Breadcrumb.Item>
              <Breadcrumb.Item>{status.name}</Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>
        <div className="ms-auto pageheader-btn">
          <Link to="/dashboard/status/" className="btn btn-primary">
            <i className="fe fe-arrow-left me-1"></i>Back
          </Link>
        </div>
      </div>
      <Row>
        <div className="col-md-12 col-lg-12">
          <Card>
            <Card.Header>
              {loading ? (
                <Skeleton width={200} height={25} />
              ) : (
                <h3 className="card-title">Edit Status</h3>
              )}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Skeleton height={25} count={8} className="my-2" />
              ) : (
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  {error && (
                    <div className="alert alert-danger">
                      <small>{error}</small>
                    </div>
                  )}
                  <div className="form-row">
                    <div className="form-group col mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="status_name">
                          Status Name
                        </Form.Label>
                        <Form.Select
                          id="status_name"
                          name="status_name"
                          value={formik.values.status_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="" disabled>
                            --Select Category--
                          </option>
                          <option value={`uncategorized`}>Uncategorized</option>
                          {allStatus
                            .filter(
                              (item) =>
                                !["Active", "Pending", "Suspended"].includes(
                                  item.parent_status
                                )
                            )
                            .map((item, index) => (
                              <option key={index} value={item.parent_status}>
                                {item.parent_status}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="form-group col mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="parent_status">
                          Parent Status
                        </Form.Label>
                        <input
                          type="text"
                          id="parent_status"
                          name="parent_status"
                          className="form-control"
                          placeholder="Name"
                          {...formik.getFieldProps("parent_status")}
                        />
                        {formik.touched.parent_status &&
                          formik.errors.parent_status && (
                            <span className="text-danger">
                              {formik.errors.parent_status}
                            </span>
                          )}
                      </Form.Group>
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      <Form.Group>
                        <Form.Label htmlFor="description">
                          Description
                        </Form.Label>
                        <textarea
                          id="description"
                          className="form-control"
                          rows="5"
                          placeholder="Enter description (max 200 characters)"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          maxLength={200}
                        ></textarea>
                        <small className="float-end">
                          {formik.values?.description?.length}/200
                        </small>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="form-footer mt-2">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              )}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}

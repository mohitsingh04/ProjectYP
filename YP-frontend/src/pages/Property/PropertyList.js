import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DataRequest from "../../context/DataRequest";
import defautLogo from "../../Images/defaultPropertyLogo.jpeg";

export default function PropertyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getProperty = useCallback(async () => {
    await API.get("/property")
      .then(({ data }) => {
        dispatch(hideLoading());
        setProperty(data);
      })
      .catch((err) => {
        dispatch(hideLoading());
        toast.error(err.message);
      });
  }, [dispatch]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const viewProperty = (objectId) => {
    navigate("/dashboard/property/view/" + objectId);
  };

  const deleteProperty = (objectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(showLoading());
          API.delete(`/property/${objectId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
              getProperty();
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error.message);
      });
  };

  const handleLoadImage = useCallback((img) => {
    if (img !== null) {
      const x = img.split("/");
      if (x.length > 2) {
        return (
          <img
            key={img}
            src={`http://localhost:5000/${img}`}
            width={53}
            alt=""
          />
        );
      } else if (x.length < 2) {
        return (
          <img
            key={img}
            src={`http://localhost:5000/images/${img}`}
            width={53}
            alt=""
          />
        );
      }
    }
    return <img key={`default Logo`} src={defautLogo} width={53} alt="" />;
  }, []);

  const columns = [
    {
      name: "S.NO",
      selector: (row) => row.uniqueId,
      sortable: true,
    },
    {
      name: "ICON",
      selector: (row) => handleLoadImage(row.property_icon[0]),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.property_name,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <span
          key={`status-${row._id}`}
          className={`badge ${
            row.status === "Active"
              ? "bg-success"
              : row.status === "InActive"
              ? "bg-danger"
              : "bg-warning"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <div key={`actions-${row._id}`} className="action-buttons">
          {authPermissions?.some(
            (items) => items.value === "Read Property"
          ) && (
            <button
              key={`view-${row._id}`}
              data-bs-toggle="tooltip"
              title="View"
              onClick={() => viewProperty(row._id)}
            >
              <i className="fe fe-eye"></i>
            </button>
          )}
          {authPermissions?.some(
            (items) => items.value === "Read Property"
          ) && (
            <button
              key={`delete-${row._id}`}
              data-bs-toggle="tooltip"
              title="Delete"
              onClick={() => deleteProperty(row._id)}
            >
              <i className="fe fe-trash"></i>
            </button>
          )}
        </div>
      ),
    },
  ];

  const data =
    mainUser?.User?.role === "Property Manager"
      ? property.filter((item) => item.userId === mainUser?.User?.uniqueId)
      : property;

  const tableData = {
    columns,
    data,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Property</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Property List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          {authPermissions?.some(
            (items) => items.value === "Create Property"
          ) ? (
            <Link
              to="/dashboard/property/add/"
              className="btn btn-primary btn-icon text-white me-3"
            >
              <span>
                <i className="fe fe-plus"></i>&nbsp;
              </span>
              Add Property
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div className="table">
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={data}
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    persistTableHead
                    pagination
                    highlightOnHover
                  />
                </DataTableExtensions>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

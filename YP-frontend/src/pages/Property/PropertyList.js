import React, { useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { API } from "../../context/Api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function PropertyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = () => {
    try {
      dispatch(showLoading());
      API.get("/property").then(({ data }) => {
        dispatch(hideLoading());
        setProperty(data);
        // if (User.role === "Admin") {
        //     setProperty(data);
        // } else if (User.role === "Editor") {
        //     setProperty(data);
        // } else if (User.role === "User") {
        //     setProperty(data.filter(property => property.userId == User.uniqueId));
        // }
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const viewProperty = (uniqueId) => {
    navigate("/dashboard/property/view/" + uniqueId);
  };

  const deleteProperty = (uniqueId) => {
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
          API.delete(`/property/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
        getProperty();
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error.message);
      });
  };

  const columns = [
    {
      name: "S.NO",
      selector: (row) => [row.uniqueId],
      sortable: true,
    },
    {
      name: "ICON",
      selector: (row) => [
        <img
          src={`http://localhost:5000/${row.property_icon}`}
          width={53}
          alt=""
        />,
      ],
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => [row.property_name],
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => [
        <>
          {row.status === "Active" ? (
            <span className="badge bg-success">{row.status}</span>
          ) : row.status === "InActive" ? (
            <span className="badge bg-danger">{row.status}</span>
          ) : (
            <span className="badge bg-warning">{row.status}</span>
          )}
        </>,
      ],
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => [
        <button
          data-bs-toggle="tooltip"
          title="View"
          onClick={() => viewProperty(row.uniqueId)}
        >
          <i className="fe fe-eye"></i>
        </button>,
        <button
          data-bs-toggle="tooltip"
          title="Delete"
          onClick={() => deleteProperty(row.uniqueId)}
        >
          <i className="fe fe-trash"></i>
        </button>,
      ],
    },
  ];

  const data = property;

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
          <Link
            to="/dashboard/property/add/"
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Property
          </Link>
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

import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import Skeleton from "react-loading-skeleton";

export default function StatusList() {
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getStatus = useCallback(async () => {
    try {
      const { data } = await API.get("/status");
      setStatus(data);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  const viewStatus = (objectId) => {
    navigate("/dashboard/status/view/" + objectId);
  };

  const editStatus = (objectId) => {
    navigate("/dashboard/status/edit/" + objectId);
  };

  const deleteStatus = (objectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await API.delete(`/status/${objectId}`);
          toast.success(response.data.message);
          getStatus();
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  const columns = [
    {
      name: "S.NO",
      selector: (row) =>
        loading ? <Skeleton width={50} height={25} /> : row.uniqueId,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) =>
        loading ? <Skeleton width={100} height={25} /> : row.name,
      sortable: true,
    },
    {
      name: "Parent Status",
      selector: (row) =>
        loading ? <Skeleton width={50} height={25} /> : row?.parent_status,
      sortable: true,
      cell: (row) =>
        loading ? <Skeleton width={50} height={25} /> : row?.parent_status,
    },
    {
      name: "ACTION",
      selector: (row) =>
        loading ? (
          <Skeleton width={150} height={25} />
        ) : (
          <>
            {authPermissions?.some(
              (items) => items.value === "Read Status"
            ) && (
              <button
                data-bs-toggle="tooltip"
                title="View"
                className="me-1"
                onClick={() => viewStatus(row._id)}
              >
                <i className="fe fe-eye"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Update Status"
            ) && (
              <button
                data-bs-toggle="tooltip"
                title="Edit"
                className="me-1"
                onClick={() => editStatus(row._id)}
              >
                <i className="fe fe-edit"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Delete Status"
            ) && (
              <button
                data-bs-toggle="tooltip"
                title="Delete"
                onClick={() => deleteStatus(row._id)}
              >
                <i className="fe fe-trash-2"></i>
              </button>
            )}
          </>
        ),
    },
  ];

  const data = loading ? Array(5).fill({}) : status;
  const tableData = { columns, data };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Status</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item>Status List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            {authPermissions?.some(
              (items) => items.value === "Create Status"
            ) && (
              <Link to="/dashboard/status/add/" className="btn btn-primary">
                <span>
                  <i className="fe fe-plus me-1"></i>
                </span>
                Add Status
              </Link>
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
                      striped
                      center
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
    </>
  );
}

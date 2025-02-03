import React, { useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function StatusList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      dispatch(showLoading());
      const { data } = await API.get("/status");
      setStatus(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const viewStatus = (uniqueId) => {
    navigate("/dashboard/status/view/" + uniqueId);
  };

  const editStatus = (uniqueId) => {
    navigate("/dashboard/status/edit/" + uniqueId);
  };

  const deleteStatus = (uniqueId) => {
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
          dispatch(showLoading());
          const response = await API.delete(`/status/${uniqueId}`);
          toast.success(response.data.message);
          getStatus();
        } catch (error) {
          toast.error(error.message);
        } finally {
          dispatch(hideLoading());
        }
      }
    });
  };

  const columns = [
    {
      name: "S.NO",
      selector: (row) => row.uniqueId,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "COLOR",
      selector: (row) => (
        <input type="color" value={row.color} disabled />
      ),
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <>
          <button data-bs-toggle="tooltip" title="View" onClick={() => viewStatus(row.uniqueId)}>
            <i className="fe fe-eye"></i>
          </button>
          <button data-bs-toggle="tooltip" title="Edit" onClick={() => editStatus(row.uniqueId)}>
            <i className="fe fe-edit"></i>
          </button>
          <button data-bs-toggle="tooltip" title="Delete" onClick={() => deleteStatus(row.uniqueId)}>
            <i className="fe fe-trash-2"></i>
          </button>
        </>
      ),
    },
  ];

  const data = status;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Status</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
                Status List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link to="/dashboard/status/add/" className="btn btn-primary btn-icon text-white me-3">
              <span>
                <i className="fe fe-plus"></i>&nbsp;
              </span>
              Add Status
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
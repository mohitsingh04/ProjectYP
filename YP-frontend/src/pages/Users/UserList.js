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

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    try {
      dispatch(showLoading());
      API.get("/users").then(({ data }) => {
        setUsers(data);
        dispatch(hideLoading());
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  const viewUser = (uniqueId) => {
    navigate("/dashboard/user/view/" + uniqueId);
  };

  const editUser = (uniqueId) => {
    navigate("/dashboard/user/edit/" + uniqueId);
  };

  const deleteUser = (uniqueId) => {
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
          API.delete(`/user/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
        getUser();
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error.message);
      });
  };

  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "PROFILE",
      selector: (row) => [
        <img
          src={`http://localhost:5000/images/${row.profile}`}
          className="rounded-circle"
          width={50}
          height={50}
          alt="profile"
        />,
      ],
      sortable: true,
    },
    {
      name: "CITY",
      selector: (row) => [row.city],
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row) => [row.role],
      sortable: true,
    },
    {
      name: "VERIFIED",
      selector: (row) => [
        <>
          {row.verified === true ? (
            <>
              <span className="badge bg-success">Verified</span>
            </>
          ) : (
            <>
              <span className="badge bg-danger">Not verified</span>
            </>
          )}
        </>,
      ],
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
          onClick={() => viewUser(row.uniqueId)}
        >
          <i className="fe fe-eye"></i>
        </button>,
        <button
          data-bs-toggle="tooltip"
          title="Edit"
          onClick={() => editUser(row.uniqueId)}
        >
          <i className="fe fe-edit"></i>
        </button>,
        <button
          data-bs-toggle="tooltip"
          title="Delete"
          onClick={() => deleteUser(row.uniqueId)}
        >
          <i className="fe fe-trash-2"></i>
        </button>,
      ],
    },
  ];

  const data = users;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Users</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                User List
              </Breadcrumb.Item>
            </Breadcrumb>
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
    </>
  );
}

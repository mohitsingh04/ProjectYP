import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import defaultProfile from "../../Images/DefaultProfile.jpg";
import Skeleton from "react-loading-skeleton";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getUser = useCallback(() => {
    try {
      API.get("/users").then(({ data }) => {
        setUsers(data);
        setLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

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
          API.delete(`/user/${uniqueId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              getUser();
            } else if (response.data.error) {
              toast.error(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const columns = [
    {
      name: "NAME",
      selector: (row) =>
        loading ? <Skeleton width={100} height={25} /> : row.name,
      sortable: true,
    },
    {
      name: "PROFILE",
      selector: (row) =>
        loading ? (
          <Skeleton width={50} height={50} circle={true} />
        ) : (
          <img
            key={row._id}
            src={
              row?.profile?.[0]
                ? `http://localhost:5000/${row.profile[0]}`
                : defaultProfile
            }
            className="rounded-circle"
            width={50}
            height={50}
            alt="profile"
          />
        ),
      sortable: true,
    },
    {
      name: "CITY",
      selector: (row) =>
        loading ? <Skeleton width={80} height={25} /> : row.city,
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row) =>
        loading ? <Skeleton width={80} height={25} /> : row.role,
      sortable: true,
    },
    {
      name: "VERIFIED",
      selector: (row) =>
        loading ? (
          <Skeleton width={80} height={25} />
        ) : (
          <span
            key={row._id}
            className={`badge ${row.verified ? "bg-success" : "bg-danger"}`}
          >
            {row.verified ? "Verified" : "Not verified"}
          </span>
        ),
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) =>
        loading ? (
          <Skeleton width={80} height={25} />
        ) : (
          <span
            key={row._id}
            className={`badge ${
              row.status === "Active"
                ? "bg-success"
                : row.status === "Suspended"
                ? "bg-danger"
                : row.status === "Pending"
                ? "bg-warning"
                : "bg-primary"
            }`}
          >
            {row.status}
          </span>
        ),
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) =>
        loading ? (
          <Skeleton width={150} height={25} />
        ) : (
          <div key={row._id}>
            {authPermissions?.some((item) => item.value === "Read User") && (
              <button
                data-bs-toggle="tooltip"
                title="View"
                className="btn btn-primary me-1"
                onClick={() => viewUser(row._id)}
              >
                <i className="fe fe-eye"></i>
              </button>
            )}
            {authPermissions?.some((item) => item.value === "Update User") && (
              <button
                data-bs-toggle="tooltip"
                title="Edit"
                className="btn btn-success me-1"
                onClick={() => editUser(row._id)}
              >
                <i className="fe fe-edit"></i>
              </button>
            )}
            {authPermissions?.some((item) => item.value === "Delete User") && (
              <button
                data-bs-toggle="tooltip"
                title="Delete"
                className="btn btn-danger"
                onClick={() => deleteUser(row._id)}
              >
                <i className="fe fe-trash-2"></i>
              </button>
            )}
          </div>
        ),
    },
  ];

  const data = loading ? Array(5).fill({}) : users;

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
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                User List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            {authPermissions?.some(
              (items) => items.value === "Create User"
            ) && (
              <Link
                to="/dashboard/user/add/"
                className="btn btn-primary btn-icon text-white me-3"
              >
                <span>
                  <i className="fe fe-plus"></i>&nbsp;
                </span>
                Add User
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

import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import DataRequest from "../../context/DataRequest";
import defaultProfile from "../../Images/DefaultProfile.jpg";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getUser = useCallback(() => {
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
  }, [dispatch]);

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
          dispatch(showLoading());
          API.delete(`/user/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
              getUser();
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

  const columns = [
    {
      name: "NAME",
      selector: (row) => [row.name],
      sortable: true,
    },
    {
      name: "PROFILE",
      selector: (row) => (
        <img
          key={row._id}
          src={
            row.profile?.[0] === null
              ? defaultProfile
              : `http://localhost:5000/${row.profile[0]}`
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
      selector: (row) => (
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
      selector: (row) => (
        <span
          key={row._id}
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
        <div key={row._id}>
          {authPermissions?.some((item) => item.value === "Read User") && (
            <button
              data-bs-toggle="tooltip"
              title="View"
              onClick={() => viewUser(row._id)}
            >
              <i className="fe fe-eye"></i>
            </button>
          )}
          {authPermissions?.some((item) => item.value === "Update User") && (
            <button
              data-bs-toggle="tooltip"
              title="Edit"
              onClick={() => editUser(row._id)}
            >
              <i className="fe fe-edit"></i>
            </button>
          )}
          {authPermissions?.some((item) => item.value === "Delete User") && (
            <button
              data-bs-toggle="tooltip"
              title="Delete"
              onClick={() => deleteUser(row._id)}
            >
              <i className="fe fe-trash-2"></i>
            </button>
          )}
        </div>
      ),
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
            {authPermissions?.some((items) => items.value === "Create User") ? (
              <Link
                to="/dashboard/user/add/"
                className="btn btn-primary btn-icon text-white me-3"
              >
                <span>
                  <i className="fe fe-plus"></i>&nbsp;
                </span>
                Add User
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
    </>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { API } from "../../context/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import defaultIcon from "../../Images/defaultcategory-compressed.webp";
import Skeleton from "react-loading-skeleton";

export default function CategoryList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getCategory = useCallback(() => {
    try {
      API.get("/category").then(({ data }) => {
        setCategory(data);
        setLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const viewCategory = (uniqueId) => {
    navigate("/dashboard/category/view/" + uniqueId);
  };

  const editCategory = (uniqueId) => {
    navigate("/dashboard/category/edit/" + uniqueId);
  };

  const deleteCategory = (uniqueId) => {
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
          API.delete(`/category/${uniqueId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              getCategory();
            } else if (response.data.error) {
              toast.success(response.data.error);
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
      name: "S.NO",
      selector: (row) =>
        loading ? <Skeleton height={25} width={30} /> : [row.uniqueId],
      sortable: true,
    },
    {
      name: "ICON",
      selector: (row) =>
        loading ? (
          <Skeleton height={25} width={53} />
        ) : (
          <img
            src={
              !row?.category_icon?.[0]
                ? defaultIcon
                : `http://localhost:5000/${row?.category_icon?.[0]}`
            }
            width={53}
            alt=""
          />
        ),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) =>
        loading ? <Skeleton height={25} width={100} /> : [row.category_name],
      sortable: true,
    },
    {
      name: "PARENT CATEGORY",
      selector: (row) =>
        loading ? <Skeleton height={25} width={120} /> : [row.parent_category],
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
          <Skeleton height={25} width={130} />
        ) : (
          <>
            {authPermissions?.some(
              (items) => items.value === "Read Category"
            ) && (
              <button
                key={`${row._id}-view`}
                data-bs-toggle="tooltip"
                title="View"
                className="btn btn-primary me-1"
                onClick={() => viewCategory(row._id)}
              >
                <i className="fe fe-eye"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Update Category"
            ) && (
              <button
                key={`${row._id}-edit`}
                data-bs-toggle="tooltip"
                title="Edit"
                className="btn btn-success me-1"
                onClick={() => editCategory(row._id)}
              >
                <i className="fe fe-edit"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Delete Category"
            ) && (
              <button
                key={`${row._id}-delete`}
                data-bs-toggle="tooltip"
                title="Delete"
                className="btn btn-danger"
                onClick={() => deleteCategory(row._id)}
              >
                <i className="fe fe-trash"></i>
              </button>
            )}
          </>
        ),
    },
  ];

  const data = loading ? Array(5).fill({}) : category;
  const tableData = { columns, data };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Category</h1>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item>Category List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link to="/dashboard/category/add/" className="btn btn-primary">
              <span>
                <i className="fe fe-plus me-1"></i>
              </span>
              Add Category
            </Link>
          </div>
        </div>
        <Row className="row-sm">
          <Col lg={12}>
            <Card className="custom-card">
              <Card.Body>
                <div className="table-responsive">
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
                        aria-label="Category List Table"
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

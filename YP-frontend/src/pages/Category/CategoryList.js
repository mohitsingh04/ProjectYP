import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { API } from "../../context/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

export default function CategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const getCategory = useCallback(() => {
    try {
      dispatch(showLoading());
      API.get("/category").then(({ data }) => {
        dispatch(hideLoading());
        setCategory(data);
      });
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  }, [dispatch]);

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
          dispatch(showLoading());
          API.delete(`/category/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            if (response.data.message) {
              toast.success(response.data.message);
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
        getCategory();
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
          src={`http://localhost:5000/${row.category_icon[0]}`}
          width={53}
          alt=""
        />,
      ],
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => [row.category_name],
      sortable: true,
    },
    {
      name: "PARENT CATEGORY",
      selector: (row) => [row.parent_category],
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
      name: "Action",
      selector: (row) => [
        <button
          data-bs-toggle="tooltip"
          title="View"
          onClick={() => viewCategory(row.uniqueId)}
        >
          <i className="fe fe-eye"></i>
        </button>,
        <button
          data-bs-toggle="tooltip"
          title="Edit"
          onClick={() => editCategory(row.uniqueId)}
        >
          <i className="fe fe-edit"></i>
        </button>,
        <button
          data-bs-toggle="tooltip"
          title="Delete"
          onClick={() => deleteCategory(row.uniqueId)}
        >
          <i className="fe fe-trash"></i>
        </button>,
      ],
    },
  ];

  const data = category;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Category</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                <Link to="/dashboard/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Category List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link
              to="/dashboard/category/add/"
              className="btn btn-primary btn-icon text-white me-3"
            >
              <span>
                <i className="fe fe-plus"></i>&nbsp;
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

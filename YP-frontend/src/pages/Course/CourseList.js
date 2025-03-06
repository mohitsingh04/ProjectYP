import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Swal from "sweetalert2";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import DataRequest from "../../context/DataRequest";
import defaultCourse from "../../Images/defaultcourse.webp";
import Skeleton from "react-loading-skeleton";

export default function CourseList() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getCourse = useCallback(() => {
    try {
      API.get("/course").then(({ data }) => {
        setCourse(data);
        setLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  const viewCourse = (uniqueId) => {
    navigate("/dashboard/course/view/" + uniqueId);
  };

  const editCourse = (uniqueId) => {
    navigate("/dashboard/course/edit/" + uniqueId);
  };

  const deleteCourse = (uniqueId) => {
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
          API.delete(`/course/${uniqueId}`).then((response) => {
            toast.success(response.data.message);
            getCourse();
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
      name: "IMAGE",
      selector: (row) =>
        loading ? (
          <Skeleton height={25} width={53} />
        ) : (
          <img
            src={
              !row?.image?.[0]
                ? defaultCourse
                : `http://localhost:5000/${row?.image?.[0]}`
            }
            width={53}
            alt={!row?.image?.[0] ? defaultCourse : row?.image?.[0]}
          />
        ),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) =>
        loading ? <Skeleton height={25} width={100} /> : [row.course_name],
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
          <Skeleton height={25} width={100} />
        ) : (
          <>
            {authPermissions?.some(
              (items) => items.value === "Read Course"
            ) && (
              <button
                key={`${row._id}-view`}
                data-bs-toggle="tooltip"
                title="View"
                className="btn btn-primary me-1"
                onClick={() => viewCourse(row._id)}
              >
                <i className="fe fe-eye"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Update Course"
            ) && (
              <button
                key={`${row._id}-edit`}
                data-bs-toggle="tooltip"
                title="Edit"
                className="btn btn-success me-1"
                onClick={() => editCourse(row._id)}
              >
                <i className="fe fe-edit"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Delete Course"
            ) && (
              <button
                key={`${row._id}-delete`}
                data-bs-toggle="tooltip"
                title="Delete"
                className="btn btn-danger"
                onClick={() => deleteCourse(row._id)}
              >
                <i className="fe fe-trash-2"></i>
              </button>
            )}
          </>
        ),
    },
  ];

  const data = loading ? Array(5).fill({}) : course;

  const tableData = { columns, data };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item>Course List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link to="/dashboard/course/add/" className="btn btn-primary">
              <span>
                <i className="fe fe-plus me-1"></i>
              </span>
              Add Course
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
    </>
  );
}

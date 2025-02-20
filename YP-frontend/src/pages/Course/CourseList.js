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
import DataRequest from "../../context/DataRequest";
import defaultCourse from "../../Images/defaultcourse.webp";

export default function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = () => {
    try {
      API.get("/course").then(({ data }) => {
        setCourse(data);
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

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
          dispatch(showLoading());
          API.delete(`/course/${uniqueId}`).then((response) => {
            dispatch(hideLoading());
            toast.success(response.data.message);
            getCourse();
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
      name: "S.NO",
      selector: (row) => [row.uniqueId],
      sortable: true,
    },
    {
      name: "IMAGE",
      selector: (row) =>
        row?.image?.[0] === null ? (
          <img src={defaultCourse} width={53} alt={defaultCourse} />
        ) : (
          <img
            src={`http://localhost:5000/${row?.image?.[0]}`}
            width={53}
            alt={"Course"}
          />
        ),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => [row.course_name],
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => (
        <>
          {row.status === "Active" ? (
            <span key={`${row._id}-active`} className="badge bg-success">
              {row.status}
            </span>
          ) : row.status === "InActive" ? (
            <span key={`${row._id}-inactive`} className="badge bg-danger">
              {row.status}
            </span>
          ) : (
            <span key={`${row._id}-other`} className="badge bg-warning">
              {row.status}
            </span>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row) => (
        <>
          {authPermissions?.some((items) => items.value === "Read Course") && (
            <button
              key={`${row._id}-view`}
              data-bs-toggle="tooltip"
              title="View"
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
              onClick={() => deleteCourse(row._id)}
            >
              <i className="fe fe-trash-2"></i>
            </button>
          )}
        </>
      ),
    },
  ];

  const data = course;

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Course</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard/" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Course List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link
              to="/dashboard/course/add/"
              className="btn btn-primary btn-icon text-white me-3"
            >
              <span>
                <i className="fe fe-plus"></i>&nbsp;
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

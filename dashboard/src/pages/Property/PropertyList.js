import React, { useCallback, useEffect, useState } from "react";
import { Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { API } from "../../context/Api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DataRequest from "../../context/DataRequest";
import defautLogo from "../../Images/defaultPropertyLogo.jpeg";
import Skeleton from "react-loading-skeleton";

export default function PropertyList() {
  const navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const mainUser = DataRequest();
  const [authPermissions, setAuthPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthPermissions(mainUser?.User?.permissions);
  }, [mainUser]);

  const getProperty = useCallback(async () => {
    await API.get("/property")
      .then(({ data }) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const viewProperty = (objectId) => {
    navigate("/dashboard/property/view/" + objectId);
  };

  const deleteProperty = (objectId) => {
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
          API.delete(`/property/${objectId}`).then((response) => {
            if (response.data.message) {
              toast.success(response.data.message);
              getProperty();
            } else if (response.data.error) {
              toast.success(response.data.error);
            }
          });
        }
      })
      .catch((error) => {
        console.error(error?.message);
      });
  };

  const handleLoadImage = useCallback((img) => {
    if (img) {
      const x = img.split("/");
      if (x.length > 2) {
        return (
          <img
            key={img}
            src={`${process.env.REACT_APP_MEDIA_URL}/${img}`}
            width={53}
            alt=""
          />
        );
      } else if (x.length < 2) {
        return (
          <img
            key={img}
            src={`${process.env.REACT_APP_MEDIA_URL}/images/${img}`}
            width={53}
            alt=""
          />
        );
      }
    }
    return <img key={`default Logo`} src={defautLogo} width={53} alt="" />;
  }, []);

  const columns = [
    {
      name: "S.NO",
      selector: (row) =>
        loading ? <Skeleton height={25} width={30} /> : row.uniqueId,
      sortable: true,
    },
    {
      name: "Logo",
      selector: (row) =>
        loading ? (
          <Skeleton height={25} width={53} />
        ) : (
          handleLoadImage(row?.property_logo?.[0])
        ),
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) =>
        loading ? <Skeleton height={25} width={100} /> : row.property_name,
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
          <div key={`actions-${row._id}`} className="action-buttons">
            {authPermissions?.some(
              (items) => items.value === "Read Property"
            ) && (
              <button
                key={`view-${row._id}`}
                data-bs-toggle="tooltip"
                title="View"
                className="me-1"
                onClick={() => viewProperty(row._id)}
              >
                <i className="fe fe-eye"></i>
              </button>
            )}
            {authPermissions?.some(
              (items) => items.value === "Delete Property"
            ) && (
              <button
                key={`delete-${row._id}`}
                data-bs-toggle="tooltip"
                title="Delete"
                onClick={() => deleteProperty(row._id)}
              >
                <i className="fe fe-trash-2"></i>
              </button>
            )}
          </div>
        ),
    },
  ];

  const data = loading
    ? Array(5).fill({})
    : mainUser?.User?.role === "Property Manager"
    ? property.filter((item) => item.userId === mainUser?.User?.uniqueId)
    : property;
  const tableData = { columns, data };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Property</h1>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item>Property List</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          {authPermissions?.some(
            (items) => items.value === "Create Property"
          ) && (
            <Link to="/dashboard/property/add/" className="btn btn-primary">
              <span>
                <i className="fe fe-plus"></i>&nbsp;
              </span>
              Add Property
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
  );
}

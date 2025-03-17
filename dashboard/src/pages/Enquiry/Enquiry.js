import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { API } from "../../context/Api";

export default function Enquiry() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);

  const getEnquires = useCallback(async () => {
    try {
      const response = await API.get(`/enquiry`);
      setEnquiries(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, []);

  useEffect(() => {
    getEnquires();
  }, [getEnquires]);

  const handleSoftDelete = async (id) => {
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
          const response = await API.delete(`/enquiry/soft/${id}`);
          toast.success(response.data.message);
          Swal.fire("Deleted!", "The record has been soft deleted.", "success");
          getEnquires();
        } catch (error) {
          toast.error(error.response?.data?.error || "An error occurred");
          Swal.fire("Error!", "Failed to delete the record.", "error");
        }
      }
    });
  };
  const columns = [
    {
      name: "Property",
      selector: (row) =>
        loading ? <Skeleton width={100} /> : row.property_name,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => (loading ? <Skeleton width={100} /> : row.name),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (loading ? <Skeleton width={150} /> : row.email),
    },
    {
      name: "People",
      selector: (row) => (loading ? <Skeleton width={50} /> : row.people),
    },
    {
      name: "City",
      selector: (row) => (loading ? <Skeleton width={100} /> : row.city),
    },
    {
      name: "Status",
      selector: (row) => (loading ? <Skeleton width={80} /> : row.status),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) =>
        loading ? (
          <Skeleton width={120} />
        ) : (
          <>
            <Link
              to={`/dashboard/enquiry/${row._id}`}
              key={`view-${row._id}`}
              className="btn btn-primary me-1"
            >
              <i className="fe fe-eye"></i>
            </Link>
            <button
              key={`delete-${row._id}`}
              className="btn btn-danger"
              onClick={() => handleSoftDelete(row._id)}
            >
              <i className="fe fe-trash"></i>
            </button>
          </>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(enquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "enquiries.xlsx");
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Enquiry</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
                Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Enquiry List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              <span>
                <i className="fe fe-arrow-left"></i>&nbsp;
              </span>
              Back
            </button>
          </div>
        </div>

        <Row className=" row-sm">
          <Col lg={12}>
            <Card>
              <Card.Header>
                <h3 className="card-title">Enquires</h3>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive export-table">
                  <div className="mb-3 d-flex justify-content-end">
                    <CSVLink
                      data={enquiries}
                      filename="enquiries.csv"
                      className="btn btn-primary me-2"
                    >
                      Download CSV
                    </CSVLink>
                    <Button variant="success" onClick={exportToExcel}>
                      Download Excel
                    </Button>
                  </div>
                  <DataTableExtensions columns={columns} data={enquiries}>
                    <DataTable
                      noHeader
                      defaultSortField="name"
                      defaultSortAsc={true}
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

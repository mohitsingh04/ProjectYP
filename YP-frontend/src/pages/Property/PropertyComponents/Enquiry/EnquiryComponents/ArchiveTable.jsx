import React from "react";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { API } from "../../../../../context/Api";
import { toast } from "react-toastify";

export default function ArchiveTable({
  archiveData,
  loading,
  setIsViewingArchive,
  getArchiveEnquiry,
}) {
  const handleDelete = async (id) => {
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
          const response = await API.delete(`/archive/enquiry/${id}`);
          toast.success(response.data.message);
          Swal.fire("Deleted!", "The record has been soft deleted.", "success");
          getArchiveEnquiry();
        } catch (error) {
          toast.error(error.response?.data?.error || "An error occurred");
          Swal.fire("Error!", "Failed to delete the record.", "error");
        }
      }
    });
  };
  const columns = [
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
            <button
              key={`view-${row._id}`}
              className="btn btn-primary me-1"
              onClick={() => setIsViewingArchive(row._id)}
            >
              <i className="fe fe-eye"></i>
            </button>
            <button
              key={`delete-${row._id}`}
              className="btn btn-danger"
              onClick={() => handleDelete(row._id)}
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
    const worksheet = XLSX.utils.json_to_sheet(archiveData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "enquiries.xlsx");
  };

  return (
    <Card>
      <Card.Header>
        <h5>
          <strong>All Archive Enquiries</strong>
        </h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3 d-flex justify-content-end">
          <CSVLink
            data={archiveData}
            filename="enquiries.csv"
            className="btn btn-primary me-2"
          >
            Download CSV
          </CSVLink>
          <Button variant="success" onClick={exportToExcel}>
            Download Excel
          </Button>
        </div>
        <DataTableExtensions columns={columns} data={archiveData}>
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
      </Card.Body>
    </Card>
  );
}

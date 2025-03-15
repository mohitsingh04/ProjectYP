import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../context/Api";

export default function EnquiryView() {
  const { objectId } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState("");

  const getEnquiry = useCallback(async () => {
    try {
      const response = await API.get(`/enquiry/${objectId}`);
      setEnquiry(response.data);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [objectId]);
  useEffect(() => {
    getEnquiry();
  }, [getEnquiry]);
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
                linkAs={Link}
                linkProps={{ to: "/dashboard/enquiry" }}
              >
                Enquiry
              </Breadcrumb.Item>
              <Breadcrumb.Item>{enquiry?.name}</Breadcrumb.Item>
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
                <Table responsive striped>
                  <tbody>
                    {Object.entries(enquiry || {})
                      .filter(
                        ([key]) =>
                          ![
                            "_id",
                            "property_id",
                            "createdAt",
                            "updatedAt",
                            "__v",
                          ].includes(key)
                      )
                      .map(([key, value]) => (
                        <tr key={key}>
                          <th>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </th>
                          <td>
                            {key === "date"
                              ? new Date(value).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : value}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { API } from "../../../../../context/Api";

export default function ArchiveView({ isViewing, setIsViewing }) {
  const [enquiry, setEnquiry] = useState("");
  const getEnqiryByObjectId = useCallback(async () => {
    try {
      const response = await API.get(`/archive/enquiry/${isViewing}`);
      setEnquiry(response.data);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [isViewing]);

  useEffect(() => {
    getEnqiryByObjectId();
  }, [getEnqiryByObjectId]);

  return (
    <>
      <div className="tab-pane Enquirytab show">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <h5>
              <strong>Archive Enquiry</strong>
            </h5>
            <button
              className="btn btn-primary"
              onClick={() => setIsViewing(null)}
            >
              Back
            </button>
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
      </div>
    </>
  );
}

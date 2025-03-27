import API from "@/service/API/API";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

interface Property {
  uniqueId: string;
  property_name: string;
  property_city: string;
  property_state: string;
  status: string;
  property_logo?: string[];
}

export default function CategorySuggestions() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  const getAllProperties = useCallback(async () => {
    try {
      const response = await API.get<Property[]>("/property");
      let filteredData = response.data;

      filteredData = filteredData.filter((item) => item?.status === "Active");

      const randomProperties = filteredData
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      setAllProperties(randomProperties);
    } catch (error) {
      console.error((error as any)?.message);
    }
  }, []);

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  return (
    <div className="card include-sec">
      <div className="card-body">
        <h5>Related Institutes</h5>
        <Table responsive borderless>
          <tbody>
            {allProperties.length > 0 ? (
              allProperties.map((property) => (
                <tr key={property.uniqueId}>
                  <td>
                    <div className="d-flex">
                      <img
                        src={
                          property?.property_logo?.[0]
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${property.property_logo[0]}`
                            : "/Images/PropertyBanner.png"
                        }
                        width={50}
                        style={{
                          aspectRatio: "4/4",
                          objectFit: "cover",
                        }}
                        className="rounded"
                        alt={property.property_name}
                      />
                      <div className="ps-3">
                        <Link
                          href={`/property/${
                            property.uniqueId
                          }/${property.property_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${property.property_city
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {property.property_name}
                        </Link>
                        <h6 className="text-muted m-0">
                          {property.property_city}, {property.property_state}
                        </h6>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No suggestions available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

"use client";
import API from "@/service/API/API";
import { useEffect, useState } from "react";

interface AmenityItem {
  [key: string]: string | boolean;
}

interface AmenityCategory {
  [category: string]: AmenityItem[];
}

interface AmenitiesData {
  selectedAmenities: AmenityCategory[];
}

interface Property {
  uniqueId: string;
}

interface AmenitiesProps {
  property: Property | null;
}

export default function Amenities({ property }: AmenitiesProps) {
  const [amenities, setAmenities] = useState<AmenitiesData | null>(null);

  const getAmenities = async () => {
    try {
      const response = await API.get(
        `/property/amenities/${property?.uniqueId}`
      );
      setAmenities(response.data);
    } catch (error) {
      console.error((error as any)?.message);
    }
  };

  useEffect(() => {
    if (property) {
      getAmenities();
    }
  }, [property]);

  return (
    <>
      {amenities?.selectedAmenities?.length ? (
        <div className="row">
          {amenities.selectedAmenities.map((amenityCategory, index) =>
            Object.entries(amenityCategory).map(([category, items]) => (
              <div className="card" key={`${category}-${index}`}>
                <div className="card-body">
                  <div className="col-md-4">
                    <h5 className="subs-title">{category}</h5>
                    <ul className="d-flex flex-column">
                      {items.map((item, i) =>
                        Object.entries(item).map(([key, value]) => (
                          <li key={`${key}-${i}`}>
                            <img
                              src="/img/icon/import.svg"
                              className="me-2"
                              alt="Img"
                            />
                            {key}
                            {value && value !== true ? `: ${value}` : ""}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>No amenities available</p>
      )}
    </>
  );
}

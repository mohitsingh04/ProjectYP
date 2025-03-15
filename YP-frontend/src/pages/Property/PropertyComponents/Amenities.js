import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../../context/Api";
import AddAmenities from "./AmenitiesComponents/AddAmenities";
import EditAmenities from "./AmenitiesComponents/EditAmenites";

export default function Amenities() {
  const { objectId } = useParams();
  const [toggleAmenitiesPage, setToggleAmenitiesPage] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [property, setProperty] = useState("");

  const fetchProperties = useCallback(async () => {
    const response = await API.get(`/property/${objectId}`);
    setProperty(response.data);
  }, [objectId]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const fetchAmenities = useCallback(async () => {
    try {
      const response = await API.get("/amenities");
      const filteredAmenities = response.data.filter(
        (amenities) => amenities.propertyId === Number(property?.uniqueId)
      );
      setAmenities(filteredAmenities);
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  }, [property]);

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  const handleHideAmenitiesPage = () => {
    setToggleAmenitiesPage(false);
  };

  const handleShowAmenitiesPage = () => {
    setToggleAmenitiesPage(true);
  };

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header>
          <div className="media-heading">
            <h5>
              {amenities.length > 0 ? (
                toggleAmenitiesPage ? (
                  <strong>Amenities</strong>
                ) : (
                  <strong>Edit Amenities</strong>
                )
              ) : (
                <strong>Add Amenities</strong>
              )}
            </h5>
          </div>
          <div className="ms-auto">
            {amenities.length > 0 ? (
              toggleAmenitiesPage ? (
                <button onClick={handleHideAmenitiesPage}>
                  <i className="fe fe-edit"></i>
                </button>
              ) : (
                <button onClick={handleShowAmenitiesPage}>
                  <i className="fe fe-x"></i>
                </button>
              )
            ) : null}
          </div>
        </Card.Header>
        <Card.Body>
          {amenities.length > 0 ? (
            toggleAmenitiesPage ? (
              <>
                {amenities.length > 0 ? (
                  <div className="row">
                    {amenities[0]?.selectedAmenities?.map(
                      (amenityCategory, index) =>
                        Object.entries(amenityCategory).map(
                          ([category, items]) => (
                            <div
                              key={`${category}-${index}`}
                              className="col-md-4"
                            >
                              <h6 className="font-bold">{category}</h6>
                              <ul>
                                {Array.isArray(items) &&
                                  items.map((item, i) =>
                                    Object.entries(item).map(([key, value]) => (
                                      <li key={i}>
                                        • {key}
                                        {value && value !== true
                                          ? `: ${value}`
                                          : ""}
                                      </li>
                                    ))
                                  )}
                              </ul>
                            </div>
                          )
                        )
                    )}
                  </div>
                ) : (
                  <p>No amenities available</p>
                )}
              </>
            ) : (
              <EditAmenities property={property} />
            )
          ) : (
            <AddAmenities getAmenities={fetchAmenities} />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default function Amenities({ amenities }) {
  return (
    <>
      {amenities?.selectedAmenities &&
      Array.isArray(amenities.selectedAmenities) &&
      amenities.selectedAmenities.length > 0 ? (
        <div className="row">
          {amenities.selectedAmenities.map((amenityCategory, index) =>
            Object.entries(amenityCategory).map(([category, items]) => (
              <div className="card" key={`${category}-${index}`}>
                <div className="card-body">
                  <div className="col-md-4">
                    <h5 className="subs-title">{category}</h5>
                    <ul className="d-flex flex-column">
                      {Array.isArray(items) &&
                        items.map((item, i) =>
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

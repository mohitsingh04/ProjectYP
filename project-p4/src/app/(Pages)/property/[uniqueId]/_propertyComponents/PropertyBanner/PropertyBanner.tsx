import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface Property {
  property_logo?: string[];
  property_name?: string;
  property_address?: string;
  property_city?: string;
  property_pincode?: string;
  property_state?: string;
  featured_image?: string;
}

interface PropertyBannerProps {
  property: Property | null;
}

export default function PropertyBanner({ property }: PropertyBannerProps) {
  const style = {
    background: `url(${process.env.NEXT_PUBLIC_API_URL}${
      property?.featured_image?.[0] || ""
    }) no-repeat center center`,
  };
  return (
    <div className="inner-banner" style={style}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex">
              <div className="instructor-wrap border-bottom-0 m-0">
                <div className="about-instructor align-items-center">
                  <div className="abt-instructor-img">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${
                        property?.property_logo?.[0] || ""
                      }`}
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
                {/* <span className="web-badge mb-3">WEB DEVELOPMENT</span> */}
              </div>
              <div className="align-content-center">
                <h2>{property?.property_name || "No Name"}</h2>
                <p>
                  {property?.property_address || "Address not available"},{" "}
                  {property?.property_city || "City not available"},{" "}
                  {property?.property_pincode || "000000"} ,{" "}
                  {property?.property_state || "State not available"}
                </p>
              </div>
            </div>
            <div className="rating mb-2">
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star filled" />
              <FaStar className="star" />
              <span className="d-inline-block average-rating">
                <span>4.5</span> (15)
              </span>
            </div>
            <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
              <div className="cou-info">
                <img src="/img/icon/icon-01.svg" alt="Img" />
                <p>12+ Lesson</p>
              </div>
              <div className="cou-info">
                <img src="/img/icon/timer-icon.svg" alt="Img" />
                <p>9hr 30min</p>
              </div>
              <div className="cou-info">
                <img src="/img/icon/people.svg" alt="Img" />
                <p>32 students enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

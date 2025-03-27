import API from "@/service/API/API";
import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Property {
  uniqueId: string;
  property_logo?: string[];
  property_name?: string;
  property_address?: string;
  property_city?: string;
  property_pincode?: string;
  property_state?: string;
  featured_image?: string;
}

interface Review {
  rating: number;
}

interface PropertyBannerProps {
  property: Property | null;
  reviews: Review[];
}

export default function PropertyBanner({
  property,
  reviews,
}: PropertyBannerProps) {
  const [propertyCourses, setPropertyCourses] = useState([]);

  const getPropertyCourses = useCallback(async () => {
    try {
      const response = await API.get(
        `/property/property-course/${property?.uniqueId}`
      );
      setPropertyCourses(response.data);
    } catch (error) {
      console.error((error as any)?.message);
    }
  }, [property]);

  useEffect(() => {
    getPropertyCourses();
  }, [getPropertyCourses]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;
  const roundedRating = Math.round(averageRating);

  const style = {
    backgroundImage: `url(${
      property?.featured_image?.[0]
        ? process.env.NEXT_PUBLIC_MEDIA_URL + property?.featured_image?.[0]
        : "/Images/PropertyBanner.png"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
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
                      src={
                        property?.property_logo?.[0]
                          ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${property?.property_logo?.[0]}`
                          : "/Images/PropertyBanner.png"
                      }
                      alt="img"
                      className="img-fluid"
                    />
                  </div>
                </div>
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
            {/* Dynamic Rating */}
            <div className="d-flex">
              <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                <div className="cou-info text-nowrap">
                  <img src="/img/icon/icon-01.svg" alt="Img" />
                  <p>{propertyCourses?.length || 0}+ Lesson</p>
                </div>
              </div>
              <div className="rating align-content-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`star ${index < roundedRating ? "filled" : ""}`}
                  />
                ))}
                <span className="d-inline-block average-rating">
                  <span className="text-white ms-2">{roundedRating}</span> (
                  {totalReviews})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

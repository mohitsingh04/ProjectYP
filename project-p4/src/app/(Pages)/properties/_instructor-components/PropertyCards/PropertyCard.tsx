import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function PropertyCard({ property }) {
  const [rating, setRating] = useState(0);
  const [ratingLength, setRatingLength] = useState(0);
  const [coursesLength, setCoursesLength] = useState(0);

  useEffect(() => {
    if (!property?.uniqueId) return;

    const getCourses = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/property/property-course/${property.uniqueId}`
        );
        setCoursesLength(data.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const getReviews = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/review/property/${property.uniqueId}`
        );

        const totalRating = data.reduce(
          (sum, review) => sum + (review.rating || 0),
          0
        );

        setRatingLength(data.length);
        setRating(totalRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getCourses();
    getReviews();
  }, [property?.uniqueId]);

  const averageRating =
    ratingLength > 0 ? (rating / ratingLength).toFixed(1) : "0.0";
  const filledStars = ratingLength > 0 ? Math.round(rating / ratingLength) : 0;

  return (
    <div className="col-lg-12 d-flex">
      <div className="instructor-list flex-fill">
        <div className="instructor-img">
          <img
            src={
              property?.property_logo?.[0]
                ? `${process.env.NEXT_PUBLIC_API_URL}${property.property_logo[0]}`
                : "/img/course/course-01.jpg"
            }
            alt={property?.property_name || "Property Image"}
            className="img-fluid"
          />
        </div>
        <div className="instructor-content">
          <h5>
            <Link href={`/property/${property?.uniqueId}`}>
              {property?.property_name}
            </Link>
          </h5>
          <h6>{property?.category}</h6>
          <div className="instructor-info">
            <div className="rating-img d-flex align-items-center">
              <img src="/img/icon/icon-01.svg" className="me-1" alt="Courses" />
              <p>{coursesLength}+ Courses</p>
            </div>
            <div className="rating">
              {[...Array(filledStars)].map((_, i) => (
                <FaStar key={`filled-${i}`} className="star filled" />
              ))}
              {[...Array(5 - filledStars)].map((_, i) => (
                <FaStar key={`empty-${i}`} className="star" />
              ))}
              <span className="d-inline-block average-rating">
                <span>{averageRating}</span> ({ratingLength})
              </span>
            </div>
            <a href="#rate" className="rating-count">
              <FaRegHeart />
            </a>
          </div>
          <div className="instructor-badge">
            <span className="web-badge">{property?.property_address}</span>
            <span className="web-badge">{property?.property_city}</span>
            <span className="web-badge">{property?.property_state}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

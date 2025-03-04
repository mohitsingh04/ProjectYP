import { FaStar } from "react-icons/fa";

interface ReviewProps {
  review: {
    name: string;
    rating: number;
    review: string;
  };
}

export default function Review({ review }: ReviewProps) {
  return (
    <div className="card-body">
      {/* <h5 className="subs-title">Reviews</h5> */}
      <div className="instructor-wrap">
        <div className="about-instructor">
          <div className="abt-instructor-img">
            <img src="/img/user/user2.jpg" alt="img" className="img-fluid" />
          </div>
          <div className="instructor-detail">
            <h5>{review.name}</h5>
            {/* <p>UX/UI Designer</p> */}
          </div>
        </div>
        <div className="rating">
          {Array(review.rating)
            .fill(null)
            .map((_, index) => (
              <FaStar className="star filled" key={index} />
            ))}
          {Array(5 - review.rating)
            .fill(null)
            .map((_, index) => (
              <FaStar className="star" key={index} />
            ))}
          <span className="d-inline-block average-rating">4.5 Rating</span>
        </div>
      </div>
      <p className="rev-info">“ {review.review} “</p>
    </div>
  );
}

import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Courses({ course }) {
  return (
    <div className="col-md-6 d-flex">
      <div className="course-box d-flex aos" data-aos="fade-up">
        <div className="product">
          <div className="product-img">
            <a href="course-details.html">
              <img
                className="img-fluid"
                alt="Course"
                src={
                  course?.image?.[0]
                    ? `${process.env.NEXT_PUBLIC_API_URL}${course?.image?.[0]}`
                    : "/img/course/course-01.jpg"
                }
                style={{ aspectRatio: "4/3", objectFit: "cover" }}
              />
            </a>
            <div className="price">
              <h3>
                ${course?.price} <span>${course?.price}</span>
              </h3>
            </div>
          </div>
          <div className="product-content">
            <div className="course-group d-flex">
              <div className="course-group-img d-flex">
                <div className="course-name">
                  <h4>{course?.course_short_name}</h4>
                  <p>{course?.course_type}</p>
                </div>
              </div>
              <div className="course-share d-flex align-items-center justify-content-center">
                <a href="#">
                  <FaRegHeart className="icon" />
                </a>
              </div>
            </div>
            <h3 className="title instructor-text">
              <a href="course-details.html">{course?.course_name}</a>
            </h3>
            <div className="course-info d-flex align-items-center">
              <div className="rating-img d-flex align-items-center">
                <img src="/img/icon/icon-01.svg" alt="Lessons" />
                <p>{course?.course_level}</p>
              </div>
              <div className="course-view d-flex align-items-center">
                <img src="/img/icon/icon-02.svg" alt="Duration" />
                <p>{course?.duration}</p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="rating m-0">
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star filled" />
                <FaStar className="star" />
                <span className="d-inline-block average-rating">
                  <span>4.0</span> (15)
                </span>
              </div>
              <div className="all-btn all-category d-flex align-items-center">
                <a href="checkout.html" className="btn btn-primary">
                  BUY NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

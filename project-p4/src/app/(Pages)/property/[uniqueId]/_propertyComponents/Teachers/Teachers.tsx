import { FaStar } from "react-icons/fa";

interface Teacher {
  teacher_name: string;
  designation: string;
  profile?: string[];
}

interface TeacherProps {
  teacher: Teacher;
}

export default function Teachers({ teacher }: TeacherProps) {
  return (
    <div className="card instructor-sec">
      <div className="card-body">
        <div className="instructor-wrap">
          <div className="about-instructor">
            <div className="abt-instructor-img">
              <a href="instructor-profile.html">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${teacher?.profile?.[0]}`}
                  alt="img"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="instructor-detail">
              <h5>
                <a href="instructor-profile.html">{teacher?.teacher_name}</a>
              </h5>
              <p>{teacher?.designation}</p>
            </div>
          </div>
          <div className="rating">
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star filled" />
            <FaStar className="star" />
            <span className="d-inline-block average-rating">
              4.5 Instructor Rating
            </span>
          </div>
        </div>
        <div className="course-info d-flex align-items-center">
          <div className="cou-info">
            <img src="/img/icon/play.svg" alt="Img" />
            <p>5 Courses</p>
          </div>
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
            <p>270,866 students enrolled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

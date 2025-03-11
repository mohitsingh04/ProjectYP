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
    <>
      <div className="instructors-widget">
        <div className="instructors-img ">
          <a href="instructor-list.html">
            <img
              className="img-fluid"
              alt="Img"
              style={{ aspectRatio: "3/3", objectFit: "cover" }}
              src={
                teacher?.profile?.[0]
                  ? `${process.env.NEXT_PUBLIC_API_URL}${teacher?.profile?.[0]}`
                  : "/img/user/user1.jpg"
              }
            />
          </a>
        </div>
        <div className="instructors-content text-center">
          <h5>{teacher?.teacher_name}</h5>
          <p>{teacher?.designation}</p>
          <div className="student-count d-flex justify-content-center">
            <span>{teacher?.experience}</span>
          </div>
        </div>
      </div>
    </>
  );
}

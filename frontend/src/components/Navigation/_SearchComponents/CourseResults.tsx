import Link from "next/link";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaDatabase } from "react-icons/fa";

interface Course {
  uniqueId: string;
  course_name: string;
  course_short_name?: string;
  image?: string[];
}

interface CourseResultsProps {
  Results: Course[];
  handleClose: () => void;
}

export default function CourseResults({
  Results,
  handleClose,
}: CourseResultsProps) {
  return (
    <div>
      <ListGroup>
        {Results.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="border-0 p-0"
            style={{ fontSize: "18px" }}
          >
            <Link
              href={`/course/${item.uniqueId}/${item.course_name
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              onClick={handleClose}
            >
              <div className="bg-light p-2 border d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    src={
                      item.image?.[0]
                        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${item.image[0]}`
                        : "/img/course/course-01.jpg"
                    }
                    className="me-2 rounded"
                    width={"50px"}
                    style={{ aspectRatio: "4/4", objectFit: "cover" }}
                    alt={item.course_name}
                  />
                  <div>
                    <p className="m-0">
                      {item.course_name}
                      {item.course_short_name
                        ? ` - [${item.course_short_name}]`
                        : ""}
                    </p>
                    <span className="text-muted">(Course)</span>
                  </div>
                </div>
                <div className="align-content-center">
                  <span className="text-muted me-3 fs-6">
                    <FaDatabase /> Course
                  </span>
                </div>
              </div>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

"use client";
import API from "@/service/API/API";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

interface Course {
  course_name?: string;
  course_level?: string;
  duration?: string;
  course_type?: string;
  course_short_name?: string;
  description?: string;
  image?: string[];
  uniqueId?: string;
}

export default function page() {
  const [courese, setCourse] = useState<Course | null>({});

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const { uniqueId, course_name } = useParams();

  const name =
    typeof course_name === "string" ? course_name?.replace(/-/g, " ") : "";
  useEffect(() => {
    if (courese?.course_name) {
      const formattedName = courese.course_name.toLowerCase();
      if (formattedName !== name.toLowerCase()) {
        notFound();
      }
    }
  }, [courese?.course_name]);

  const getCourse = async () => {
    const response = await API.get(`/property-course/uniqueId/${uniqueId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    getCourse();
  }, []);

  const getAllCourse = useCallback(async () => {
    try {
      const response = await API.get("/course");
      let all = response.data;

      if (courese) {
        // Fix the typo here
        all = all.filter(
          (item: { uniqueId: string }) => item.uniqueId !== courese.uniqueId
        );
      }

      const randomCourses = all.sort(() => 0.5 - Math.random()).slice(0, 5);

      setAllCourses(randomCourses);
    } catch (error) {
      console.error((error as any)?.message);
    }
  }, [courese]);

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  return (
    <>
      <section className="page-content">
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Courses
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        {courese?.course_name}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="blog">
                  <div className="blog-image">
                    <img
                      className="img-fluid"
                      src={
                        courese?.image?.[0]
                          ? `${process.env.NEXT_PUBLIC_API_URL}/${
                              courese?.image?.[0] || ""
                            }`
                          : "/Images/CourseBanner.webp"
                      }
                      style={{
                        maxHeight: "250px",
                        objectFit: "cover",
                      }}
                      alt="Post Image"
                    />
                  </div>
                  <div className="blog-info clearfix">
                    <div className="post-left">
                      <ul>
                        <li>
                          <div className="post-author">
                            <img
                              src="/img/icon/icon-01.svg"
                              alt="Post Author"
                            />{" "}
                            <span>{courese?.course_level}</span>
                          </div>
                        </li>
                        <li>
                          <img
                            className="img-fluid"
                            src="/img/icon/icon-22.svg"
                            alt="Img"
                          />
                          {courese?.duration}
                        </li>
                        <li>
                          <img
                            className="img-fluid"
                            src="/img/icon/icon-23.svg"
                            alt="Img"
                          />
                          {courese?.course_type}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h3 className="blog-title">
                    {courese?.course_name}{" "}
                    {courese?.course_short_name &&
                      `(${courese?.course_short_name})`}
                  </h3>
                  <div className="blog-content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: courese?.description ?? "",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-12 sidebar-right theiaStickySidebar">
                <div className="card post-widget blog-widget">
                  <div className="card-header">
                    <h4 className="card-title">Related Courses</h4>
                  </div>
                  <div className="card-body">
                    <Table responsive borderless>
                      <tbody>
                        {allCourses.map((suggestion, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex">
                                <img
                                  src={
                                    suggestion?.image?.[0]
                                      ? `${process.env.NEXT_PUBLIC_API_URL}/${suggestion?.image?.[0]}`
                                      : "/Images/CourseBanner.webp"
                                  }
                                  width={50}
                                  style={{
                                    aspectRatio: "4/4",
                                    objectFit: "cover",
                                  }}
                                  className="rounded"
                                  alt=""
                                />
                                <div className="ps-3">
                                  <Link
                                    href={`/course/${
                                      suggestion?.uniqueId
                                    }/${suggestion?.course_name
                                      ?.replace(/\s+/g, "-")
                                      ?.toLowerCase()}`}
                                    style={{ textWrap: "wrap" }}
                                  >
                                    {suggestion?.course_name}
                                  </Link>

                                  <h6 className="text-muted m-0">
                                    {suggestion?.course_type}
                                  </h6>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

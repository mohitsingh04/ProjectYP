"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAngleRight, FaSearch } from "react-icons/fa";

export default function page() {
  const [courese, setCourse] = useState("");
  const { uniqueId } = useParams();

  const getCourse = async () => {
    const response = await axios.get(
      `http://localhost:5000/course-detail/${uniqueId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Pages
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Blog Details
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
                  <a href="blog-details.html">
                    <img
                      className="img-fluid"
                      src={
                        courese?.image?.[0]
                          ? `${process.env.NEXT_PUBLIC_API_URL}${
                              courese?.image?.[0] || ""
                            }`
                          : "/img/blog-banner.jpg"
                      }
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      alt="Post Image"
                    />
                  </a>
                </div>
                <div className="blog-info clearfix">
                  <div className="post-left">
                    <ul>
                      <li>
                        <div className="post-author">
                          <img src="/img/icon/icon-01.svg" alt="Post Author" />{" "}
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
                <h3 className="blog-title">{courese?.course_name} ({courese?.course_short_name})</h3>
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
              <div className="card search-widget blog-search blog-widget">
                <div className="card-body">
                  <form className="search-form">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                      />
                      <button type="submit" className="btn btn-primary">
                        <FaSearch />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card post-widget blog-widget">
                <div className="card-header">
                  <h4 className="card-title">Recent Posts</h4>
                </div>
                <div className="card-body">
                  <ul className="latest-posts">
                    <li>
                      <div className="post-thumb">
                        <a href="blog-details.html">
                          <img
                            className="img-fluid"
                            src="/img/blog/blog-01.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Learn Webs Applications Development from Experts
                          </a>
                        </h4>
                        <p>
                          <img
                            className="img-fluid"
                            src="/img/icon/icon-22.svg"
                            alt="Img"
                          />
                          Jun 14, 2024
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <a href="blog-details.html">
                          <img
                            className="img-fluid"
                            src="/img/blog/blog-02.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Expand Your Career Opportunities With Python
                          </a>
                        </h4>
                        <p>
                          <img
                            className="img-fluid"
                            src="/img/icon/icon-22.svg"
                            alt="Img"
                          />{" "}
                          3 Dec 2019
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <a href="blog-details.html">
                          <img
                            className="img-fluid"
                            src="/img/blog/blog-03.jpg"
                            alt="Img"
                          />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Complete PHP Programming Career Guideline
                          </a>
                        </h4>
                        <p>
                          <img
                            className="img-fluid"
                            src="/img/icon/icon-22.svg"
                            alt="Img"
                          />{" "}
                          3 Dec 2019
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card category-widget blog-widget">
                <div className="card-header">
                  <h4 className="card-title">Categories</h4>
                </div>
                <div className="card-body">
                  <ul className="categories">
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Business{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Courses{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Education{" "}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Graphics Design
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Programming
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> Web Design{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card category-widget blog-widget">
                <div className="card-header">
                  <h4 className="card-title">Archives</h4>
                </div>
                <div className="card-body">
                  <ul className="categories">
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> January 2024
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> February 2024
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <FaAngleRight className="icon" /> April 2024{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card tags-widget blog-widget tags-card">
                <div className="card-header">
                  <h4 className="card-title">Latest Tags</h4>
                </div>
                <div className="card-body">
                  <ul className="tags">
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        HTML
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        Java Script
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        Css
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        Jquery
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        Java
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="tag">
                        React
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

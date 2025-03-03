import React from "react";
import blog from "../../img/blog/blog-05.jpg";
import icon22 from "../../img/icon/icon-22.svg";
import icon23 from "../../img/icon/icon-23.svg";
import user from "../../img/user/user9.jpg";

export default function AllBlog() {
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
                      Blog List
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
                    <img className="img-fluid" src={blog} alt="Post Image" />
                  </a>
                </div>
                <div className="blog-info clearfix">
                  <div className="post-left">
                    <ul>
                      <li>
                        <div className="post-author">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Post Author" />{" "}
                            <span>Ruby Perrin</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <img className="img-fluid" src={icon22} alt="Img" />
                        April 20, 2024
                      </li>
                      <li>
                        <img className="img-fluid" src={icon23} alt="Img" />
                        Programming, Web Design
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="blog-title">
                  <a href="blog-details.html">
                    Learn Webs Applications Development from Experts
                  </a>
                </h3>
                <div className="blog-content blog-read">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                    pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et
                    vulputate volutpat, eros pede […]
                  </p>
                  <a
                    href="blog-details.html"
                    className="read-more btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="blog">
                <div className="blog-image">
                  <a href="blog-details.html">
                    <img className="img-fluid" src={blog} alt="Post Image" />
                  </a>
                </div>
                <div className="blog-info clearfix">
                  <div className="post-left">
                    <ul>
                      <li>
                        <div className="post-author">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Post Author" />{" "}
                            <span>Jenis R.</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <img className="img-fluid" src={icon22} alt="Img" />
                        May 20, 2021
                      </li>
                      <li>
                        <img className="img-fluid" src={icon23} alt="Img" />
                        Programming, Courses
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="blog-title">
                  <a href="blog-details.html">
                    Expand Your Career Opportunities With Python
                  </a>
                </h3>
                <div className="blog-content blog-read">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                    pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et
                    vulputate volutpat, eros pede […]
                  </p>
                  <a
                    href="blog-details.html"
                    className="read-more btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="blog">
                <div className="blog-image">
                  <a href="blog-details.html">
                    <img className="img-fluid" src={blog} alt="Post Image" />
                  </a>
                </div>
                <div className="blog-info clearfix">
                  <div className="post-left">
                    <ul>
                      <li>
                        <div className="post-author">
                          <a href="instructor-profile.html">
                            <img src={user} alt="Post Author" />{" "}
                            <span>Rolands R</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <img className="img-fluid" src={icon22} alt="Img" />
                        Jun 14, 2024
                      </li>
                      <li>
                        <img className="img-fluid" src={icon23} alt="Img" />
                        Programming, Web Design
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="blog-title">
                  <a href="blog-details.html">
                    Complete PHP Programming Career Guideline
                  </a>
                </h3>
                <div className="blog-content blog-read">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                    nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                    pretium, ligula sollicitudin laoreet viverra, tortor libero
                    sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et
                    vulputate volutpat, eros pede […]
                  </p>
                  <a
                    href="blog-details.html"
                    className="read-more btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="pagination lms-page">
                    <li className="page-item prev">
                      <a className="page-link" href="#" tabIndex="-1">
                        <i className="fas fa-angle-left"></i>
                      </a>
                    </li>
                    <li className="page-item first-page active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        5
                      </a>
                    </li>
                    <li className="page-item next">
                      <a className="page-link" href="#">
                        <i className="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
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
                        id="search"
                      />
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search"></i>
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
                          <img className="img-fluid" src={blog} alt="Img" />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Learn Webs Applications Development from Experts
                          </a>
                        </h4>
                        <p>
                          <img className="img-fluid" src={icon22} alt="Img" />
                          Jun 14, 2024
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <a href="blog-details.html">
                          <img className="img-fluid" src={blog} alt="Img" />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Expand Your Career Opportunities With Python
                          </a>
                        </h4>
                        <p>
                          <img className="img-fluid" src={icon22} alt="Img" /> 3
                          Dec 2019
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="post-thumb">
                        <a href="blog-details.html">
                          <img className="img-fluid" src={blog} alt="Img" />
                        </a>
                      </div>
                      <div className="post-info">
                        <h4>
                          <a href="blog-details.html">
                            Complete PHP Programming Career Guideline
                          </a>
                        </h4>
                        <p>
                          <img className="img-fluid" src={icon22} alt="Img" /> 3
                          Dec 2019
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
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Business{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Courses{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Education{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Graphics Design
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Programming
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> Web Design{" "}
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
                      <a href="#">
                        <i className="fas fa-angle-right"></i> January 2024
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> February 2024
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-right"></i> April 2024{" "}
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
                      <a href="#" className="tag">
                        HTML
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Java Script
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Css
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Jquery
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
                        Java
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tag">
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

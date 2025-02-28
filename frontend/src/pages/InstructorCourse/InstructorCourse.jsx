import React, { useState } from "react";
import user from "../../img/user/user1.jpg";
import course from "../../img/course/course-01.jpg";
import book from "../../img/icon/icon-01.svg";
import clock from "../../img/icon/icon-02.svg";

export default function InstructorCourse() {
  const [activeTab, setActiveTab] = useState("Publish");

  const tabs = [
    { label: "Pending", value: 2 },
    { label: "Publish", value: 3 },
    { label: "Draft", value: 1 },
  ];

  const menuItems = {
    dashboard: [
      { label: "Dashboard", icon: "fas fa-tachometer-alt" },
      { label: "My Profile", icon: "fas fa-user" },
      { label: "Enrolled Courses", icon: "fas fa-book-open" },
      { label: "Wishlist", icon: "fas fa-heart" },
      { label: "Reviews", icon: "fas fa-star" },
      { label: "My Quiz Attempts", icon: "fas fa-question-circle" },
      { label: "Order History", icon: "fas fa-receipt" },
      { label: "Q&A", icon: "fas fa-comments" },
      { label: "Referrals", icon: "fas fa-user-friends" },
      { label: "Messages", icon: "fas fa-envelope" },
      { label: "Notifications", icon: "fas fa-bell" },
      { label: "Support Tickets", icon: "fas fa-life-ring" },
    ],
    instructor: [
      { label: "My Course", icon: "fas fa-chalkboard-teacher" },
      { label: "Announcements", icon: "fas fa-bullhorn" },
      { label: "Withdrawals", icon: "fas fa-wallet" },
      { label: "Quiz Attempts", icon: "fas fa-file-alt" },
      { label: "Assignments", icon: "fas fa-tasks" },
      { label: "Earnings", icon: "fas fa-dollar-sign" },
    ],
    account: [
      { label: "Setting", icon: "fas fa-cog" },
      { label: "Logout", icon: "fas fa-sign-out-alt" },
    ],
  };

  const CourseCard = () => (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="course-box flex-fill">
        <div className="product">
          <div className="product-img">
            <a href="course-details.html">
              <img className="img-fluid" alt="Img" src={course} />
            </a>
            <div className="price">
              <h3>
                $80 <span>$99.00</span>
              </h3>
            </div>
          </div>
          <div className="product-content">
            <h3 className="title instructor-text">
              <a href="course-details.html">
                Wordpress for Beginners - Master Wordpress Quickly
              </a>
            </h3>
            <div className="course-info d-flex align-items-center">
              <div className="rating-img d-flex align-items-center">
                <img src={book} alt="Img" />
                <p>12+ Lesson</p>
              </div>
              <div className="course-view d-flex align-items-center">
                <img src={clock} alt="Img" />
                <p>70hr 30min</p>
              </div>
            </div>
            <div className="course-edit-btn d-flex align-items-center justify-content-between">
              <a href="#">
                <i className="fa fa-edit me-2"></i>Edit
              </a>
              <a href="#">
                <i className="fa fa-trash me-2"></i>Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">My Courses</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Courses
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 theiaStickySidebar">
              <div className="settings-widget dash-profile">
                <div className="settings-menu">
                  <div className="profile-bg">
                    <div className="profile-img">
                      <a href="instructor-profile.html">
                        <img src={user} alt="Img" />
                      </a>
                    </div>
                  </div>
                  <div className="profile-group">
                    <div className="profile-name text-center">
                      <h4>
                        <a href="instructor-profile.html">Eugene Andre</a>
                      </h4>
                      <p>Instructor</p>
                      <a
                        href="add-course.html"
                        className="add-course btn-primary"
                      >
                        Add New Course
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings-widget account-settings">
                {Object.entries(menuItems).map(([category, items], index) => (
                  <div key={index} className="settings-menu">
                    <h3>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <ul>
                      {items.map((item, idx) => (
                        <li key={idx} className="nav-item">
                          <a href="#" className="nav-link">
                            <i className={item.icon}></i>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-9 col-lg-9">
              <div className="settings-widget card-info">
                <div className="settings-menu p-0">
                  <div className="profile-heading">
                    <h3>My Courses</h3>
                    <p>Manage your courses and its updates</p>
                  </div>
                  <div className="checkout-form pb-0">
                    <div className="wishlist-tab">
                      <ul className="nav">
                        {tabs.map((item) => (
                          <li className="nav-item" key={item.label}>
                            <a
                              href="#"
                              className={`nav-link ${
                                activeTab === item.label ? "active" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveTab(item.label);
                              }}
                            >
                              {item.label} ({item.value})
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div className="tab-content">
                        {tabs.map((item) => (
                          <div
                            key={item.label}
                            className={`tab-pane fade ${
                              activeTab === item.label ? "show active" : ""
                            }`}
                            id={item.label}
                          >
                            <div className="row">
                              {Array(item.value)
                                .fill({})
                                .map((_, index) => (
                                  <CourseCard key={index} />
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dash-pagination">
                <div className="row align-items-center">
                  <div className="col-6">
                    <p>Page 1 of 2</p>
                  </div>
                  <div className="col-6">
                    <ul className="pagination">
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

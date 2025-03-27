import React, { useState, useEffect } from "react";
import { Dropdown, Navbar, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../context/Api";

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [property, setProperty] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const getProfile = () => {
      try {
        API.get("/profile").then(({ data }) => {
          setUser(data.user);
        }, []);
      } catch (err) {
        console.error(err.message);
      }
    };
    const getProperty = async () => {
      try {
        API.get("property").then(({ data }) => {
          setProperty(data);
          setFilterData(data);
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    getProfile();
    getProperty();
  }, []);

  useEffect(() => {
    const result = property.filter((property) => {
      return property.property_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search, property]);

  function Fullscreen() {
    if (
      (document.fullScreenElement && document.fullScreenElement === null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  //dark-mode
  // const Darkmode = () => {
  //   document.querySelector(".app").classList.toggle("dark-mode");
  // };
  //leftsidemenu
  const openCloseSidebar = () => {
    document.querySelector(".app").classList.toggle("sidenav-toggled");
  };
  //rightsidebar
  const openCloseSidebarright = () => {
    document.querySelector(".sidebar-right").classList.toggle("sidebar-open");
  };

  // responsivesearch
  const responsivesearch = () => {
    document.querySelector(".header-search").classList.toggle("show");
  };
  //swichermainright
  // const swichermainright = () => {
  //   document.querySelector(".demo_changer").classList.toggle("active");
  //   document.querySelector(".demo_changer").style.right = "0px";
  // };

  const handleLogout = async () => {
    try {
      const response = await API.get("/logout");
      localStorage.clear();
      toast.success(response.data.message);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // const viewProperty = (uniqueId) => {
  //   navigate("/dashboard/view/property/" + uniqueId);
  //   window.location.reload();
  // };

  return (
    <Navbar expand="md" className="app-header header sticky">
      <Container fluid className="main-container">
        <div className="d-flex align-items-center">
          <Link
            aria-label="Hide Sidebar"
            className="app-sidebar__toggle"
            to=""
            onClick={() => openCloseSidebar()}
          ></Link>
          <div className="responsive-logo">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/`}
              className="header-logo"
            >
              <img
                src={require("../../assets/custom-logo/logo.png")}
                className="mobile-logo logo-1"
                alt="logo"
                width={100}
              />
            </Link>
          </div>
          <Link
            className="logo-horizontal "
            to={`${process.env.PUBLIC_URL}/dashboard/`}
          >
            <img
              src={require("../../assets/images/brand/logo.png")}
              className="header-brand-img desktop-logo"
              alt="logo"
            />
            <img
              src={require("../../assets/images/brand/logo-3.png")}
              className="header-brand-img light-logo1"
              alt="logo"
            />
          </Link>
          {/* Search */}
          {user.role === "Admin" ? (
            <>
              <div className="main-header-center ms-3 d-none d-lg-block">
                <input
                  className="form-control"
                  placeholder="Search for anything..."
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="" className="btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </Button>
                <div>
                  {search.length === 0 ? null : (
                    <>
                      <div className="search-list-container">
                        <ul className="search-list">
                          {filterData.map((item) => (
                            <a
                              className="text-dark"
                              href={`/dashboard/property/view/${item.uniqueId}`}
                            >
                              <li>{item.property_name}</li>
                            </a>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : null}
          <div className="d-flex order-lg-2 ms-auto header-right-icons">
            <Navbar.Toggle
              aria-controls="navbarScroll"
              className="navresponsive-toggler d-lg-none ms-auto"
              type="button"
            >
              <span className="navbar-toggler-icon fe fe-more-vertical text-dark"></span>
            </Navbar.Toggle>

            <div className="navbar navbar-collapse responsive-navbar p-0">
              <Navbar.Collapse
                className="navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <div className="d-flex order-lg-2">
                  {/* Responsive Search */}
                  {user.role === "Admin" ? (
                    <>
                      <div className="dropdown d-block d-lg-none">
                        <Link
                          to="#"
                          className="nav-link icon"
                          onClick={() => responsivesearch()}
                        >
                          <i className="fe fe-search"></i>
                        </Link>
                        <div className="dropdown-menu header-search dropdown-menu-start">
                          <div className="input-group w-100 p-2 border">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search...."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            {search.length === 0 ? null : (
                              <>
                                <div className="search-list-container">
                                  <ul className="search-list">
                                    {filterData.map((item) => (
                                      <li>
                                        <a
                                          className="text-dark"
                                          href={`/dashboard/property/view/${item.uniqueId}`}
                                        >
                                          {item.property_name}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <div className="dropdown d-md-flex">
                    <Link
                      to="#"
                      className="nav-link icon full-screen-link nav-link-bg"
                      onClick={Fullscreen}
                    >
                      <i className="fe fe-minimize fullscreen-button"></i>
                    </Link>
                  </div>
                  <Dropdown className="d-md-flex notifications">
                    <Dropdown.Toggle
                      className="nav-link icon d-none"
                      variant=""
                    >
                      <i className="fe fe-bell"></i>
                      <span className=" pulse"></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className=" dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading border-bottom">
                        <div className="d-flex">
                          <h6 className="mt-1 mb-0 fs-16 fw-semibold">
                            You have Notification
                          </h6>
                          <div className="ms-auto">
                            <span className="badge bg-success rounded-pill">
                              3
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="notifications-menu">
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <div className="me-3 notifyimg  bg-primary-gradient brround box-shadow-primary">
                            <i className="fe fe-message-square"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New review received
                            </h5>
                            <span className="notification-subtext">
                              2 hours ago
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/components/defaultChat/`}
                        >
                          <div className="me-3 notifyimg  bg-secondary-gradient brround box-shadow-primary">
                            <i className="fe fe-mail"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New Mails Received
                            </h5>
                            <span className="notification-subtext">
                              1 week ago
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className=" d-flex"
                          href={`${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart/`}
                        >
                          <div className="me-3 notifyimg  bg-success-gradient brround box-shadow-primary">
                            <i className="fe fe-shopping-cart"></i>
                          </div>
                          <div className="mt-1">
                            <h5 className="notification-label mb-1">
                              New Order Received
                            </h5>
                            <span className="notification-subtext">
                              1 day ago
                            </span>
                          </div>
                        </Dropdown.Item>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Link
                        to="#"
                        className=" dropdown-item text-center p-3 text-muted"
                      >
                        View all Notification
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className=" d-md-flex profile-1">
                    <Dropdown.Toggle
                      className="nav-link profile leading-none d-flex px-1"
                      variant=""
                    >
                      <span>
                        <img
                          src={
                            user?.profile?.[0]
                              ? `${process.env.REACT_APP_MEDIA_URL}/${user.profile[0]}`
                              : require("../../Images/DefaultProfile.jpg")
                          }
                          alt="profile-user"
                          className="avatar  profile-user brround cover-image"
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-end dropdown-menu-arrow"
                      style={{ margin: 0 }}
                    >
                      <div className="drop-heading">
                        <div className="text-start">
                          <h5 className="text-dark mb-0">{user.name}</h5>
                          <small className="text-muted">{user.role}</small>
                        </div>
                      </div>
                      <div className="dropdown-divider m-0"></div>
                      <Dropdown.Item href="/dashboard/my-profile">
                        <i className="dropdown-icon fe fe-user"></i>
                        Profile
                      </Dropdown.Item>
                      {/* <Dropdown.Item href={`/dashboard/change-password`}>
                        <i className="dropdown-icon fe fe-settings"></i>
                        Change Password
                      </Dropdown.Item> */}
                      <Dropdown.Item onClick={handleLogout}>
                        <i className="dropdown-icon fe fe-alert-circle"></i>
                        Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="dropdown d-md-flex header-settings">
                    <Link
                      to="#"
                      className="nav-link icon d-none"
                      onClick={() => openCloseSidebarright()}
                    >
                      <i className="fe fe-menu"></i>
                    </Link>
                  </div>
                </div>
              </Navbar.Collapse>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;

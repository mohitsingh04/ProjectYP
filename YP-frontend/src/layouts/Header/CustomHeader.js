import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CustomHeader() {
    const accessToken = localStorage.getItem("accessToken")

    return (
        <>
            <Card>
                <div className="header header-2 p-3">
                    <div className="container">
                        <nav className=" navbar header-nav navbar-expand-lg main-navbar p-0">
                            <Link
                                to="#"
                                className="animated-arrow horizontal-navtoggle-1-1"
                            >
                                <span />
                            </Link>
                            <Link
                                className="header-brand"
                                to={`${process.env.PUBLIC_URL}/dashboard/`}
                            >
                                <img
                                    src={require("../../assets/images/brand/logo-3.png")}
                                    className="header-brand-img logo-3"
                                    alt="Zanex logo"
                                />
                                <img
                                    src={require("../../assets/images/brand/logo.png")}
                                    className="header-brand-img logo"
                                    alt="Zanex logo"
                                />
                            </Link>
                            <ul className="navbar-nav navbar-right me-auto">
                                <li className="mx-2 fs-6">Blog</li>
                                <li className="mx-2 fs-6">About us</li>
                                <li className="mx-2 fs-6">Services</li>
                            </ul>
                            <div className="header2">
                                <Form className="form-inline">
                                    <div className="search-element">
                                        <input
                                            type="search"
                                            className="form-control header-search"
                                            placeholder="Type to Search…"
                                            aria-label="Search"
                                            tabIndex={1}
                                        // onChange={(e) => handleFilter(e.target.value)}
                                        />
                                        <Button className="btn btn-primary-color" variant="" >
                                            <i className="ion ion-search" />
                                        </Button>
                                        <div className="">
                                            {/* {data.map((items, id) => (
                                                <div key={id}>
                                                    <p>{items.name}</p>
                                                </div>
                                            ))} */}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div className="dropdown ms-2 ">
                                {accessToken
                                    ?
                                    <>
                                        <Link to="/dashboard" className="nav-link header-style-2 dropdown-toggle nav-link-lg d-flex" >
                                            <span>
                                                Dashboard
                                            </span>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/login" className="nav-link header-style-2 dropdown-toggle nav-link-lg d-flex" >
                                            <span>
                                                Sign In
                                            </span>
                                        </Link>
                                    </>
                                }

                            </div>
                        </nav>
                    </div>
                </div>
            </Card>
        </>
    )
};
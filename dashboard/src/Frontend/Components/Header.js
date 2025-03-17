import React from "react";
import Logo from "../Assets/image/logo.png";
import "../Assets/Css/homeStyle.css";
import "../Assets/Css/owl.carousel.min.css";
import "../Assets/Css/owl.theme.default.min.css";

export default function Header() {
    return (
        <section class="bg-white shadow" >
            <div class="container">
                <header>
                    <nav class="navbar navbar-expand-md py-1">
                        <a class="navbar-brand" href="/">
                            <img src={Logo} class="brand-logo" width="140px" alt="Yogprerna" />
                        </a>
                        <div class="form-inline justify-content-center wcenter" id="head-search-bar">
                            <div class="input-group bg-white border rounded-pill p-1 site-shadow ">
                                <input type="search" placeholder="Search Yoga institute, Courses, Trainer, Jobs..." aria-describedby="button-addon3" class="form-control bg-none border-0 rounded-pill" data-toggle="modal" data-target="#searchModal" />
                                <div class="input-group-append border-0">
                                    <button id="button-addon3" type="button" class="btn rounded-pill search-btn">
                                        <i class="fa fa-search"></i> <span class="hide-sm"> SEARCH </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav ml-auto ">
                                <li class="nav-item active">
                                    <a class="nav-link" href="blog.php">Blogs</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Job</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Log in</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        </section>
    )
};
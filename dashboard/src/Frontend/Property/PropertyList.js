import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function FrontPropertyList() {
    return (
        <>
            <Header />
            <section class="breadcrumb-section">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item" ><a href="#">Search</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Institute in India</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container-fluid">
                    <div class="row mx-0">
                        <div class="col-md-2 col-xl-2 br-m px-0 ">

                            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">filter</h5>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">

                                </div>
                            </div>


                            <div class="bg-white pb-2 filter-area">
                                <div class="divider-span">
                                    <p>Location</p>
                                </div>
                                <div class="px-1 my-2">
                                    <div class="input-group bg-white border rounded-pill">
                                        <input type="search" placeholder="Search Location..." aria-describedby="button-addon3" class="form-control bg-none border-0 rounded-pill py-0" />
                                        <div class="input-group-append border-0">
                                            <button id="button-addon3" type="button" class="btn btn-link rounded-pill search-btn">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <ul class="list-unstyled filter-checkbox px-1 fp-140">
                                        <li>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck" />
                                                <label class="form-check-label" for="defaultCheck">
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="divider-span">
                                    <p>Certification</p>
                                </div>
                                <div class="px-1 my-2">
                                    <ul class="list-unstyled filter-checkbox px-1  fp-140">

                                        <li>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultChecka<?php echo $n; ?>" />
                                                <label class="form-check-label" for="defaultChecka<?php echo $n; ?>">
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
};
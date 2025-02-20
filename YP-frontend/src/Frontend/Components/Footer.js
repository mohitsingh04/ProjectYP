import React from "react";
import Logo from "../Assets/image/logo.png";
// import "../Assets/Css/homeStyle.css";
// import "../Assets/Css/owl.carousel.min.css";
// import "../Assets/Css/owl.theme.default.min.css";

export default function Footer() {
    return (
        <>
            <section class="py-4 border-top">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <img src={Logo} width="200px" alt="Yogprerna" />
                            <p class="py-3">The next generation of the web’s favorite icon library + toolkit is now available as a Beta release! Subscribe to Font Awesome Pro and get instant access to the v6 beta. </p>
                            <h4>
                                Follow Us
                                <a href="/"><i class="fab fa-facebook"></i></a>
                                <a href="/"><i class="fab fa-instagram-square"></i></a>

                            </h4>

                        </div>
                        <div class="col-md-2">
                            <h3 class="sm-title">Useful Links</h3>
                            <ul class="highlight-points-1">
                                <li><a href="index.php">Home</a></li>
                                <li><a href="institute-search.php">institute</a></li>
                                <li><a href="job-search.php">jobs</a></li>
                                <li><a href="course-search.php">Course</a></li>
                                <li><a href="trainer-search.php">Trainer</a></li>
                            </ul>
                        </div>
                        <div class="col-md-2">
                            <h3 class="sm-title">About Us</h3>
                            <ul class="highlight-points-1">
                                <li><a href="/">About</a></li>
                                <li><a href="/">Portfolio</a></li>
                                <li><a href="/">Details</a></li>
                                <li><a href="/">Expert Team</a></li>
                                <li><a href="/">Latest News</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3">

                        </div>
                    </div>
                </div>
            </section>

            <section class="">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="small">Copyright &copy; 2021, All Right Reserved</p>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled list-vertical float-end">
                                <li><a href="/">Home</a></li>
                                <li><a href="/">Terms</a></li>
                                <li><a href="/">Privacy</a></li>
                                <li><a href="/">Policy</a></li>
                                <li><a href="/">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
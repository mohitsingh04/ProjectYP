"use client";
import SearchModal from "@/components/Navigation/SearchModal";
import { useState } from "react";
import Banner from "./_HomePageComponents/Banner";
import Counts from "./_HomePageComponents/Counts";
// import TopCategories from "./_HomePageComponents/TopCategories";
import FeaturesCourse from "./_HomePageComponents/FeaturesCourse";
import WhyChoose from "./_HomePageComponents/WhyChoose";
import HomeProperties from "./_HomePageComponents/HomeProperties";
// import LeadingCompanies from "./_HomePageComponents/LeadingCompanies";
import BenifitsOfYoga from "./_HomePageComponents/BenifitsOfYoga";
import Testimonials from "./_HomePageComponents/Testimonials";
import LatestBlog from "./_HomePageComponents/LatestBlog";

export default function Home() {
  const [show, setShow] = useState(false);
  return (
    <>
      <SearchModal show={show} setShow={setShow} />
      <Banner setShow={setShow} />
      <Counts />
      {/* <TopCategories /> */}
      <FeaturesCourse />
      <WhyChoose />
      <HomeProperties />
      {/* <LeadingCompanies /> */}
      <BenifitsOfYoga />
      <Testimonials />
      <LatestBlog />
    </>
  );
}

{
  /*
  
  const options2: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
    lazyLoad: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 4 },
    },
  };
  <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Featured Instructor</h2>
            </div>
          </div>
          <div className="owl-theme instructors-course">
            <OwlCarousel {...(options2 as any)}>
              {instructors.map((instructor, index) => (
                <div className="instructors-widget" key={index}>
                  <div className="instructors-img">
                    <a href="instructor-list.html">
                      <img
                        className="img-fluid"
                        alt="Instructor"
                        src={instructor.image}
                      />
                    </a>
                  </div>
                  <div className="instructors-content text-center">
                    <h5>
                      <a href="instructor-profile.html">{instructor.name}</a>
                    </h5>
                    <p>{instructor.role}</p>
                    <div className="student-count d-flex justify-content-center">
                      <i className="fa-solid fa-user-group"></i>
                      <span>{instructor.students} Students</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div> */
}

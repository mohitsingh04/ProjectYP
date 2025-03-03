"use client";
import React from "react";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

export default function LeadingCompanies() {
  const options: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: false,
    loop: true,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 3,
        nav: false,
        dots: false,
      },
      768: {
        items: 3,
        nav: false,
        dots: false,
      },
      1170: {
        items: 6,
        dots: false,
      },
    },
  };

  return (
    <section className="section lead-companies">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head feature-head text-center">
            <span>Trusted By</span>
            <h2>500+ Leading Universities And Companies</h2>
          </div>
        </div>
        <div className="lead-group aos" data-aos="fade-up">
          <div className="lead-group-slider owl-theme">
            <OwlCarousel {...(options as any)} className="owl-theme">
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
              <div className="item">
                <div className="lead-img">
                  <img className="img-fluid" alt="Img" src="/img/lead-01.png" />
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});
const courses = [
  {
    name: "Angular Development",
    instructors: 40,
    icon: "/img/categories-icon.png",
  },
  {
    name: "Docker Development",
    instructors: 45,
    icon: "/img/categories-icon-01.png",
  },
  {
    name: "Node JS Frontend",
    instructors: 40,
    icon: "/img/categories-icon-02.png",
  },
  {
    name: "Swift Development",
    instructors: 23,
    icon: "/img/categories-icon-03.png",
  },
  {
    name: "Python Development",
    instructors: 30,
    icon: "/img/categories-icon-04.png",
  },
];

const options: Record<string, unknown> = {
  loop: true,
  margin: 10,
  nav: false,
  dots: true,
  dotsEach: 1.5,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 4 },
  },
};

export default function TopCategories() {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <span>Favourite Course</span>
            <h2>Top Category</h2>
          </div>
          <div className="all-btn all-category d-flex align-items-center">
            <a href="job-category.html" className="btn btn-primary">
              All Categories
            </a>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
            accumsan bibendum gravida maecenas augue elementum et neque.
            Suspendisse imperdiet.
          </p>
        </div>
        <OwlCarousel {...(options as any)} className="owl-theme">
          {courses.map((course, index) => (
            <div key={index} className="item">
              <div className="feature-box text-center">
                <div className="feature-bg">
                  <div className="feature-header">
                    <div className="feature-icon">
                      <img src={course.icon} alt={course.name} />
                    </div>
                    <div className="feature-cont">
                      <div className="feature-text">{course.name}</div>
                    </div>
                  </div>
                  <p>{course.instructors} Instructors</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

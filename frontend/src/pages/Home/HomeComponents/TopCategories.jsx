import OwlCarousel from "react-owl-carousel3";

import categoryIcon1 from "../../../img/categories-icon.png";
import categoryIcon2 from "../../../img/categories-icon-01.png";
import categoryIcon3 from "../../../img/categories-icon-02.png";
import categoryIcon4 from "../../../img/categories-icon-03.png";
import categoryIcon5 from "../../../img/categories-icon-04.png";

const courses = [
  { name: "Angular Development", instructors: 40, icon: categoryIcon1 },
  { name: "Docker Development", instructors: 45, icon: categoryIcon2 },
  { name: "Node JS Frontend", instructors: 40, icon: categoryIcon3 },
  { name: "Swift Development", instructors: 23, icon: categoryIcon4 },
  { name: "Python Development", instructors: 30, icon: categoryIcon5 },
];

const options = {
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

function MyCarousel() {
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
        <OwlCarousel {...options} className="owl-theme">
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

export default MyCarousel;

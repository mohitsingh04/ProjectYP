import React, { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsProps {
  faq: FAQ;
}

export default function FAQs({ faq }: FAQsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="course-card">
      <h6 className="cou-title">
        <a
          className=""
          data-bs-toggle="collapse"
          href="#collapseOne"
          aria-expanded={isOpen}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {faq?.question}
        </a>
      </h6>
      <div
        id="collapseOne"
        className={`card-collapse collapse ${isOpen ? "show" : ""}`}
      >
        <div className="d-flex align-items-center mb-3">
          <img src="/img/icon/play.svg" alt="Img" className="me-2" />
          <p
            dangerouslySetInnerHTML={{
              __html: faq.answer,
            }}
          />
        </div>
      </div>
    </div>
  );
}

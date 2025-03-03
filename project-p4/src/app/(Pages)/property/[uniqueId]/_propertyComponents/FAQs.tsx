import React, { useState } from "react";
import Image from "next/image";
import play from "../../../../../img/icon/play.svg";

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
          onClick={() => setIsOpen(!isOpen)}
        >
          {faq?.question}
        </a>
      </h6>
      <div
        id="collapseOne"
        className={`card-collapse collapse ${isOpen ? "show" : ""}`}
      >
        <div className="d-flex">
          <Image src={play} alt="Img" className="me-2" />
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

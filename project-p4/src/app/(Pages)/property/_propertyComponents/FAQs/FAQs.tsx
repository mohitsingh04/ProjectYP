import API from "@/service/API/API";
import React, { useEffect, useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQsProps {
  property: { uniqueId: string } | null;
}

export default function FAQs({ property }: FAQsProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getFaqs = async () => {
    try {
      const response = await API.get(`/property/faq/${property?.uniqueId}`);
      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (property) {
      getFaqs();
    }
  }, [property]);

  return (
    <div className="card content-sec">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6">
            <h5 className="subs-title">Property FAQs</h5>
          </div>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className="course-card">
            <h6 className="cou-title">
              <a
                className=""
                data-bs-toggle="collapse"
                href="#"
                aria-expanded={openIndex === index}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === index ? null : index);
                }}
              >
                {faq?.question}
              </a>
            </h6>
            <div
              className={`card-collapse collapse ${
                openIndex === index ? "show" : ""
              }`}
            >
              <div className="d-flex align-items-center mb-3">
                <img src="/img/icon/play.svg" alt="Img" className="me-2" />
                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

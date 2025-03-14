"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import API from "@/service/API/API";

const OwlCarousel = dynamic(() => import("react-owl-carousel3"), {
  ssr: false,
});

interface Property {
  uniqueId: string;
  property_name: string;
  property_city: string;
  property_state: string;
  featured_image?: string[];
  property_logo?: string[];
  status: string;
  courseCount?: number;
}

export default function HomeProperties() {
  const [property, setProperty] = useState<Property[]>([]);

  const getProperty = useCallback(async () => {
    try {
      const response = await API.get<Property[]>(`/property`);
      const data = response.data;

      const activeProperties = data?.filter(
        (item: Property) => item.status === "Active"
      );

      const randomProperties = activeProperties
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

      const updatedProperties = await Promise.all(
        randomProperties.map(async (item: Property) => {
          const courseResponse = await API.get<{ length: number }>(
            `/property/property-course/${item.uniqueId}`
          );
          return { ...item, courseCount: courseResponse.data.length };
        })
      );

      setProperty(updatedProperties);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const options: Record<string, unknown> = {
    margin: 24,
    nav: false,
    dots: true,
    loop: true,
    lazyLoad: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1170: { items: 3 },
    },
  };

  return (
    <section className="section trend-course">
      <div className="container">
        <div className="section-header aos" data-aos="fade-up">
          <div className="section-sub-head">
            <h2>Take Your Learning to the Next Level with Yoga Institutes</h2>
          </div>
        </div>
        <div className="section-text aos" data-aos="fade-up">
          <p className="mb-0">
            Deepen your understanding of yoga with our specialized online
            courses. Explore new options and refine your practice.
          </p>
        </div>
        <div className="owl-theme trending-course">
          <OwlCarousel {...(options as any)}>
            {property.map((item, index) => (
              <div className="item" key={index}>
                <div className="course-box trend-box">
                  <div className="product trend-product">
                    <div className="product-img">
                      <img
                        className="img-fluid"
                        alt={item?.property_name}
                        src={
                          item?.featured_image?.[0]
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item?.featured_image?.[0]}`
                            : "/Images/PropertyBanner.png"
                        }
                        style={{ aspectRatio: "4/2", objectFit: "cover" }}
                      />
                    </div>
                    <div className="product-content">
                      <div className="course-group d-flex">
                        <div className="course-group-img d-flex">
                          <img
                            className="img-fluid"
                            alt={item?.property_name}
                            src={
                              item?.property_logo?.[0]
                                ? `${process.env.NEXT_PUBLIC_API_URL}${item?.property_logo?.[0]}`
                                : "/Images/PropertyBanner.png"
                            }
                            style={{ aspectRatio: "4/2", objectFit: "cover" }}
                          />
                          <div className="item-name">
                            <h3 className="title">
                              <Link
                                href={`/property/${
                                  item.uniqueId
                                }/${item?.property_name
                                  ?.replace(/\s+/g, "-")
                                  ?.toLowerCase()}/${item?.property_city
                                  ?.replace(/\s+/g, "-")
                                  ?.toLowerCase()}`}
                              >
                                {item?.property_name}
                              </Link>
                            </h3>
                            <h6>
                              {item?.property_city} {item?.property_state}
                            </h6>
                          </div>
                        </div>
                      </div>

                      <div className="course-info border-0 d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img
                            src="/img/icon/icon-01.svg"
                            alt="Lessons"
                            className="img-fluid"
                          />
                          <p className="text-nowrap">
                            {item.courseCount}+ courses
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
}

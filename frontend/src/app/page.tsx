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

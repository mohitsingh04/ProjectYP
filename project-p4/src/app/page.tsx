"use client";
import SearchModal from "@/components/Navigation/SearchModal";
import { useState } from "react";
import Banner from "./_HomePageComponents/Banner";
import StudentCourse from "./_HomePageComponents/StudentCourse";
import TopCategories from "./_HomePageComponents/TopCategories";
import FeaturesCourse from "./_HomePageComponents/FeaturesCourse";
import MasterSkill from "./_HomePageComponents/MasterSkill";
import TrendingCourse from "./_HomePageComponents/TrendingCourse";
import LeadingCompanies from "./_HomePageComponents/LeadingCompanies";
import ShareKnowlegde from "./_HomePageComponents/ShareKnowlegde";
import Testimonials from "./_HomePageComponents/Testimonials";
import LatestBlog from "./_HomePageComponents/LatestBlog";

export default function Home() {
  const [show, setShow] = useState(false);
  return (
    <>
      <SearchModal show={show} setShow={setShow} />
      <Banner setShow={setShow} />
      <StudentCourse />
      <TopCategories />
      <FeaturesCourse />
      <MasterSkill />
      <TrendingCourse />
      <LeadingCompanies />
      <ShareKnowlegde />
      <Testimonials />
      <LatestBlog />
    </>
  );
}

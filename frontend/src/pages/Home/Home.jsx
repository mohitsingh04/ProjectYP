import React from "react";
import Banner from "./HomeComponents/Banner";
import StudentCourse from "./HomeComponents/StudentCourse";
import TopCategories from "./HomeComponents/TopCategories";
import FeaturesCourse from "./HomeComponents/FeaturesCourse";
import MasterSkill from "./HomeComponents/MasterSkill";
import TrendingCourse from "./HomeComponents/TrendingCourse";
import LeadingCompanies from "./HomeComponents/LeadingCompanies";
import ShareKnowlegde from "./HomeComponents/ShareKnowlegde";
import Testimonials from "./HomeComponents/Testimonials";
import LatestBlog from "./HomeComponents/LatestBlog";

export default function Home() {
  return (
    <>
      <Banner />
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

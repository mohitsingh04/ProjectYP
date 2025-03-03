import Banner from "./(HomePageComponents)/Banner";
import FeaturesCourse from "./(HomePageComponents)/FeaturesCourse";
import LatestBlog from "./(HomePageComponents)/LatestBlog";
import LeadingCompanies from "./(HomePageComponents)/LeadingCompanies";
import MasterSkill from "./(HomePageComponents)/MasterSkill";
import ShareKnowlegde from "./(HomePageComponents)/ShareKnowlegde";
import StudentCourse from "./(HomePageComponents)/StudentCourse";
import Testimonials from "./(HomePageComponents)/Testimonials";
import TopCategories from "./(HomePageComponents)/TopCategories";
import TrendingCourse from "./(HomePageComponents)/TrendingCourse";

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

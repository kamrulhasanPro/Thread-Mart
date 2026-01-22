import React from "react";
import Hero from "./Sections/Hero";
import OurProducts from "./Sections/OurProducts";
import HowItWorks from "./Sections/HowItWorks";
import CustomerFeedback from "./Sections/CustomerFeedback";
import OurTrustedBrands from "./Sections/OurTrustedBrands";
import NewsLetter from "./Sections/Newsletter";
import WhyChooseUs from "./Sections/WhyChooseUs";
import FAQ from "./Sections/FAQ";
import FabricTimeline from "./Sections/FabricTimeline";

const Home = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <WhyChooseUs />
      <FabricTimeline/>
      <HowItWorks />
      <CustomerFeedback />
      <OurTrustedBrands />
      <FAQ />
      <NewsLetter />
    </>
  );
};

export default Home;

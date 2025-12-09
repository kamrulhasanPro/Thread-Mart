import React from "react";
import Hero from "./Sections/Hero";
import OurProducts from "./Sections/OurProducts";
import HowItWorks from "./Sections/HowItWorks";
import CustomerFeedback from "./Sections/CustomerFeedback";
import OurTrustedBrands from "./Sections/OurTrustedBrands";
import NewsLetter from "./Sections/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback />
      <OurTrustedBrands />
      <NewsLetter />
    </>
  );
};

export default Home;

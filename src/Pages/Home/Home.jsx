import React from "react";
import Hero from "./Sections/Hero";
import OurProducts from "./Sections/OurProducts";
import HowItWorks from "./Sections/HowItWorks";
import CustomerFeedback from "./Sections/CustomerFeedback";
import OurTrustedBrands from "./Sections/OurTrustedBrands";
import NewsLetter from "./Sections/Newsletter";
import WhyChooseUs from "./Sections/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <WhyChooseUs />
      <CustomerFeedback />
      <OurTrustedBrands />
      <NewsLetter />
    </>
  );
};

export default Home;

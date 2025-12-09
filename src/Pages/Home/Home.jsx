import React from "react";
import Hero from "./Sections/Hero";
import OurProducts from "./Sections/OurProducts";
import HowItWorks from "./Sections/HowItWorks";
import CustomerFeedback from "./Sections/CustomerFeedback";

const Home = () => {
  return (
    <>
      <Hero />
      <OurProducts />
      <HowItWorks />
      <CustomerFeedback/>
    </>
  );
};

export default Home;

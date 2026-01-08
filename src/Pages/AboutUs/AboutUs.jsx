import React from "react";
import HeadTitle from "../../Components/HeadTitle";

import Counter from "./section/Counter";
import About from "./section/About";

const AboutUs = () => {

  return (
    <section>
      <title>ThreadMart | About Us</title>
      <HeadTitle className={"!mt-0 !mb-5"}>About Us</HeadTitle>
      {/* about us */}
      <About />

      {/* countup */}
      <Counter />
    </section>
  );
};

export default AboutUs;

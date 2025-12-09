import React from "react";
import Marquee from "react-fast-marquee";
import HeadTitle from "../../../Components/HeadTitle";
import adidas from "../../../assets/brands/adidas.png";
import amazon from "../../../assets/brands/amazon.png";
import daraz from "../../../assets/brands/daraz.png";
import casio from "../../../assets/brands/casio.png";
import shoppe from "../../../assets/brands/shoppe.png";
import moonstar from "../../../assets/brands/moonstar.png";
import star from "../../../assets/brands/star.png";
import tookpedia from "../../../assets/brands/tookpedia.png";
import randstad from "../../../assets/brands/randstad.png";
import start_people from "../../../assets/brands/start_people.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";

const OurTrustedBrands = () => {
  const brands = [
    adidas,
    amazon,
    daraz,
    casio,
    shoppe,
    moonstar,
    star,
    tookpedia,
    randstad,
    amazon_vector,
    start_people,
  ];
  
  return (
    <section>
      <HeadTitle>Our Trusted Brands</HeadTitle>
      <Marquee className="grayscale hover:grayscale-0 transition-all duration-500">
        {brands.map((brand, i) => (
          <img
            src={brand}
            alt={brand}
            className="h-10 mx-4 object-contain transition-transform duration-500 hover:scale-110"
            key={i}
          />
        ))}
      </Marquee>
    </section>
  );
};

export default OurTrustedBrands;

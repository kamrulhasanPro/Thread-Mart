import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";

const OurProducts = () => {
  return (
    <section className="space-y-7">
      <div className="">
        <h3 className="text-5xl text-center">OUR PRODUCT</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductCard />
        ))}
      </div>
    </section>
  );
};

export default OurProducts;

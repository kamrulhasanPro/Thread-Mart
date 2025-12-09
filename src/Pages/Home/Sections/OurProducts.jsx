import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import HeadTitle from "../../../Components/HeadTitle";

const OurProducts = () => {
  return (
    <section className="space-y-7">
      <HeadTitle>Our Product</HeadTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductCard />
        ))}
      </div>
    </section>
  );
};

export default OurProducts;

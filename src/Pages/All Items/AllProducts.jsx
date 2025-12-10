import React from "react";
import HeadTitle from "../../Components/HeadTitle";
import ProductCard from "../../Components/ProductCard/ProductCard";

const AllProducts = () => {
  return (
    <section>
      <HeadTitle className={"!mt-0"}>All Products</HeadTitle>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 20 }).map((item) => (
          <ProductCard />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;

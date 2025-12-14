import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import HeadTitle from "../../../Components/HeadTitle";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const OurProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axiosPublic("/products?limit=6")).data,
  });

  console.log(products);
  if (isLoading) {
    return <p>Loading........</p>;
  }
  return (
    <section className="space-y-7">
      <HeadTitle>Our Product</HeadTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </section>
  );
};

export default OurProducts;

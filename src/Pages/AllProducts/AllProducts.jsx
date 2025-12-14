import React from "react";
import HeadTitle from "../../Components/HeadTitle";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../Hooks/axiosPublic";
import Loading from "../../Components/Loading";

const AllProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axiosPublic("/products")).data,
  });

  console.log(products);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <HeadTitle className={"!mt-0"}>All Products</HeadTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;

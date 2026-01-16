import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import HeadTitle from "../../../Components/share/HeadTitle";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/share/Loading";
import ProductCardSkeleton from "../../../Components/Skeletor/ProductCardSkeletor";

const OurProducts = () => {
  const { data: { result: products = [] } = {}, isLoading } = useQuery({
    queryKey: ["our-products"],
    queryFn: async () =>
      (await axiosPublic("/products?showOnHomePage=true&limit=8")).data,
  });

  return (
    <section className="space-y-7">
      <HeadTitle>Our Product</HeadTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
      </div>
    </section>
  );
};

export default OurProducts;

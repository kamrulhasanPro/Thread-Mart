import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosPublic } from "../../Hooks/axiosPublic";
import ProductCard from "../../Components/ProductCard/ProductCard";


const ReviewAndRelevant = ({ category }) => {
  
  const { data: relevantProducts = [] } = useQuery({
    queryKey: ["related-products", category],
    queryFn: async () =>
      (await axiosPublic(`/products?category=${category}`)).data,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  console.log(relevantProducts);

  return (
    <section className="mt-10">
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab checked:bg-primary/10"
          aria-label="Relevant Products"
          defaultChecked
        />
        <div className="tab-content bg-primary/10 border-base-300 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relevantProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab checked:bg-primary/10"
          aria-label="Review Comment"
        />
        <div className="tab-content bg-primary/10 border-base-300 p-6">
          Review Comment
        </div>
      </div>
    </section>
  );
};

export default ReviewAndRelevant;

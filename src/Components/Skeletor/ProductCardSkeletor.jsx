import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-[#0f172a]/50 backdrop-blur-md border-2 border-transparent rounded-t-2xl flex flex-col overflow-hidden animate-pulse">
      {/* image skeleton */}
      <div className="aspect-square bg-slate-800 rounded-t-2xl" />

      {/* content */}
      <div className="p-4 flex flex-col grow space-y-3">
        {/* product name */}
        <div className="h-5 w-3/4 bg-slate-700 rounded" />

        {/* description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-700 rounded" />
          <div className="h-3 w-5/6 bg-slate-700 rounded" />
        </div>

        {/* price */}
        <div className="h-7 w-1/2 bg-slate-700 rounded mt-2" />
      </div>

      {/* button */}
      <div className="h-12 bg-slate-700" />
    </div>
  );
};

export default ProductCardSkeleton;

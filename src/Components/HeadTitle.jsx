import React from "react";

const HeadTitle = ({ children, className }) => {
  return (
    <h2
      className={`text-4xl md:text-5xl font-extrabold text-primary text-center mb-10 relative after:content-[''] after:block after:w-24 hover:after:w-36 after:duration-500 after:h-1 after:bg-primary after:rounded-full after:mt-2 after:mx-auto mt-16 ${className}`}
    >
      {children}
    </h2>
  );
};

export default HeadTitle;

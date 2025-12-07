import React from "react";

const MyContainer = ({ className, children }) => {
  return <section className={`max-w-11/12 mx-auto ${className}`}>{children}</section>;
};

export default MyContainer;

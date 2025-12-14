import React from "react";
import notFoundAnimation from "../../assets/AnimationJson/Error404.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Lottie animationData={notFoundAnimation} loop={true} />
      <Link to={"/"} className="btn btn-primary text-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

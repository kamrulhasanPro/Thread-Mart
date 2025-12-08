import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      {/* main */}
      <main className="min-h-[calc(100vh-80px-275px)] max-w-11/12 mx-auto ">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;

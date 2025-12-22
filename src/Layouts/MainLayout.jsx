import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";
import ScreenToTop from "../Pages/Home/Sections/ScreenToTop";

const MainLayout = () => {
  return (
    <>
      <ScreenToTop />
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* main */}
      <main className="min-h-[calc(100vh-80px-275px)] max-w-11/12 mx-auto py-5">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;

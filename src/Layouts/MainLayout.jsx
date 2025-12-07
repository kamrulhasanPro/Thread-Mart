import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      {/* main */}
      <main className="min-h-[calc(100vh-80px)] max-w-11/12 mx-auto ">
        <Outlet />
      </main>

      <footer>{/* footer */}</footer>
    </>
  );
};

export default MainLayout;

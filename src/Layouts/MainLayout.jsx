import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <header>{/* header */}</header>

      {/* main */}
      <main className="max-w-11/12 mx-auto">
        <Outlet />
      </main>

      <footer>{/* footer */}</footer>
    </>
  );
};

export default MainLayout;

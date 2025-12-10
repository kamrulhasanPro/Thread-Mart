import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import AllProduct from "../Pages/All Items/AllProducts";
import AllProducts from "../Pages/All Items/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
]);

import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import { axiosPublic } from "../Hooks/axiosPublic";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManagerHome from "../Pages/Dashboard/Manager/MenagerHome";
import AddProduct from "../Pages/Dashboard/Manager/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    ErrorBoundary: NotFoundPage,
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
      {
        path: "product/:id",
        loader: ({ params }) => axiosPublic(`/product/${params.id}/specific`),
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: ManagerHome
      },
      {
        path: 'add-product',
        Component: AddProduct
      }
    ]
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

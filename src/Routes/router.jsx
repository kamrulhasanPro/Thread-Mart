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
import ManageProducts from "../Pages/Dashboard/Manager/ManageProducts";
import PendingOrder from "../Pages/Dashboard/Manager/PendingOrder";
import ApproveOrder from "../Pages/Dashboard/Manager/ApproveOrder";
import UpdateProduct from "../Pages/Dashboard/Manager/UpdateProduct";
import OrderForm from "../Pages/ProductDetails/OrderForm";
import PaymentSuccess from "../Pages/ProductDetails/PaymentSuccess";
import PaymentCancel from "../Pages/ProductDetails/PaymentCancel";
import RoleRoute from "./RoleRoute";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import TrackOrder from "../Pages/Dashboard/User/TrackOrder";
import MyProfile from "../Pages/Dashboard/Share/MyProfile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageAllProducts from "../Pages/Dashboard/Admin/ManageAllProducts";

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
      {
        path: "order-form/:id",
        loader: ({ params }) => axiosPublic(`/product/${params.id}/specific`),
        element: (
          <PrivateRoute>
            <OrderForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
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
        Component: ManagerHome,
      },
      {
        path: "add-product",
        element: (
          <RoleRoute verifyRol={["manager"]}>
            <AddProduct />
          </RoleRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <RoleRoute verifyRol={["manager"]}>
            <ManageProducts />
          </RoleRoute>
        ),
      },
      {
        path: "pending-order",
        element: (
          <RoleRoute verifyRol={["manager"]}>
            <PendingOrder />
          </RoleRoute>
        ),
      },
      {
        path: "approve-order",
        element: (
          <RoleRoute verifyRol={["manager"]}>
            <ApproveOrder />
          </RoleRoute>
        ),
      },
      {
        path: "update-product/:id",
        loader: ({ params }) => axiosPublic(`/product/${params.id}/specific`),
        element: (
          <RoleRoute verifyRol={["manager", "admin"]}>
            <UpdateProduct />
          </RoleRoute>
        ),
      },

      // buyer
      {
        path: "my-orders",
        element: (
          <RoleRoute verifyRol={["buyer"]}>
            <MyOrders />
          </RoleRoute>
        ),
      },
      {
        path: "track-order/:orderId",
        element: (
          <RoleRoute verifyRol={["buyer"]}>
            <TrackOrder />
          </RoleRoute>
        ),
      },

      // admin
      {
        path: "manage-users",
        element: (
          <RoleRoute verifyRol={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <RoleRoute verifyRol={["admin"]}>
            <ManageAllProducts />
          </RoleRoute>
        ),
      },
      {
        path: "profile",
        Component: MyProfile,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

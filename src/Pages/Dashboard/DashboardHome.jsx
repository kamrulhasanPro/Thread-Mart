import React from "react";
import useRole from "../../Hooks/useRole";
import AdminDashboardHome from "./Admin/AdminDashboardHome";
import ManagerDashboardHome from "./Manager/MenagerDashboardHome";
import BuyerDashboardHome from "./User/BuyerDashboardHome";
import DashboardTitle from "../../Components/Dashboard/DashboardTitle";
import { useAuth } from "../../Hooks/useAuth";

const DashboardHome = () => {
  const { role } = useRole();
  const { user } = useAuth();
  return (
    <section>
      <div>
        <DashboardTitle>Dashboard Overview</DashboardTitle>
        <h5 className="text-xl font-medium">
          Welcome back, {user?.displayName}! 👋
        </h5>
        <p className="text-gray-400">
          Here’s a quick overview of what’s happening today.
        </p>
      </div>

      {role === "admin" ? (
        <AdminDashboardHome />
      ) : role === "manager" ? (
        <ManagerDashboardHome />
      ) : (
        <BuyerDashboardHome />
      )}
    </section>
  );
};

export default DashboardHome;

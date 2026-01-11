import React from "react";
import ViewCard from "../../../Components/Dashboard/ViewCard";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../Hooks/useRole";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import {
  GoOrganization,
  GoPeople,
  GoPackage,
  GoChecklist,
} from "react-icons/go";
import Loading from "../../../Components/share/Loading";
import RevenueChart from "../../../Components/ReChart/RevenueChart";
import StatusChart from "../../../Components/ReChart/StatusChart";

const AdminDashboardHome = () => {
  const { role } = useRole();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats", role],
    queryFn: async () => (await axiosPublic("/admin/dashboard-stats")).data,
  });

  if (isLoading) {
    return <Loading />;
  }

  const { totalUsers, totalManagers, totalProducts, totalOrders } = stats;
  const adminStats = [
    {
      label: "Total Managers",
      value: totalManagers,
      icon: GoOrganization,
      color: "text-indigo-600 bg-indigo-400/10",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: GoPeople,
      color: "text-blue-600 bg-blue-400/10",
    },
    {
      label: "Total Products",
      value: totalProducts,
      icon: GoPackage,
      color: "text-green-600 bg-green-400/10",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: GoChecklist,
      color: "text-orange-60 bg-orange-400/10",
    },
  ];

  console.log(stats);
  return (
    <>
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5  ">
        {/* stats show */}
        {adminStats.map((item, i) => (
          <ViewCard
            key={i}
            label={item.label}
            Icon={item.icon}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <RevenueChart />
        <StatusChart />
      </div>
    </>
  );
};

export default AdminDashboardHome;

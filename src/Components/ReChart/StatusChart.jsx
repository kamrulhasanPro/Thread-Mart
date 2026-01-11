import React from "react";
import { axiosPublic } from "../../Hooks/axiosPublic";
import { useAuth } from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../share/Loading";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const StatusChart = () => {
  const { user } = useAuth();
  const { data: orderStatus = [], isLoading } = useQuery({
    queryKey: ["orderStatus-stats", user?.email],
    queryFn: async () => (await axiosPublic("/orderStatus-stats")).data,
  });

  const COLORS = [
    "#22d3ee", // delivered
    "#4ade80", // approved
    "#facc15", // pending
    "#f87171", // rejected
  ];

  console.log(orderStatus);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-secondary rounded-xl p-6 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Status</h3>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderStatus}
              dataKey="orders"
              nameKey="status"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {orderStatus.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderRadius: "8px",
                border: "1px solid #334155",
                color: "#e5e7eb",
              }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#22d3ee" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        {orderStatus.map((item, index) => (
          <div key={item._id} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>
              {item.status} ({item.orders})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusChart;

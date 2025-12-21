import React from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { useNavigate } from "react-router";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import Loading from "../../../Components/Loading";

const MyProfile = () => {
  const { user, signOutUser } = useAuth();
  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email ],
    queryFn: async () => (await axiosPublic(`/user/${user?.email}`)).data,
  });

  console.log(userProfile);
  const handleLogout = async () => {
    try {
      signOutUser().then(() => {
        axiosPublic.post("/logout").then((res) => console.log(res.data));
        toast.info("You are logout");
      });
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (isLoading) {
    return <Loading className={"!h-screen"} />;
  }

  return (
    <section className="max-w-3xl mx-auto">
      <DashboardTitle>My Profile</DashboardTitle>

      <div className="mt-6 bg-secondary/20 border border-gray-600/40 rounded-xl p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-dashed pb-4">
          {user?.photoURL ? (
            <img
              src={userProfile?.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-400" />
          )}

          <div>
            <h3 className="text-xl font-semibold">
              {user?.displayName || "User"}
            </h3>
            <p className="text-gray-400 text-sm">
              {userProfile?.role?.toLocaleUpperCase()} ACCOUNT
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-5 space-y-3 text-sm">
          <InfoRow label="Name" value={userProfile?.name || "Not provided"} />
          <InfoRow label="Email" value={userProfile?.email} />
          <InfoRow label="Role" value={userProfile?.role} />
          <InfoRow label="Account Status" value={userProfile?.status} />
        </div>

        {/* Logout */}
        <div className="mt-6 pt-4 border-t border-dashed">
          <button
            onClick={handleLogout}
            className="btn btn-error btn-outline flex items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="font-medium text-gray-500">{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

export default MyProfile;

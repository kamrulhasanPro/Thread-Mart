import React from "react";
import { axiosPublic } from "../../Hooks/axiosPublic";
import { toast } from "react-toastify";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineContactSupport, MdOutlineLogout } from "react-icons/md";

const ProfileDropdown = () => {
  const { user, signOutUser } = useAuth();

  // logout
  const handleLogout = () => {
    signOutUser().then(() => {
      axiosPublic.post("/logout").then((res) => console.log(res.data));
      toast.info("You are logout");
    });
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="photo" src={user.photoURL} />
          </div>
        </div>
        <div
          tabIndex="-1"
          className="dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          {/* profile info */}
          <div className="flex items-center gap-2 overflow-hidden">
            <figure className="w-10 btn btn-ghost btn-circle avatar rounded-full overflow-hidden">
              <img
                src={user?.photoURL}
                alt="photo"
                className="object-cover object-center"
              />
            </figure>
            <div className="leading-tight">
              <h2>{user?.displayName}</h2>
              <p className="text-sm text-gray-400 text-wrap">{user?.email}</p>
            </div>
          </div>
          <hr className="border-gray-600 my-2" />
          {/* navigation */}

          {/* profile */}
          <Link
            to={"/dashboard/profile"}
            className="flex items-center p-1.5 gap-1.5 hover:bg-gray-700 rounded-lg duration-300"
          >
            <FaRegUser size={20} /> Profile
          </Link>

          {/* dashboard */}
          <Link
            to={"/dashboard"}
            className="flex items-center p-1.5 gap-1.5 hover:bg-gray-700 rounded-lg duration-300"
          >
            <LuLayoutDashboard size={20} /> Dashboard
          </Link>

          {/* help center */}
          <Link
            to={"/dashboard"}
            className="flex items-center p-1.5 gap-1.5 hover:bg-gray-700 rounded-lg duration-300"
          >
            <MdOutlineContactSupport size={20} /> Help Center
          </Link>
          <hr className="border-gray-600 my-2" />
          <button
            onClick={handleLogout}
            className="flex items-center p-1.5 gap-1.5 hover:bg-red-500 rounded-lg duration-300 w-full cursor-pointer"
          >
            <MdOutlineLogout size={20} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;

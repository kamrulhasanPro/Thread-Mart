import React from "react";
import DashboardItemsLink from "../Components/Dashboard/DashboardItemsLink";
import { TiHome } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router";
import Logo from "../Components/Logo";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { axiosPublic } from "../Hooks/axiosPublic";
import useRole from "../Hooks/useRole";
import { FaShoppingBag } from "react-icons/fa";

const DashboardLayout = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const { role } = useRole();

  const dashboardItemsLink = (
    <>
      <li onClick={() => navigate("/")}>
        <Logo />
      </li>

      <DashboardItemsLink
        to={"/dashboard"}
        navName={"Home"}
        icon={<TiHome />}
      />

      {role === "admin" && (
        <>
          <DashboardItemsLink
            to={"/dashboard/manage-user"}
            navName={"Manage Users"}
            icon={<AiOutlineProduct />}
          />
          <DashboardItemsLink
            to={"/dashboard/all-products"}
            navName={"All Products"}
            icon={<AiOutlineProduct />}
          />
          <DashboardItemsLink
            to={"/dashboard/all-orders"}
            navName={"All Orders"}
            icon={<AiOutlineProduct />}
          />
        </>
      )}

      {role === "manager" && (
        <>
          <DashboardItemsLink
            to={"/dashboard/add-product"}
            navName={"Add Product"}
            icon={<IoIosAddCircleOutline />}
          />

          <DashboardItemsLink
            to={"/dashboard/manage-products"}
            navName={"Manage Products"}
            icon={<AiOutlineProduct />}
          />

          <DashboardItemsLink
            to={"/dashboard/pending-order"}
            navName={"Pending Orders"}
            icon={<MdOutlinePendingActions />}
          />

          <DashboardItemsLink
            to={"/dashboard/approve-order"}
            navName={"Approve Orders"}
            icon={<BiTask />}
          />
        </>
      )}

      {role === "buyer" && (
        <>
          <DashboardItemsLink
            to={"/dashboard/my-orders"}
            navName={"My Orders"}
            icon={<FaShoppingBag />}
          />
        </>
      )}
    </>
  );

  // logout
  const handleLogout = () => {
    signOutUser().then(() => {
      axiosPublic.post("/logout").then((res) => console.log(res.data));
      toast.info("You are logout");
    });
  };
  return (
    <section>
      <div className="drawer md:drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="peer drawer-toggle"
        />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="md:hidden navbar w-full bg-secondary">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Navbar Title</div>
          </nav>
          {/* Page content here */}
          <div className="p-4 min-h-[calc(100vh-80px)]">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible md:group/sidebar">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-secondary is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <div className="menu w-full grow flex flex-col justify-between">
              {/* List item */}
              <ul>{dashboardItemsLink}</ul>

              {/* profile */}
              <ul className="">
                <DashboardItemsLink
                  to={"/dashboard/profile"}
                  navName={"Profile"}
                  icon={<CgProfile />}
                />

                {/* logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg text-red-400"
                    data-tip={"Logout"}
                  >
                    <LuLogOut />
                    <span className="is-drawer-close:hidden text-nowrap">
                      {"Logout"}
                    </span>
                  </button>
                </li>

                {/* toggle sidebar */}
                <li>
                  <label
                    htmlFor="my-drawer-4"
                    className="flex is-drawer-open:justify-end"
                  >
                    {/* Sidebar toggle icon */}
                    <TbLayoutSidebarRightCollapseFilled />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;

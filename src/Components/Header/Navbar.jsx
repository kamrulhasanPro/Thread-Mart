import React, { useEffect, useState } from "react";
import MyLink from "../MyLink";
import MyContainer from "../MyContainer";
import { Link } from "react-router";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { axiosPublic } from "../../Hooks/axiosPublic";
import Logo from "../Logo";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [scrollY, setScrolled] = useState(false);
  const navList = (
    <>
      <MyLink to={"/"}>Home</MyLink>
      <MyLink to={"/all-products"}>All Items</MyLink>
      <MyLink to={"/about-us"}>About Us</MyLink>
      <MyLink to={"/contact"}>Contact</MyLink>
      {user && <MyLink to={"/dashboard"}>Dashboard</MyLink>}
    </>
  );

  // logout
  const handleLogout = () => {
    signOutUser().then(() => {
      axiosPublic.post("/logout").then((res) => console.log(res.data));
      toast.info("You are logout");
    });
  };

  // scroll header bg color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrollY ? "bg-secondary/80" : "bg-transparent"
      } backdrop-blur-lg shadow-sm `}
    >
      <MyContainer className="navbar justify-between">
        {/* left side */}
        <div className="navbar-start">
          <div className="dropdown">
            {/* mobile menu */}
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {navList}
            </ul>
          </div>
          <Logo />
        </div>

        {/* right side */}
        <div className="navbar-end text-nowrap">
          <ul className="hidden md:flex items-center gap-4 mr-5">{navList}</ul>

          {/* profile or login button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error text-lg text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to={"/login"} className="rounded_btn_outline">
                Login
              </Link>
              <div className="hidden sm:inline-block">
                <Link to={"/register"} className="rounded_btn">
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      </MyContainer>
    </nav>
  );
};

export default Navbar;

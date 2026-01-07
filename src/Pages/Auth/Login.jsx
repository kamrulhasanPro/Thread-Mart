import React, { useState } from "react";
import MyContainer from "../../Components/MyContainer";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineInsertPhoto } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { axiosPublic } from "../../Hooks/axiosPublic";

const Login = () => {
  const { loginUser, googleLoginUser } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // login user
  const handleLogin = (data) => {
    console.log(data);
    setLoading(true);
    loginUser(data.email, data.password)
      .then(async (res) => {
        // store in db
        if (res.user) {
          await axiosPublic.post("/login", data).then((result) => {
            if (result.data) {
              console.log(result);
              setLoading(false);
              reset();
              toast.success("Login Successfully complete.");
              navigate(from || "/");
            }
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.code);
      });
  };

  // google login
  const handleGoogleLogin = () => {
    googleLoginUser().then(async (res) => {
      if (res.user) {
        const user = res.user;

        // add user in db
        await axiosPublic
          .post("/register", {
            email: user?.email,
            name: user.displayName,
            photoURL: user.photoURL,
            role: "buyer",
          })
          .then(() => {});

        // track jwt
        await axiosPublic
          .post("/login", { email: user?.email })
          .then((result) => {
            if (result.data) {
              console.log(result);
              toast.success("Login Successfully complete.");
              navigate(from || "/");
            }
          });
      }
    });
  };

  const checkValidation = `input validator bg-black/50 w-full outline-offset-0`;

  return (
    <MyContainer className={"min-h-[calc(100vh-80px-275px)] flex items-center"}>
      <title>ThreadMart | Login</title>

      <div className="bg-primary/10 max-w-md w-full  mx-auto p-5 rounded-2xl ">
        <h4 className="text-4xl">LogIn </h4>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-2">
          {/* email */}
          <div>
            <label
              className={`${checkValidation} ${
                errors.email && "outline-red-400 border-red-400"
              }`}
            >
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                {...register("email", { required: "email is required" })}
              />
            </label>
            {errors.email && (
              <div className="text-[#ff637d] text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/*  password */}
          <div>
            <label
              className={`${checkValidation} ${
                errors.password && "outline-red-400 border-red-400"
              }`}
            >
              <IoKeyOutline fill="gray" />

              <input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "minimum 6 character or longer",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message:
                      "Password must contain at least one uppercase and one lowercase letter",
                  },
                })}
              />
            </label>
            {errors.password && (
              <div className="text-[#ff637d] text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <button className="btn btn-primary w-full">
            {loading && (
              <span className="w-5 h-5 border-2 border-black rounded-full ease-in-out border-b-transparent animate-spin duration-200"></span>
            )}{" "}
            Login
          </button>
        </form>

        {/* google login */}
        <div>
          <p className="divider">OR</p>
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline text-white w-full border-[#e5e5e5]"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>
        </div>

        {/* demo login */}
        <div>
          <p className="divider">Demo Login</p>
          <div className="flex items-center justify-center gap-2">
            {/* admin demo */}
            <button
              onClick={() =>
                handleLogin({
                  email: "tanvir121@gmail.com",
                  password: "Tanvir",
                })
              }
              className="btn btn-soft btn-accent hover:text-white"
            >
              Admin
            </button>

            {/* manager demo */}
            <button
              onClick={() =>
                handleLogin({
                  email: "rahul121@gmail.com",
                  password: "Manager",
                })
              }
              className="btn btn-soft btn-accent hover:text-white"
            >
              Manager
            </button>

            {/* user */}
            <button
              onClick={() =>
                handleLogin({
                  email: "kamrul6@gmail.com",
                  password: "Kamrul",
                })
              }
              className="btn btn-soft btn-accent hover:text-white"
            >
              User
            </button>
          </div>
        </div>

        <div className="text-center mt-5">
          <h3>Don’t have an account yet?</h3>
          <Link to={"/register"} className="text-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </MyContainer>
  );
};

export default Login;

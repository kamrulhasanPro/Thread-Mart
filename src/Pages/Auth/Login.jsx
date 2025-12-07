import React from "react";
import MyContainer from "../../Components/MyContainer";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineInsertPhoto } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <MyContainer className={"min-h-[calc(100vh-80px)] flex items-center"}>
      <div className="bg-primary/10 max-w-md w-full  mx-auto p-5 rounded-2xl ">
        <h4 className="text-4xl">Lig In </h4>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-8 space-y-2"
        >
          {/* email */}
          <div>
            <label className="input validator bg-black/50 w-full outline-offset-0">
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
                required
                {...register("email")}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          {/*  password */}
          <div>
            <label className={`input validator bg-black/50 w-full outline-offset-0 ${errors.password && 'outline-red-400 border-red-400'}`}>
              <IoKeyOutline fill="gray" />

              <input
                type="password"
                placeholder="********"
                required
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
                minLength={6}
              />
            </label>
            <div className="text-[#ff637d] text-sm mt-1">
              {errors.password && errors.password.message}
            </div>
          </div>

          <button className="btn btn-primary w-full">Register</button>
        </form>

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

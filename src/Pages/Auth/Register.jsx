import React from "react";
import MyContainer from "../../Components/MyContainer";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineInsertPhoto } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Register = () => {
  const { registerUser, signOutUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // create user
  const handleRegister = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then((res) => {
        if (res.user) {
          updateProfile(res.user, {
            displayName: data.name,
            photoURL: data.photoURL,
          }).then(() => {
            signOutUser();
            reset();
            toast.success("Register Success. Please Login");
            navigate("/login");
          });
        }
      })
      .catch((err) => toast.error(err.code));
  };

  const checkValidation = `input validator bg-black/50 w-full outline-offset-0`;

  const validationMassage = (message) => {
    return <div className="text-[#ff637d] text-sm mt-1">{message}</div>;
  };

  return (
    <MyContainer className={"min-h-[calc(100vh-80px)]"}>
      <div className="bg-primary/10 max-w-md w-full mx-auto p-5 rounded-2xl">
        <h4 className="text-4xl">Sign Up With Email</h4>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-8 space-y-2"
        >
          {/* name */}
          <div>
            <label
              className={`${checkValidation}  ${
                errors.name && "outline-red-400 border-red-400"
              }`}
            >
              <FaUser fill="gray" />
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
            </label>
            {errors.name && validationMassage(errors.name.message)}
          </div>

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
                {...register("email", { required: "Enter valid email" })}
              />
            </label>
            {errors.email && validationMassage(errors.email.message)}
          </div>

          {/* photo url */}
          <div>
            <label
              className={`${checkValidation} ${
                errors.photoURL && "outline-red-400 border-red-400"
              }`}
            >
              <MdOutlineInsertPhoto fill="gray" />

              <input
                type="url"
                placeholder="https//:phtourl...."
                {...register("photoURL", { required: "photo url is required" })}
              />
            </label>
            {errors.photoURL && validationMassage(errors.photoURL.message)}
          </div>

          {/* role */}
          <div>
            <label
              className={`${checkValidation} ${
                errors.role && "outline-red-400 border-red-400"
              }`}
            >
              <MdAdminPanelSettings fill="gray" />

              <select
                defaultValue=""
                className="bg-transparent select px-0 border-none w-full outline-none appearance-none [&>*]:bg-primary-content
    [&>*]:text-white focus-visible:px-2"
                {...register("role", { required: "Select a role" })}
              >
                <option disabled value="">
                  Pick a role
                </option>
                <option>Meager</option>
                <option>Buyer</option>
              </select>
            </label>
            {errors.role && validationMassage(errors.role.message)}
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
                // required
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
                // minLength={6}
              />
            </label>

            {errors.password && validationMassage(errors.password.message)}
          </div>

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="text-center mt-5">
          <h3>Already have an account?</h3>
          <Link to={"/login"} className="text-primary">
            Log in
          </Link>
        </div>
      </div>
    </MyContainer>
  );
};

export default Register;

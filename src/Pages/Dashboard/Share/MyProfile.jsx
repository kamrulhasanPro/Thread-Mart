import React, { useState } from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { FaRegEdit, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import Loading from "../../../Components/share/Loading";
import { FcEditImage } from "react-icons/fc";
import { FiSave } from "react-icons/fi";
import { RiImageEditFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { user, signOutUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userImage, setUserImage] = useState(user?.photoURL);
  const [previewImg, setPreviewImag] = useState(null);
  const [name, setName] = useState(user?.displayName || "User");
  const [loading, setLoading] = useState(false);

  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => (await axiosPublic(`/user/${user?.email}`)).data,
  });

  // preview profile
  const handlePreview = (file) => {
    const preview = URL.createObjectURL(file[0]);
    setPreviewImag(preview);
    setUserImage(file[0]);
  };

  // image upload
  const imagesUpload = async (file) => {
    const fromData = new FormData();
    fromData.append("image", file);
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      fromData
    );
    const url = response?.data?.data?.display_url;
    return url;
  };

  // handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    const update = {
      photoURL: userImage,
      name,
    };

    if (previewImg) {
      const photo = await imagesUpload(userImage);
      update.photoURL = photo;
    }

    updateProfile(user, {
      displayName: update.name,
      photoURL: update.photoURL,
    })
      .then(() => {
        axiosPublic
          .patch(`/user/${user?.email}/profile`, update)
          .then((res) => {
            if (res.data.modifiedCount) {
              setLoading(false);
              toast.success("Update Success");
            }
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.code);
      });
    setEditMode(false);
  };

  // logout
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
      <title>ThreadMart | My Profile</title>

      <DashboardTitle>My Profile</DashboardTitle>

      <div className="mt-6 bg-secondary/20 border border-gray-600/40 rounded-xl p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-dashed pb-4">
          <figure className="w-20 h-20 rounded-full relative border-3 border-blue-400">
            {/* profile update */}
            <label htmlFor="update-image">
              <RiImageEditFill
                className={`absolute bottom-0 right-0 ${
                  editMode || "hidden"
                } cursor-cell`}
                size={36}
              />
            </label>
            <input
              hidden
              id="update-image"
              type="file"
              onChange={(e) => handlePreview(e.target.files)}
            />

            {userImage ? (
              <img
                src={previewImg ? previewImg : userImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400" />
            )}
          </figure>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {/* name edi input  */}
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className={`${
                  editMode || "hidden"
                } outline outline-gray-400 focus:outline-white px-2 rounded-sm`}
              />

              {/* name */}
              <h3 className={`${editMode && "hidden"} text-xl font-semibold`}>
                {name}
              </h3>

              {/* edit button */}
              {/* save */}
              <button
                onClick={handleProfileUpdate}
                className={`bg-green-600 hover:bg-green-500 px-2 rounded-full flex items-center gap-1  transition cursor-pointer " ${
                  editMode || "hidden"
                }`}
              >
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  "Save"
                )}
                <FiSave />
              </button>

              {/* cancel and edit */}
              <button
                onClick={() => {
                  setEditMode(!editMode);
                  setPreviewImag(null);
                  setUserImage(user?.photoURL);
                  setName(user?.displayName || "User");
                }}
                className={`${
                  editMode
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-green-600 hover:bg-green-500"
                } px-2 rounded-full flex items-center gap-1  transition cursor-pointer`}
              >
                {editMode ? "Cancel" : "Edit"}
                {editMode ? <MdClose /> : <FaRegEdit />}
              </button>
            </div>

            {/* status */}
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <div className="inline-grid *:[grid-area:1/1]">
                <div
                  className={`status animate-ping ${
                    userProfile?.status === "suspend"
                      ? "status-error"
                      : "status-success"
                  }`}
                ></div>
                <div
                  className={`status ${
                    userProfile?.status === "suspend"
                      ? "status-error"
                      : "status-success"
                  }`}
                ></div>
              </div>{" "}
              {userProfile?.status === "suspend" ? "SUSPEND " : "ACTIVE "}
              {userProfile?.role?.toLocaleUpperCase()} ACCOUNT
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-5 space-y-3 text-sm">
          <InfoRow label="Name" value={name || "Not provided"} />
          <InfoRow label="Email" value={userProfile?.email} />
          <InfoRow label="Role" value={userProfile?.role} />
          <InfoRow label="Account Status" value={userProfile?.status} />
          {userProfile?.message && (
            <InfoRow label="Message/Review" value={userProfile?.message} />
          )}
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

import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import Loading from "../../../Components/Loading";
import { MdEdit } from "react-icons/md";
import ReuseableModal from "../../../Components/ReuseableModal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const updateStatusRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => (await axiosPublic("/users")).data,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateStatus = async (data) => {
    console.log(data);
    const updateStatus = await axiosPublic.patch(
      `/user/${selectedId}/update`,
      data
    );
    if (updateStatus.data.modifiedCount) {
      refetch();
      reset();
      setSelectedId(null);
      toast.success("Add Successfully");
      updateStatusRef.current.close();
    }
    console.log(updateStatus.data);
  };

  return (
    <section>
      <div>
        <DashboardTitle>Manage Users ({allUsers?.length})</DashboardTitle>
      </div>
      <div>
        <div className="overflow-x-auto border border-gray-600/50 rounded-xl max-h-[calc(100vh-100px)]">
          <table className="table text-nowrap">
            {/* head */}
            <thead className="sticky top-0 bg-secondary">
              <tr>
                <th></th>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allUsers.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>

                  {/* product */}
                  <td>
                    <div className="flex gap-2">
                      <figure className="w-10 h-10 overflow-hidden rounded-full border-2 border-primary">
                        <img
                          src={user.photoURL}
                          alt="product image"
                          className="object-cover w-full h-full"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-300">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* role */}
                  <td> {user.role}</td>

                  {/* status */}
                  <td>{user.status}</td>

                  {/* update role */}
                  <td>
                    <div className="flex items-center justify-start gap-2">
                      <button
                        onClick={() => {
                          updateStatusRef.current.show();
                          setSelectedId(user._id);
                        }}
                        className="p-1.5 cursor-pointer bg-emerald-400 rounded-full text-lg inline-block"
                      >
                        <MdEdit />
                      </button>
                      {/* <button
                        onClick={() => handleOpenModal(user._id)}
                        className="p-1.5 cursor-pointer bg-red-400 rounded-full text-lg"
                      >
                        <FaTrashAlt />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? (
            <div className="h-20">
              <Loading />
            </div>
          ) : (
            allUsers.length === 0 && (
              <p className="text-lg text-gray-400 font-medium text-center py-10">
                Not Found Any Users
              </p>
            )
          )}
        </div>
        {/* add track modal */}
        <ReuseableModal modalRef={updateStatusRef}>
          <form
            onSubmit={handleSubmit(handleUpdateStatus)}
            className="flex flex-col gap-2"
          >
            {/* status */}
            <label htmlFor="">
              <select
                defaultValue=""
                className={`w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all validator ${
                  errors.status && "border-red-400 focus:border-red-400"
                } [&>*]:bg-secondary
    [&>*]:text-white`}
                {...register("status", {
                  required: "Select user status.",
                })}
              >
                <option disabled value="">
                  User Status
                </option>
                <option value={"approved"}>Approved</option>
                <option value={"suspend"}>Suspend</option>
              </select>
              {errors.status && (
                <p className="text-red-400 text-sm">{errors.status.message}</p>
              )}
            </label>

            <input
              type="text"
              placeholder="Message/Review"
              className={`w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all `}
              {...register("message")}
            />

            <div className="space-x-2">
              <button type="submit" className="btn  btn-soft btn-primary">
                Update
              </button>
              <button
                type="button"
                onClick={() => updateStatusRef.current.close()}
                className="btn btn-soft btn-error"
              >
                Cancel
              </button>
            </div>
          </form>
        </ReuseableModal>
      </div>
    </section>
  );
};

export default ManageUsers;

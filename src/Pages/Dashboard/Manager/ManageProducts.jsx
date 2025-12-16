import React, { useState } from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../../Components/ConfirmModal";
import { Link } from "react-router";

const ManageProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useAuth();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () =>
      (await axiosPublic(`/manage-product?email=${user?.email}`)).data,
    enabled: !!user?.email,
  });

  console.log(products);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleDelete = async () => {
    const deleted = await axiosPublic.delete(`/product/${selectedId}/delete`);
    if (deleted.data.deletedCount) {
      setOpen(false);
      refetch();
    }
  };
  return (
    <section>
      <div>
        <DashboardTitle>Manage Products</DashboardTitle>
      </div>
      <div>
        <div className="overflow-x-auto border border-gray-600/50 rounded-xl max-h-[calc(100vh-100px)]">
          <table className="table text-nowrap">
            {/* head */}
            <thead className="sticky top-0 bg-secondary">
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>

                  {/* product */}
                  <td>
                    <div className="flex gap-2">
                      <figure className="w-10 h-10 overflow-hidden rounded-lg">
                        <img
                          src={product.images[0]}
                          alt="product image"
                          className="object-cover w-full h-full"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold">{product.productName}</p>
                        <p className="text-gray-300">{product.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* price */}
                  <td>৳ {product.price}</td>

                  {/* payment */}
                  <td>{product.paymentOption}</td>

                  {/* action */}
                  <td>
                    <div className="flex items-center justify-start gap-2">
                      <Link
                        to={`/dashboard/update-product/${product?._id}`}
                        className="p-1.5 cursor-pointer bg-emerald-400 rounded-full text-lg inline-block"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        onClick={() => handleOpenModal(product._id)}
                        className="p-1.5 cursor-pointer bg-red-400 rounded-full text-lg"
                      >
                        <FaTrashAlt />
                      </button>
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
            products.length === 0 && (
              <p className="text-lg text-gray-400 font-medium text-center py-10">
                Not Found Any Product
              </p>
            )
          )}
        </div>
        <ConfirmModal
          isOpen={open}
          type="info"
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          confirmText="Yes, Delete"
          confirmColor="bg-red-400"
          onConfirm={handleDelete}
          onCancel={() => setOpen(false)}
        />
      </div>
    </section>
  );
};

export default ManageProducts;

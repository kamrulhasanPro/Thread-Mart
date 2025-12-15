import React, { useRef, useState } from "react";
import DashboardTitle from "../../../Components/Dashboard/DashboardTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../../Components/ConfirmModal";
import ReuseableModal from "../../../Components/ReuseableModal";

const ManageProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct);
  const modalRef = useRef(null);
  const { user } = useAuth();
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () =>
      (await axiosPublic(`/manage-product?email=${user?.email}`)).data,
  });

  console.log(products);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleDelete = async () => {
    const deleted = await axiosPublic.delete(
      `/product/${selectedProduct?._id}/delete`
    );
    if (deleted.data.deletedCount) {
      setOpen(false);
      refetch();
    }
  };

  const handleEdit = () => {};
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
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        modalRef.current.showModal();
                      }}
                      className="p-1.5 cursor-pointer bg-emerald-400 rounded-full text-lg"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-1.5 cursor-pointer bg-red-400 rounded-full text-lg ml-2"
                    >
                      <FaTrashAlt />
                    </button>
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
      <ReuseableModal modalRef={modalRef}>
        <p>kamrul Hasan</p>
        <button onClick={() => modalRef.current.close()}>Close</button>
      </ReuseableModal>
    </section>
  );
};

export default ManageProducts;

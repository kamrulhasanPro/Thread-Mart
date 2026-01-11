import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { axiosPublic } from "../../Hooks/axiosPublic";
import { toast } from "react-toastify";
import Loading from "../../Components/share/Loading";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const strictRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Payment successful!");
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id || strictRef.current) return;

    strictRef.current = true;

    axiosPublic(`/session-status?session_id=${session_id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        // already processed (409 from backend logic)
        if (data?.status === 409) {
          setMessage(data.message);
        } else {
          setMessage("Payment successful!");
        }

        // example transaction data
        setTransaction({
          sessionId: session_id,
          paymentStatus: data?.status || "Paid",
          customer_email: data?.customer_email,
          transactionID: data?.transaction,
          amount: data?.amount,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to verify payment");
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) return <Loading />;
console.log(transaction);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-primary/30 shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <FaCheckCircle className="text-primary text-6xl" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-primary mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-500 mb-6">{message}</p>

        {/* Transaction Info */}
        {transaction && (
          <div className="bg-base-200 rounded-xl p-5 text-left mb-6">
            <h3 className="font-semibold mb-3 text-lg">Transaction Details</h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                {transaction.transactionID}
              </p>

              <p>
                <span className="font-medium">Amount:</span>{" "}৳
                {transaction.amount}
              </p>

              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {transaction.paymentStatus}
                </span>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {transaction.customer_email}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/my-orders" className="btn btn-primary gap-2">
            <FaShoppingBag /> My Orders
          </Link>

          <Link to="/" className="btn btn-outline btn-primary gap-2">
            <FaHome /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

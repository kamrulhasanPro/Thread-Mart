import { FaTimesCircle, FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-lg w-full text-center p-8 rounded-2xl border border-primary/30 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/10">
            <FaTimesCircle className="text-primary text-6xl" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold text-primary mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mb-6">
          Your payment was not completed. Don’t worry — you can try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn btn-primary gap-2">
            <MdDashboard /> Go Dashboard
          </Link>

          <Link to="/" className="btn btn-outline btn-primary gap-2">
            <FaHome /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;

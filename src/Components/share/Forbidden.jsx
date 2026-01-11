import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-[calc(100vh-40px-80px)] md:min-h-[calc(100vh-40px)] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center p-4 md:p-8 rounded-2xl border border-primary/30 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-primary/10">
            <FaLock className="text-primary text-3xl md:text-5xl" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-6xl font-bold text-primary mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-3">Access Forbidden</h2>
        <p className="text-gray-500 mb-6">
          Sorry, you don’t have permission to access this page. Please contact
          the administrator or go back.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary gap-2">
            <FaHome /> Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-primary gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;

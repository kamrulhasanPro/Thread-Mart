import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdFactory,
  MdChecklist,
  MdLocalShipping,
  MdPayment,
  MdHistory,
} from "react-icons/md";
import HeadTitle from "../../../Components/HeadTitle";

const HowItWorks = () => {
  const howItWorksData = [
    {
      id: 1,
      title: "Submit Bulk Garment Order",
      description:
        "Buyers select products, quantity, and submit their order directly through the platform.",
      icon: <FaShoppingCart size={80} color="#32e6e2" />,
    },
    {
      id: 2,
      title: "Production Process Started",
      description:
        "Managers receive orders and start production stages: cutting, sewing, and finishing.",
      icon: <MdFactory size={80} color="#32e6e2" />,
    },
    {
      id: 3,
      title: "Monitor Quality & Progress",
      description:
        "Orders are tracked step-by-step with status updates and quality checks to ensure accuracy.",
      icon: <MdChecklist size={80} color="#32e6e2" />,
    },
    {
      id: 4,
      title: "Timely Delivery",
      description:
        "Finished garments are packed and shipped, with buyers able to track the delivery in real-time.",
      icon: <MdLocalShipping size={80} color="#32e6e2" />,
    },
    {
      id: 5,
      title: "Invoice & Secure Payment",
      description:
        "Buyers receive automated invoices and complete secure payments through the platform.",
      icon: <MdPayment size={80} color="#32e6e2" />,
    },
    {
      id: 6,
      title: "Order History & Reordering",
      description:
        "Users can view past orders and quickly reorder with saved product and quantity details.",
      icon: <MdHistory size={80} color="#32e6e2" />,
    },
  ];
  return (
    <section className="space-y-7 ">
      {/* <div className="">
        <h3 className="text-5xl text-center">How It Work</h3>
      </div> */}

      <HeadTitle>How It Work</HeadTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-2">
        {howItWorksData.map((step) => (
          <div
            key={step.id}
            className="bg-[#0f172a] p-6 rounded-xl text-white text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(50,230,226,0.25),0_10px_20px_rgba(50,230,226,0.15)]"
          >
            <div className="flex items-center justify-center">{step.icon}</div>
            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
            <span className="text-[#32e6e2] font-bold mt-4 inline-block">
              {step.stepNumber}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

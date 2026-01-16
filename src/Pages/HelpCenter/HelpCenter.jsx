import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaUndo, FaLock, FaHeadset } from "react-icons/fa";
import HeadTitle from "../../Components/share/HeadTitle";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const HelpCenter = () => {
  return (
    <section className="min-h-screen text-slate-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <HeadTitle className="text-4xl md:text-5xl font-bold !m-0">
          ThreadMart Help Center
        </HeadTitle>
        <p className="text-slate-400 mt-2">
          Find answers, guides, and support for your ThreadMart experience.
        </p>
      </motion.div>

      {/* Help Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <HelpCard
          icon={<FaShippingFast />}
          title="Shipping & Delivery"
          desc="Learn about delivery times, tracking, and shipping locations."
        />

        <HelpCard
          icon={<FaUndo />}
          title="Returns & Refunds"
          desc="Easy returns, refund policy, and exchange guidelines."
        />

        <HelpCard
          icon={<FaLock />}
          title="Payments & Security"
          desc="Secure payments, supported methods, and data protection."
        />

        <HelpCard
          icon={<FaHeadset />}
          title="Customer Support"
          desc="Contact our support team for any assistance you need."
        />
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-24 text-center"
      >
        <h2 className="text-3xl font-semibold mb-4">Need More Help?</h2>

        <p className="text-slate-400 mb-10">
          Our support team is always ready to help you with any issue.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Email */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#1eaba8]/20 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(30,171,168,0.35)] transition">
            <p className="text-[#1eaba8] font-semibold mb-1">Email Us</p>
            <p className="text-slate-400 text-sm">support@threadmart.com</p>
          </div>

          {/* Phone */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#1eaba8]/20 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(30,171,168,0.35)] transition">
            <p className="text-[#1eaba8] font-semibold mb-1">Call Support</p>
            <p className="text-slate-400 text-sm">+880 1234-567890</p>
          </div>

          {/* Hours */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#1eaba8]/20 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(30,171,168,0.35)] transition">
            <p className="text-[#1eaba8] font-semibold mb-1">Support Hours</p>
            <p className="text-slate-400 text-sm">
              Sat – Thu
              <br />
              10:00 AM – 8:00 PM
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mt-20"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <FaqItem
            q="How long does delivery take?"
            a="Delivery usually takes 3–7 business days depending on your location."
          />
          <FaqItem
            q="Can I return a product?"
            a="Yes, products can be returned within 7 days if unused and in original condition."
          />
          <FaqItem
            q="Is my payment information safe?"
            a="Absolutely. ThreadMart uses encrypted and secure payment gateways."
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HelpCenter;

/* ---------- Components ---------- */

const HelpCard = ({ icon, title, desc }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6 }}
      className="bg-[#0f172a]/60 backdrop-blur-md border border-[#1eaba8]/20 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(30,171,168,0.35)] transition"
    >
      <div className="text-[#1eaba8] text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </motion.div>
  );
};

const FaqItem = ({ q, a }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-5"
    >
      <h4 className="font-medium mb-2">{q}</h4>
      <p className="text-slate-400 text-sm">{a}</p>
    </motion.div>
  );
};

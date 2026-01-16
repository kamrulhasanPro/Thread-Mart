import React from "react";
import { motion } from "framer-motion";
import HeadTitle from "../../Components/share/HeadTitle";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen text-slate-200 px-4">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
        className="max-w-4xl mx-auto text-center mb-14"
      >
        <HeadTitle className="text-4xl md:text-5xl font-bold !m-0">
          Terms & Conditions
        </HeadTitle>
        <p className="text-slate-400 mt-2">
          Please read these terms carefully before using ThreadMart.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="max-w-4xl mx-auto bg-[#0f172a]/60 backdrop-blur-md border border-[#1eaba8]/20 rounded-2xl p-8 space-y-8"
      >
        <Section
          title="1. Acceptance of Terms"
          text="By accessing or using ThreadMart, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services."
        />

        <Section
          title="2. User Accounts"
          text="You are responsible for maintaining the confidentiality of your account information. ThreadMart is not liable for any loss arising from unauthorized use of your account."
        />

        <Section
          title="3. Orders & Payments"
          text="All orders placed through ThreadMart are subject to availability and confirmation. Prices and payment methods may change without prior notice."
        />

        <Section
          title="4. Shipping & Delivery"
          text="Delivery times are estimates and may vary due to external factors. ThreadMart is not responsible for delays beyond our control."
        />

        <Section
          title="5. Returns & Refunds"
          text="Products may be returned within the specified return period if unused and in original condition. Refunds will be processed according to our return policy."
        />

        <Section
          title="6. Intellectual Property"
          text="All content on ThreadMart, including text, graphics, logos, and software, is the property of ThreadMart and protected by applicable laws."
        />

        <Section
          title="7. Limitation of Liability"
          text="ThreadMart shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services."
        />

        <Section
          title="8. Changes to Terms"
          text="ThreadMart reserves the right to modify these Terms & Conditions at any time. Continued use of the platform indicates acceptance of updated terms."
        />

        <Section
          title="9. Contact Information"
          text="If you have any questions regarding these Terms & Conditions, please contact us at support@threadmart.com."
        />
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;

/* ---------- Section Component ---------- */

const Section = ({ title, text }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-[#1eaba8]">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
};

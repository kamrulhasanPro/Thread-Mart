import React from "react";
import HeadTitle from "../../../Components/share/HeadTitle";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of products does Thread Mart sell?",
      answer:
        "Thread Mart offers a wide range of fashion products including t-shirts, hoodies, pants, and other clothing items made with quality fabrics.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes 2–5 working days depending on your location inside Bangladesh.",
    },
    {
      question: "Do you offer cash on delivery?",
      answer:
        "Yes, we offer cash on delivery for most locations across Bangladesh.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, you can return or exchange products within 7 days if the item is unused and in original condition.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our support team through the contact page or email us anytime. We are available 24/7.",
    },
    {
      question: "Are your products original and good quality?",
      answer:
        "Yes, we focus on premium quality fabrics and strict quality checks before delivery.",
    },
  ];

  return (
    <section>
      <HeadTitle>FAQ</HeadTitle>
      <div className="space-y-2">
        {faqs.map((q, i) => (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay:0.2, duration: 0.8 }}
            viewport={{once: true}}
            key={i}
            tabIndex={0}
            className="collapse collapse-arrow bg-primary/5 border-secondary duration-300 border"
          >
            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
              {q.question}
            </div>
            <div className="collapse-content text-sm text-gray-400">
              {q.answer}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

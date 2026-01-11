import React, { useState } from "react";
import HeadTitle from "../../../Components/share/HeadTitle";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Loading from "../../../Components/share/Loading";
const NewsLetter = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append(
      "access_key",
      `${import.meta.env.VITE_NEWSLETTER_FORM_SECRETE}`
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      toast.success("NewsLetter Subscribed Successfully");
      event.target.reset();
      setLoading(false);
    } else {
      toast.error("Something is problem.");
      setLoading(false);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="px-6 py-16 bg-primary/10 mt-16 rounded-2xl text-center"
    >
      {/* icon */}
      <motion.figure
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center"
      >
        <img
          width="60"
          height="60"
          src="https://img.icons8.com/parakeet/48/new-post.png"
          alt="new-post"
        />
      </motion.figure>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl md:text-5xl font-semibold text-white mb-2"
      >
        Subscribe to Our Newsletter
      </motion.h2>

      <p className="text-gray-400 max-w-2xl mx-auto mb-5 text-lg">
        Get updates about new collections, offers, and fashion trends directly
        in your inbox.
      </p>

      <div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 "
        >
          <label className={`input validator bg-black/20 outline-offset-0 `}>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <button disabled={loading} type="submit" className="rounded_btn">
            {" "}
            {loading ? <Loading /> : "Subscribe"}
          </button>
        </form>
      </div>
      <p className="text-gray-500 text-sm mt-6 italic">
        We respect your privacy. No spam, ever.
      </p>
    </motion.section>
  );
};

export default NewsLetter;

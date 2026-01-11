import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../Components/share/Loading";
import { motion } from "framer-motion";
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append(
      "access_key",
      `${import.meta.env.VITE_CONTACT_FORM_SECRETE}`
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Form Submitted Successfully");
      event.target.reset();
      setLoading(false);
    } else {
      toast.error("Something is problem.");
      setLoading(false);
    }
  };

  const inputBox = `w-full border px-4 py-3 rounded-md outline-none border-primary/20 focus:border-primary transition-all`;
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: 0.15 }}
      className="bg-primary/10 p-8 shadow-md
    border rounded-lg border-primary/50 text-white"
    >
      <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="Name"
          type="text"
          placeholder="Your Name"
          className={inputBox}
        />
        <input
          name="Email Address"
          type="email"
          placeholder="Your Email"
          className={inputBox}
        />
        <input
          name="Subject"
          type="text"
          placeholder="Subject"
          className={inputBox}
        />

        <textarea
          name="Message"
          placeholder="Your Message"
          rows="5"
          className={inputBox}
        />

        {/* submit button */}
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {loading ? <Loading /> : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;

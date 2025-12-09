import React from "react";
import HeadTitle from "../../../Components/HeadTitle";

const NewsLetter = () => {
  return (
    <section className="px-6 py-16 bg-[#0f172a] mt-16 rounded-2xl text-center">
      <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-2">
        Subscribe to Our Newsletter
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto mb-5 text-lg">
        Get updates about new collections, offers, and fashion trends directly
        in your inbox.
      </p>

      <div className="flex items-center justify-center gap-2 ">
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
        <button className="rounded_btn">Subscribe</button>
      </div>
      <p className="text-gray-500 text-sm mt-6">
        We respect your privacy. No spam, ever.
      </p>
    </section>
  );
};

export default NewsLetter;

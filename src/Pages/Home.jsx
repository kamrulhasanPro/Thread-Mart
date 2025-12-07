import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full mx-auto text-center p-12 rounded-2xl shadow-2xl bg-base-100 border border-base-300 space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Premium React Boilerplate ✨
        </h1>
        <p className="text-lg opacity-80 max-w-xl mx-auto leading-relaxed">
          A modern, clean, and production-ready starter template built with
          React, React Router, TailwindCSS, DaisyUI and React-icons.
        </p>

        <div className="divider"></div>

        {/* Creator Card */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://avatars.githubusercontent.com/u/202264583?v=4"
                alt="avatar"
              />
            </div>
          </div>

          <p className="text-xl font-semibold">Created By</p>
          <p className="text-lg font-medium">Kamrul Hasan Miazi</p>

          <a
            href="https://github.com/kamrulhasanPro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-wide flex items-center gap-2 mt-3"
          >
            Visit My GitHub <FaArrowRight className="text-lg" />
          </a>
        </div>

        <div className="divider"></div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl bg-base-200 shadow hover:shadow-lg transition-all border border-base-300">
            <h3 className="text-xl font-bold mb-2">⚡ Fast Setup</h3>
            <p className="opacity-70">
              Jump into development instantly with zero repetitive setup.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow hover:shadow-lg transition-all border border-base-300">
            <h3 className="text-xl font-bold mb-2">🎨 Beautiful UI</h3>
            <p className="opacity-70">
              Designed with TailwindCSS & DaisyUI for clean and modern visuals.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-base-200 shadow hover:shadow-lg transition-all border border-base-300">
            <h3 className="text-xl font-bold mb-2">🚀 Scalable</h3>
            <p className="opacity-70">
              Organized folder structure ready for large applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 relative rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden shadow-lg">

      {/* -------- Left Side ------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] md:mb-[-30px] relative z-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug drop-shadow-md">
          Book With Confidence. <br /> Heal With Assurance
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-medium bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-md">
          <img
            className="w-24 rounded-full ring-2 ring-white/40"
            src={assets.group_profiles}
            alt="Profiles"
          />
          <p className="leading-relaxed">
            No more waiting in long queues or calling clinics.{" "}
            <br className="hidden sm:block" />
            Book trusted doctors instantly, anytime, anywhere.
          </p>
        </div>

        <div id="speciality" className="scroll-mt-20"></div>

        <a
          href="#speciality"
          className="flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Book Appointment
          <img
            className="w-3 animate-pulse invert"
            src={assets.arrow_icon}
            alt="arrow"
          />
        </a>
      </div>

      {/* -------- Right Side ------- */}
      <div className="md:w-1/2 relative flex justify-center items-center z-10">
        <div className="relative w-full md:absolute bottom-0">
          <img
            className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
            src={assets.header_img}
            alt="Doctor illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-700/20 to-transparent rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default Header

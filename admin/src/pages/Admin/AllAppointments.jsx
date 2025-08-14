import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        📅 All Appointments
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr] bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 sticky top-0">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Body */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments.map((item, index) => (
            <div
              key={index}
              className={`sm:grid sm:grid-cols-[0.5fr_3fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b 
                ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50 transition`}
            >
              {/* Index */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <p className="font-medium">{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p>
                {slotDateFormat(item.slotDate)},{" "}
                <span className="text-sm text-gray-500">{item.slotTime}</span>
              </p>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-indigo-200 shadow-sm"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <p className="font-medium">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className="font-semibold text-gray-800">
                {currency}
                {item.amount}
              </p>

              {/* Actions */}
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-semibold bg-red-100 px-3 py-3 rounded-full text-center">
                  Cancelled
                </p>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition"
                  onClick={() => cancelAppointment(item._id, )}
                >
                  <img
                    className="w-4 h-4"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;

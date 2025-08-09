import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Appointments
      </h1>

      {/* Appointment List */}
      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-100"
              />
            </div>

            {/* Doctor & Appointment Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-gray-500">{item.speciality}</p>
                  <p className="mt-2 text-gray-600 font-medium">
                    Address:
                  </p>
                  <p className="text-gray-500">{item.address.line1}</p>
                  <p className="text-gray-500">{item.address.line2}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Date & Time:</span> 11 August 2025 | 11:00 AM
                  </p>
                </div>

                {/* Appointment Status */}
                <span className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  Confirmed
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                Pay Online
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                Cancel Appointment
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                Reschedule
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg text-sm transition-colors duration-300">
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

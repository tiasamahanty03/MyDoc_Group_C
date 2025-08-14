import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full p-6">
      <p className="mb-4 text-xl font-semibold">Doctor Appointments</p>

      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="sticky top-0 grid grid-cols-[60px_1.8fr_1fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b text-white font-semibold bg-gradient-to-r from-[#6A11CB] to-[#2575FC] z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments.length > 0 ? (
          appointments
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[60px_1.8fr_1fr_1fr_2fr_1fr_1fr] items-center py-3 px-6 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Index */}
                <p>{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-2">
                  <img
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                    src={item.userData.image || "/default-avatar.png"}
                    alt=""
                  />
                  <p className="font-medium">{item.userData.name}</p>
                </div>

                {/* Payment */}
                <p className={item.payment ? "text-green-600" : "text-gray-600"}>
                  {item.payment ? "Online" : "Cash"}
                </p>

                {/* Age */}
                <p>{calculateAge(item.userData.dob) || "N/A"}</p>

                {/* Date & Time */}
                <p>
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Fees */}
                <p className="font-medium">
                  {currency}
                  {item.amount}
                </p>

                {/* Action */}
                {item.cancelled ? (
                  <p className="text-red-600 font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;

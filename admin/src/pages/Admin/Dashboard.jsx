import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  return (
    dashData && (
      <div className="m-5 w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📊 Admin Dashboard
        </h1>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-purple-100 p-4 rounded-full flex items-center justify-center">
              <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-purple-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-blue-100 p-4 rounded-full flex items-center justify-center">
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-10 h-10"
              />
            </div>
            <div>
              <p className="text-3xl font-semibold text-blue-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-green-100 p-4 rounded-full flex items-center justify-center">
              <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-green-600">
                {dashData.patients}
              </p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-10 rounded-2xl shadow-md p-6">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5">
            <img src={assets.list_icon} alt="" className="w-5 h-5" />
            <p className="font-semibold text-lg text-gray-800">Latest Bookings</p>
          </div>

          {/* List */}
          <div className="grid gap-4 max-h-[350px] overflow-y-auto pr-1">
            {dashData.latestAppointment.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Left: doctor info */}
                <div className="flex items-center gap-4">
                  <img
                    className="rounded-full w-12 h-12 border border-gray-200 object-cover"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                    <p className="text-gray-500 text-sm">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Right: status or cancel */}
                <div className="flex items-center">
                  {item.cancelled ? (
                    <p className="text-red-600 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 font-semibold">Completed</p>
                  ) : (
                    <p className="text-yellow-600 font-semibold">Pending</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;

import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData])

  return dashData && (
    <div className="m-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Doctors Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <div className="bg-purple-100 p-4 rounded-full">
            <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-semibold text-purple-600">{dashData.doctors}</p>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <div className="bg-blue-100 p-4 rounded-full">
            <img src={assets.appointment_icon} alt="Appointments" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-semibold text-blue-600">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition">
          <div className="bg-green-100 p-4 rounded-full">
            <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
          </div>
          <div>
            <p className="text-3xl font-semibold text-green-600">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;

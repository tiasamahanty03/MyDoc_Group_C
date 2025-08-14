import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Doctors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-6">
          {doctors.map((item, index) => (
            <div 
            key={index} 
            className="bg-indigo-50 hover:bg-indigo-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
            
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-700 mb-3">{item.speciality}</p>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={item.available} onChange={()=> changeAvailability(item._id)}
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-400"/>
                    <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                        {item.available ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList

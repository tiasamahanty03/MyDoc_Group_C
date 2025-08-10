import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    image: assets.profile_pic,
    email: '',
    phone: '+91 ',
    address: {
      line1: '',
      line2: ''
    },
    gender: 'M/F',
    dob: 'yyyy-mm-dd'
  });

  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleToggleEdit = () => {
    if (isEdit) {
      console.log("Saved:", userData)
    }
    setIsEdit(prev => !prev)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-purple-300 to-purple-400 p-6">
      <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <img
            src={userData.image}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
          />
          <div className="w-full mt-4 text-center">
            {isEdit ? (
              <input
                type="text"
                className="w-full text-lg font-semibold text-center border border-purple-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={userData.name}
                placeholder="NAME"
                onChange={e => handleChange("name", e.target.value)}
              />
            ) : (
              <div className="w-full border border-purple-300 rounded-md p-2 text-lg font-semibold text-center">
                {userData.name || 'NAME'}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {/* Fields mapping */}
          {[
            ['Email', 'email', 'email'],
            ['Phone', 'phone', 'text'],
            ['Address Line 1', 'line1', 'text', true],
            ['Address Line 2', 'line2', 'text', true],
            ['Gender', 'gender', 'select'],
            ['Date of Birth', 'dob', 'date']
          ].map(([label, key, type, isAddress]) => {
            const value = isAddress ? userData.address[key] : userData[key]
            return (
              <div key={key}>
                <label className="text-sm font-semibold">{label}:</label>
                {isEdit ? (
                  type === 'select' ? (
                    <select
                      className="w-full mt-1 border border-purple-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={userData.gender}
                      onChange={e => handleChange("gender", e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      type={type}
                      className="w-full mt-1 border border-purple-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={value}
                      onChange={e =>
                        isAddress
                          ? handleAddressChange(key, e.target.value)
                          : handleChange(key, e.target.value)
                      }
                      placeholder={label}
                    />
                  )
                ) : (
                  <div className="w-full mt-1 border border-purple-200 rounded-md p-2 bg-gray-50 min-h-[42px]">
                    {value || <span className="text-gray-400">{label}</span>}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleToggleEdit}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-200 ease-in-out"
          >
            {isEdit ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

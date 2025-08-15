import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateUserProfileData = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (image) formData.append('image', image)

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)

        if (image) {
          setUserData(prev => ({ ...prev, image: URL.createObjectURL(image) }))
        }

        await loadUserProfileData()

        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      address: { ...(prev.address || {}), [field]: value }
    }))
  }

  const handleToggleEdit = () => {
    if (isEdit) {
      updateUserProfileData() // Save changes
    } else {
      setIsEdit(true) // Enable edit mode
    }
  }

  return userData && (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-purple-300 to-purple-400 p-6">
      <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image">
              <div className="relative w-28 h-28">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                />
                {!image && (
                  <img
                    src={assets.upload_icon}
                    alt="Upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full p-1 border border-purple-300"
                  />
                )}
              </div>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
          )}

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

        {/* Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {[
            ['Email', 'email', 'email'],
            ['Phone', 'phone', 'text'],
            ['Address Line 1', 'line1', 'text', true],
            ['Address Line 2', 'line2', 'text', true],
            ['Gender', 'gender', 'select'],
            ['Date of Birth', 'dob', 'date']
          ].map(([label, key, type, isAddress]) => {
            const value = isAddress ? userData.address?.[key] || "" : userData[key] || ""
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
                      value={value || ""}
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

        {/* Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleEdit}
            disabled={loading}
            className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : isEdit ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

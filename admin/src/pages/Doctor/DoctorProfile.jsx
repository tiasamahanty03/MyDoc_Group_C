import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 flex flex-col sm:flex-row items-center gap-6">
            <img
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              src={profileData.image}
              alt={profileData.name}
            />
            <div className="text-center sm:text-left text-white">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-lg opacity-90">
                {profileData.degree} — {profileData.speciality}
              </p>
              <span className="inline-block mt-2 px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-sm">
                {profileData.experience}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 space-y-6">
            {/* About */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                About
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {profileData.about}
              </p>
            </section>

            {/* Appointment Fee */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                Appointment Fee
              </h2>
              <p className="text-blue-600 font-medium">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-2 py-1 w-28"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </p>
            </section>

            {/* Address */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
                Address
              </h2>
              <p className="text-gray-600 text-sm">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full mb-2"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line1}
                    />
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address.line2}
                    />
                  </>
                ) : (
                  <>
                    {profileData.address.line1}
                    <br />
                    {profileData.address.line2}
                  </>
                )}
              </p>
            </section>

            {/* Availability */}
            <section>
              <div className="flex items-center gap-2">
                <input
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  type="checkbox"
                  id="available"
                  className="w-4 h-4"
                />
                <label htmlFor="available" className="text-gray-700">
                  Available
                </label>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex gap-3">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

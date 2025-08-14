import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext.jsx"
import { useNavigate } from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext.jsx"

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const {dToken, setDToken}= useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    aToken && setAToken("")
    aToken && localStorage.removeItem("aToken")
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    
  };

  return (
    <div className="flex items-center justify-between text-sm py-3  border-b border-b-purple-400 bg-white sticky top-0 z-90 shadow-sm px-4 md:px-8">
      <div className="flex items-center gap-130 text-2xl">
        <img
          className="h-16 sm:w-27 cursor-pointer"
          src={assets.myDoc_logo}
          alt=""
        />
        <p className=" px-8 py-3  text-blue-900  font-bold  transition-all duration-200 ">
          {aToken ? "Admin" : "Doctor"} Panel
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar

import React, { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  const navItemStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-300"

  return (
    <div className="flex min-h-screen w-55 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 p-5">
      {aToken && (
        <ul className="flex flex-col gap-3 w-full">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `${navItemStyle} ${
                isActive
                  ? "bg-white text-indigo-600 font-semibold"
                  : "text-white hover:bg-white hover:text-indigo-600"
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `${navItemStyle} ${
                isActive
                  ? "bg-white text-indigo-600 font-semibold"
                  : "text-white hover:bg-white hover:text-indigo-600"
              }`
            }
          >
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-5"
            />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `${navItemStyle} ${
                isActive
                  ? "bg-white text-indigo-600 font-semibold"
                  : "text-white hover:bg-white hover:text-indigo-600"
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `${navItemStyle} ${
                isActive
                  ? "bg-white text-indigo-600 font-semibold"
                  : "text-white hover:bg-white hover:text-indigo-600"
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}
export default Sidebar

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  
  const { searchTerm,setSearchTerm} = useContext(AppContext)
  const navigate = useNavigate()

  const handleSearch = (e) =>{
    if (e.key === "Enter")(
      navigate("/doctors")
    )
  }
  const {token,setToken,userData} = useContext(AppContext)
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }
  const [isAdmin] = useState(true); // Change to false for non-admin
  // const [username] = useState("Tiasa!!"); // Replace with actual username from context/auth
  const username = userData?.name || "Guest"; // Replaced with actual username

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-purple-400 bg-white sticky top-0 z-90 shadow-sm px-4 md:px-8'>
      <img onClick={() => navigate('/')} className='w-[100px] h-[60px] cursor-pointer' src={assets.myDoc_logo}alt="logo"/>
      <ul className='hidden md:flex items-center gap-8 font-medium'>
        {[
          { name: 'Home', path: '/' },
          { name: 'All Doctors', path: '/doctors' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
        ].map((link, index) => (
          <NavLink key={index} to={link.path} className={({ isActive }) => isActive ? "text-purple-500 border-b-2 border-purple-500 pb-1" : "hover:text-purple-500"}>
            {link.name}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-5'>
        <input
          type="text"
          placeholder="Search doctors..."
          className="hidden lg:block px-6 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}/>

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            {/* Greeting */}
            <p className='hidden md:block text-gray-600'>Hi,{username}</p>
            <img className='w-9 h-9.5 object-cover rounded-full ' src={userData.image} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-45 bg-stone-100 rounded flex flex-col gap-3 p-3 mt-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
          >
            Create/Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar

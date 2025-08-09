import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {

  const primary = "#9d6cfe"
  const navigate =useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token,setToken] = useState(true)
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')}
      className='w-[100px] h-[60px]'
      src={assets.myDoc_logo} alt="" />
      <ul className='hidden md:flex items-start gap-8 font-medium'>
        <NavLink to='/' >
            <li className='py-1'>Home</li>
            <hr style={{backgroundColor:primary}}
            className={`border-none outline-none h-0.5  w-3/5 m-auto hidden`}/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>All Doctors</li>
            <hr  style={{backgroundColor:primary}}
            className={`border-none outline-none h-0.5 w-3/5 m-auto hidden`}/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr  style={{backgroundColor:primary}}
            className={`border-none outline-none h-0.5 w-3/5 m-auto hidden`}/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr  style={{backgroundColor:primary}}
            className={`border-none outline-none h-0.5 w-3/5 m-auto hidden`}/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token 
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-11 rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-45 bg-stone-100 rounded flex flex-col gap-3 p-3 mt-4'>
                <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
          :<button onClick={()=>navigate('/login')}
        className='bg-purple-500 text-white px-8 py-3 rounded-full font-medium hidden md:block'>Create/Login</button>
        }
        <img className='w-6 md:hidden' src={assets.menu_icon} alt="" />
      </div>
    </div>
  )
}

export default Navbar

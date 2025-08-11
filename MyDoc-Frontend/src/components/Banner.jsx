import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex bg-gradient-to-r from-purple-500 to-indigo-700 rounded-lg px-6 sm:px-10 md:px-14 lg:px-8 my-20 md:mx shadow-lg'>
      
      {/*---------- Left Side ----------*/}
      <div className='flex-1 py-10 sm:py-16 lg:py-24 lg:pl-5 flex flex-col justify-center'>
        <p className='text-white text-sm uppercase tracking-wide mb-2'>Your Health, Our Priority</p>
        
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-snug'>
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>

        <p className='text-white/90 mt-4 max-w-md text-sm sm:text-base'>
          Get expert medical care from top specialists across all fields — anytime, anywhere.
        </p>

        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
          className='bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-medium text-l px-0 py-3 rounded-full mt-8 hover:scale-105 transition-all shadow-md hover:shadow-lg'
        >
          Create Account
        </button>
      </div>

      {/*---------- Right Side ----------*/}
      <div className='hidden md:flex md:w-1/2 lg:w-[370px] relative justify-center items-end'>
        <img 
          className='w-full max-w-md' 
          src={assets.appointment_img} 
          alt="Doctor Appointment Illustration" 
        />
      </div>

    </div>
  )
}

export default Banner

import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-purple-500 rounded-lg px-6 md:px-10 lg:px-20'>
      
      {/* --------LeftSide-------*/}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
         <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book With Confidence. <br /> Heal With Assurance 
         </p>
         <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-medium'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>No more waiting in long queues or calling clinics. <br className='hidden sm:block' /> Book trusted doctors instantly, anytime, anywhere.</p>
         </div>
         <div id="speciality" className="scroll-mt-20">
         </div>
         <a href="#speciality" className=' flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-500 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book appointment <img className='w-3' src={assets.arrow_icon}alt="" />
         </a>
      </div>

      {/* --------RightSide-------*/}
      <div className='md:w-1/2 relative'>
         <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header

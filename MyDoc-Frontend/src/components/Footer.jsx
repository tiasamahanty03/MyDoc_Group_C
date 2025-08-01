import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-row grid-cols gap-30 my-10 mt-40 text-sm'>

       {/*----------LeftSide----------*/}
       <div>
        <img className='w-[130px] h-[75px] mb-4 ' src={assets.myDoc_logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>MyDoc is your trusted partner in healthcare, simplifying the way you connect with medical professionals. Whether you're booking consultations, managing appointments, or accessing expert care, our platform ensures a seamless and secure experience. Prioritizing convenience, privacy, and reliability — we bring quality healthcare to your fingertips.</p>
       </div>

       {/*----------Center----------*/}
       <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
        </ul>
       </div>

        {/*----------RightSide----------*/}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+6489384798</li>
                <li>mydoc@gmail.com</li>
            </ul>
        </div>
    </div>
       {/*-----------CopyRight---------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@MyDoc-All Right Reserved.</p>
            </div>
    </div>
    
    )
}

export default Footer

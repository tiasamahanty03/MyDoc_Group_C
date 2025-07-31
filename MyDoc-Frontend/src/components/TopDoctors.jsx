import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Appointment from '../pages/Appointment'
import { AppContext } from '../context/AppContext'


const TopDoctors = () => {

  const navigate = useNavigate()
  const {doctors} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book </h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply Browse through our extensive list of trusted doctors</p>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0,10).map((item,index)=>(
            <div onClick={()=>navigate(`./Appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-15px] transition-all duration-900' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap- text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p className='px-1'>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
          ))}
      </div>
      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0)}} className='bg-purple-500 text-white px-12 py-3 rounded-full mt-10 border-purple-950 hover:translate-y-[-3px] transition-all duration-400'>More</button>
    </div>
  )
}

export default TopDoctors

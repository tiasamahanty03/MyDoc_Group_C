import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { doctors } from '../assets/assets';

const Doctors = () => {

const { speciality } = useParams();
/*console.log(speciality)*/

const [filterDoc,setFilterDoc] = useState([])
const navigate = useNavigate()

const {doctors} = useContext(AppContext)

const applyFilter = () => {
  if (speciality) {
    setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
  } else {
    setFilterDoc(doctors)
  }
}

useEffect(()=>{
  applyFilter()
  },[doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialiats</p>
      <div className='flex flex-col sm:flex-row items-start gap-9 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "General Physician" ? "bg-purple-300 text-black" : "" }`}>General Physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "Gynecologist" ? "bg-purple-300 text-black" : "" }`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "Dermatologist" ? "bg-purple-300 text-black" : "" }`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "Pediatrician" ? "bg-purple-300 text-black" : "" }`}>Pediatrician</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "Neurologist" ? "bg-purple-300 text-black" : "" }`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all hover:translate-y-[2px] cursor-pointer ${speciality === "Gastroenterologist" ? "bg-purple-300 text-black" : "" }`}>Gastroenterologist</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            filterDoc.map((item,index)=>(
            <div onClick={()=> navigate(`./appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-15px] transition-all duration-900' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap- text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p className='px-1'>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors

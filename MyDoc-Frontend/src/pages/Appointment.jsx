import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Doctors from './Doctors'
import { assets } from '../assets/assets'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors,currencySymbol} = useContext(AppContext)
  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const [docInfo,setDocInfo] = useState(null)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
  setDocInfo(docInfo)
  console.log(docInfo)
  }

  const getAvailableSlots = async () => {
setDocSlots([])

//getting current date
let today = new Date()

for(let i=0 ; i<7 ; i++){
  //getting current date with index
  let currentDate = new Date(today)
  currentDate.setDate(today.getDate()+i)

  //setting end time of the date with index
  let endTime = new Date()
  endTime.setDate(today.getDate()+i)
  endTime.setHours(21,0,0,0)

  //setting hours
  if (today.getDate() === currentDate.getDate()) {
    currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
    currentDate.setMinutes(currentDate.getMinutes() > 30? 30 : 0)
  } else {
    currentDate.setHours(10)
    currentDate.setMinutes(0)
  }

  let timeSlots =[]

  while(currentDate < endTime){
    let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit'})

    // add slot to array
    timeSlots.push({
      datetime : new Date(currentDate),
      time : formattedTime
    })

    //increment current time by 30 minutes
    currentDate.setMinutes(currentDate.getMinutes() +30)
  }
   if (timeSlots.length >0){
     setDocSlots(prev => ([...prev,timeSlots]))
   }
}
}

  useEffect(() => {
  fetchDocInfo()
  return () => setDocInfo(null)
}, [docId])

useEffect(()=>{
getAvailableSlots()
},[docInfo])

useEffect(()=>{
  console.log(docSlots);
},[docSlots])


  return docInfo && (
    <div>
    {/*-----------Doctors Details ------------- */}
    <div className='flex flex-col sm:flex-row gap-4'>
      <div>
        <img className='bg-indigo-300 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
      </div>

      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        {/*-----------Doc info : name, degree, experience ------------- */}
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
          <img className='w-5' src={assets.verified_icon} alt="" /></p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-700'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>

         {/*-----------Doctors About------------- */}
         <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-700 max-w-[700px] mt-1'>{docInfo.about}</p>
         </div>
         <p className='text-gray-900 font-medium mt-4'>Appointment Fee : <span className='text-gray-950'>{currencySymbol}{docInfo.fees}</span></p>
      </div>
    </div>

    {/*-------Booking slots------- */}
    <div className='sm:ml-72 sm:pl mt-4 font-medium text-gray-800 '>
      <p className='text-xl px-89'>Booking Slots</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots.map((item,index)=>(
          <div onClick ={ () => setSlotIndex(index)} className={`text-center py-11 min-w-27 rounded-full cursor-pointer ${slotIndex === index ? 'bg-purple-500 text-white' : 'border border-gray-300 hover:scale-95 transition shadow'}`} key = {index}>
            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()} </p>
            </div>
          ))
        }
      </div>

      <div>
        
      </div>

    </div>
    </div>
  )
}

export default Appointment

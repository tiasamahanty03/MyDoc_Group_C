import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createStaticHandler } from "react-router-dom"

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments,setappointments] = useState([])
  const months = [" ","January","February","March","April","May","June","July","August","September","October","November","December"]

  const slotDateFormat =(slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " "+months[Number(dateArray[1])]+ " " + dateArray[2]
  }

  const navigate = useNavigate()
  
  const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      if (data.success) {
        setappointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        navigate("/my-appointments")
      } 
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

 const initPay = (order)=> {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR.
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment for doctor",
      order_id: order.id, //This is the order_id created by you in the backend
      receipt: order.receipt,
      handler : async (response) => { 
        console.log(response)

        try {
          const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay',response, {headers:{token}})
          if (data.success) {
            toast.success(data.message)
            getUserAppointments()
            getDoctorsData()
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();

 }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId}, {headers:{token}})
      if (data.success) {
        initPay(data.order)
        toast.success("Payment initiated")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }




  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Appointments
      </h1>

      {/* Appointment List */}
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-shadow duration-300">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img src={item.docData.image}alt={item.name}className="w-28 h-28 object-cover rounded-full border-4 border-blue-100"/>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-semibold text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-500">{item.docData.speciality}</p>
                  <p className="mt-2 text-gray-600 font-medium">Address:</p>
                  <p className="text-gray-500">{item.docData.address.line1}</p>
                  <p className="text-gray-500">{item.docData.address.line2}</p>
                  <p className="mt-2 text-sm text-gray-600"><span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
                </div>

                {/* Appointment Status */}
                <span className="mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">Confirmed</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {!item.cancelled && item.payment && <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300"> Paid </button>}
              {!item.cancelled && !item.payment &&  <button onClick={()=>appointmentRazorpay(item._id)} className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300"> Pay Online </button>}
              {!item.cancelled && <button onClick={()=> cancelAppointment(item._id, item.docData._id)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300"> Cancel Appointment </button>}
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments

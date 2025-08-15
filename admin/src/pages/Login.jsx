import React, { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import axios from "axios"
import { toast } from 'react-toastify'
import { DoctorContext } from "../context/DoctorContext"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [state, setState] = useState("Admin")

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {setAToken,backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
        if (state === 'Admin'){

            const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
            if (data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
                navigate("/admin-dashboard")
            } 
            else {
              toast.error(data.message)
            }
        }
        else
          {
            const {data} = await axios.post(backendUrl + '/api/doctor/login', {email,password})
            if (data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                console.log(data.token)
                navigate("/doctor-dashboard")
            } 
            else {
              toast.error(data.message)
            }
          } 
    }
     catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-cyan-200 via-purple-200 to-blue-300">
      <div className="flex flex-col gap-5 bg-white m-auto items-start p-8 w-full max-w-sm rounded-2xl shadow-xl border border-purple-200">
        
        <div className="w-full flex justify-center">
          <img
            src={assets.myDoc_logo}
            alt="Logo"
            className="w-19 h-14 object-contain"
          />
        </div>

        <h2 className="text-lg font-semibold text-purple-700 w-full text-center">{state} Login </h2>

        <div className="w-full">
          <label className="block mb-1 text-gray-600 font-medium">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email"className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 transition"/>
        </div>

        <div className="w-full">
          <label className="block mb-1 text-gray-600 font-medium">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 transition"/>
        </div>

        <button type="submit"className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md">
          Login
          </button>

        {/* Switch user type */}
        <p className="text-xs text-gray-500 text-center w-full">
          Not an {state}?{" "}
          <span className="text-purple-600 cursor-pointer hover:underline" onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}> Switch to {state === "Admin" ? "Doctor" : "Admin"}</span>
        </p>
      </div>
    </form>
  )
}

export default Login

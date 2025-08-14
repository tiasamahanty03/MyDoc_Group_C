import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import  axios  from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Sign Up')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
     event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name : fullName,password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
         toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      
    }
    console.log({ fullName, email, password })
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 p-8 rounded-2xl shadow-xl bg-white min-w-[340px] sm:min-w-96 border border-purple-100 text-zinc-600 text-sm"
      >
        <p className="text-2xl font-bold text-purple-600">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-sm text-zinc-500">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value = {fullName}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-md text-base transition duration-300"
        >
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        <div className="text-sm text-center mt-2 text-zinc-500">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                className="text-purple-500 font-medium cursor-pointer hover:underline"
                onClick={() => setState('Login')}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{' '}
              <span
                className="text-purple-500 font-medium cursor-pointer hover:underline"
                onClick={() => setState('Sign Up')}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login

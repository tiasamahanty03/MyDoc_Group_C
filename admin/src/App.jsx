import React, { useContext } from "react"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext.jsx"
import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Admin/Dashboard.jsx"
import AllAppointments from "./pages/Admin/AllAppointments.jsx"
import AddDoctor from "./pages/Admin/AddDoctor.jsx"
import DoctorsList from "./pages/Admin/DoctorsList.jsx"

const App = () => {
  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className='bg-purple-50'>
      <ToastContainer />
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App

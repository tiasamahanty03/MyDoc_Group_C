import React, { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import { AdminContext } from "../../context/AdminContext"
import { toast } from "react-toastify"
import axios from "axios"

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState("1 Year")
  const [fees, setFees] = useState("")
  const [about, setAbout] = useState("")
  const [speciality, setSpeciality] = useState("General Physician")
  const [degree, setDegree] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  const {backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
        if (!docImg) {
            return toast.error('Image Not Selected')
        }

        const formData = new FormData()

        formData.append('image',docImg)
        formData.append('name',name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('experience',experience)
        formData.append('fees',Number(fees))
        formData.append('about',about)
        formData.append('speciality',speciality)
        formData.append('degree',degree)
        formData.append('address',JSON.stringify({line1:address1, line2:address2}))

        //console.log(formData)
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData,{headers : {aToken}})

        if(data.success)
        {
          toast.success(data.message)
          setDocImg(false)
          setName("")
          setPassword("")
          setEmail("")
          setAddress1("")
          setAddress2("")
          setDegree("")
          setAbout("")
          setFees("")
        }
        else{
          toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
      {/* Title */}
      <h2 className="text-2xl text-center font-bold text-gray-800 border-b pb-2">
        Add Doctor
      </h2>

      {/* Upload Area */}
      <div className="flex flex-col items-center gap-3">
        <label
          htmlFor="doc-img"
          className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500 transition-all"
        >
          {docImg ? (
            <img
              src={URL.createObjectURL(docImg)}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={assets.upload_area}
              alt="Upload"
              className="w-10 h-10 object-contain"
            />
          )}
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        {!docImg && (
          <p className="text-gray-600 text-center">Upload doctor image</p>
        )}
      </div>

      {/* Two Column Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Doctor Name</p>
            <input onChange={(e)=> setName(e.target.value)} value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700">Doctor Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700">Doctor Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700">Experience</p>
            <select onChange={(e)=> setExperience(e.target.value)} value={experience} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none">
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-medium text-gray-700">Fees</p>
            <input onChange={(e)=> setFees(e.target.value)} value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Speciality</p>
            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="font-medium text-gray-700">Education</p>
            <input onChange={(e)=> setDegree(e.target.value)} value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700">Address</p>
            <input onChange={(e)=> setAddress1(e.target.value)} value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full mb-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input onChange={(e)=> setAddress2(e.target.value)} value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700">About Doctor</p>
        <textarea onChange={(e)=> setAbout(e.target.value)} value={about}
          placeholder="Write about doctor"
          rows={5}
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition-all"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor

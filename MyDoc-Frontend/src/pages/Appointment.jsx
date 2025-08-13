import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import Doctors from "./Doctors"
import { assets } from "../assets/assets"
import RelatedDoctors from "../components/RelatedDoctors"
import axios from "axios"
import { toast } from "react-toastify"

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol,backendUrl,token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  };

const getAvailableSlots = async () => {

  setDocSlots([]);

  let today = new Date();

  for (let i = 0; i < 8; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date();
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(
        currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
      );
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeSlots = [];

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const isSlotBooked =
        docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(formattedTime);

      if (!isSlotBooked) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
      }

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    // Only add the day if there is at least one available slot
    if (timeSlots.length > 0) {
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  }
};

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment",{ docId, slotDate, slotTime },{ headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchDocInfo()
    return () => setDocInfo(null);
  }, [docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return (
    docInfo && (
      <div>
        {/*-----------Doctors Details ------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-indigo-300 w-full sm:max-w-72 rounded-lg"src={docInfo.image}alt=""/>
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
        {/*-----------Doc info : name, degree, experience ------------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

        {/*-----------Doctors About------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-700 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-900 font-medium mt-4">
              Appointment Fee :{" "}
              <span className="text-gray-950">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*-------Booking slots------- */}
        <div className="sm:ml-72 sm:pl mt-4 font-medium text-gray-800 ">
          <p className="text-xl px-89">Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-11 min-w-27 rounded-full cursor-pointer ${slotIndex === index ? "bg-purple-500 text-white" : "border border-gray-300 hover:scale-95 transition shadow"}`}key={index}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()} </p>
                </div>
              ))}
          </div>

          {docSlots.length > 0 && (
            <div className="mt-4">
              <label className="block mb-1 text-sm">Select Time Slot:</label>
              <select className="px-4 py-2 border border-gray-300 rounded-md hover:scale-95 transition-all shadow" value={slotTime} onChange={(e) => setSlotTime(e.target.value)}>
                <option value="">-- Choose a time --</option>
                {docSlots[slotIndex]?.map((item, index) => (
                  <option key={index} value={item.time}>
                    {item.time.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <button onClick={bookAppointment}
             className="bg-purple-500 text-white text-sm font-medium px-14 py-3 rounded-full my-6 hover:scale-105 shadow">
             Book Appointment</button>
          </div>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  )
}

export default Appointment

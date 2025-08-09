import React from 'react' 
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-blue-900'>
        <p> ABOUT <span className='text-2xl font-bold text-blue-900 text-center'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[500px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-700'>
          <p>At MY DOC, we believe healthcare should be simple, transparent, and accessible to everyone. Our platform was built with the vision of removing the stress and uncertainty from booking a doctor’s appointment. Instead of juggling phone calls, long queues, and unclear schedules, MY DOC gives you a seamless way to search for trusted doctors, view their qualifications, check their availability, and book appointments online—all from the comfort of your home. Whether you’re looking for a family physician, a specialist, or a diagnostic service, our goal is to connect you to the right healthcare professional at the right time.</p>
          <p>We understand that healthcare is not just about treating illness—it’s about building trust, maintaining long-term relationships, and ensuring timely care. That’s why MY DOC partners with verified doctors and clinics to provide accurate information, real-time scheduling, and a safe environment for patients. Every doctor on our platform has a detailed profile so you can make informed choices based on expertise, experience, and patient feedback. We also ensure that our booking system is fast, secure, and user-friendly, so your healthcare journey begins without unnecessary delays.</p>
          <b className='text-gray-800'>OUR MISSION</b>
          <p>Our mission goes beyond appointment booking. We aim to empower patients with the knowledge and tools they need to take control of their health. From preventive check-ups to specialized treatments, MY DOC is here to guide you every step of the way. We are constantly innovating our platform to bring you new features, such as teleconsultations, prescription management, and health reminders, making quality healthcare more accessible than ever before. At MY DOC, your well-being is our priority, and we are committed to bridging the gap between patients and healthcare providers with convenience, care, and trust at the core of everything we do.
</p>
        </div>
      </div>


<div className="bg-blue-50 py-10 px-4 rounded-xl mt-10">
  <h2 className="text-2xl font-bold text-blue-900 text-center">Why Choose Us</h2>
  <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
    We’re here to make healthcare simple, secure, and accessible.
  </p>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Easy & Quick Booking</h3>
      <p className="text-gray-600 mt-1">
        Find your doctor, check availability, and book in just a few clicks.
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Verified Doctors</h3>
      <p className="text-gray-600 mt-1">
        We partner only with trusted, qualified healthcare professionals.
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Real-Time Availability</h3>
      <p className="text-gray-600 mt-1">
        Choose appointment slots that work best for your schedule.
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Secure & Reliable</h3>
      <p className="text-gray-600 mt-1">
        Your personal and health data is always protected with us.
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Patient Reviews</h3>
      <p className="text-gray-600 mt-1">
        Read real feedback from other patients before you book.
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-blue-900">Beyond Booking</h3>
      <p className="text-gray-600 mt-1">
        Get reminders, teleconsultations, and health management tools.
      </p>
    </div>
  </div>
</div>


    </div>
  )
}

export default About

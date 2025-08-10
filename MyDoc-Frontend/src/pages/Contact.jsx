import { assets } from "../assets/assets"

const Contact = () => {
  return (
    <div className="px-6 py-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 w-full flex justify-center">
  <img src={assets.contact_image}alt="Contact"className="rounded-lg shadow-md w-80 h-auto md:w-96"/>
        </div>

        <div className="md:w-2/3 w-full">
          <h2 className=" text-3xl font-bold text-blue-900">Contact Us</h2>
          <p className="text-gray-600 mt-2">Have questions or need help with your booking? Our team is here to assist you.</p>

          <div className="mt-6 space-y-2">
            <p className="text-gray-700"><strong>📞 Phone:</strong> +91 98765 43210</p>
            <p className="text-gray-700"><strong>📧 Email:</strong> support@mydoc.com</p>
            <p className="text-gray-700"><strong>📍 Address:</strong> 123 Health Street, Kolkata, India</p>
          </div>

          {/* Contact Form */}
          <form className="mt-6 space-y-4">
            <input type="text"placeholder="Your Name"className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="email"placeholder="Your Email"className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <textarea placeholder="Your Message"rows="4"className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit"className="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"> Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

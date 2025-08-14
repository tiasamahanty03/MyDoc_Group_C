import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'


//API to register user
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if ( !name || !password || !email) {
            return res.json({success:false,message:"Missing Details"})
        }
        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Enter a valid email!"})
        }
        // validating strong password
        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )

        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//API for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select("-password")

    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to update user profile
const updateProfile = async (req,res) => {
    try {
        const {userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success:false,message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true,message:"Profile Updated"})

    } catch (error) {
        console.log(error)
    res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Fetch fresh doctor data
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) return res.json({ success: false, message: "Doctor not found" });

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Ensure slots_booked exists
    let slots_booked = docData.slots_booked || {};

    // Normalize time for comparison
    const normalizedSlotTime = slotTime.trim().toLowerCase();

    // Check slot availability
    if (Array.isArray(slots_booked[slotDate])) {
      const alreadyBooked = slots_booked[slotDate].some(
        t => t.trim().toLowerCase() === normalizedSlotTime
      );

      if (alreadyBooked) {
        return res.json({ success: false, message: "Slot not available" });
      }
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) return res.json({ success: false, message: "User not found" });

    // Remove slots_booked before saving doctor data in appointment
    const { slots_booked: _, ...doctorDataWithoutSlots } = docData.toObject();

    // Create appointment record
    const appointmentData = {
      userId,
      docId,
      userData,
      docData: doctorDataWithoutSlots,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    await new appointmentModel(appointmentData).save();

    // Update slots in DB
    await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true });

    res.json({ success: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



//API to get user appointments for frontend my-appointments page
const listAppointment = async (req,res) => {
  try {
    const {userId} = req.body
    const appointments = await appointmentModel.find({userId})

    res.json ({success:true,appointments})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// // API to cancel appointment
// const cancelAppointment = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;

//     // Find appointment
//     const appointment = await appointmentModel.findById(appointmentId);
//     if (!appointment) {
//       return res.json({ success: false, message: "Appointment not found" });
//     }

//     const { docId, slotDate, slotTime } = appointment;

//     // Fetch fresh doctor data
//     const doctor = await doctorModel.findById(docId);
//     if (!doctor) {
//       return res.json({ success: false, message: "Doctor not found" });
//     }

//     // Debug: log current slots
//     console.log("Before cancellation →", JSON.stringify(doctor.slots_booked, null, 2));

//     let slots_booked = doctor.slots_booked || {};
//     const normalizedSlotDate = slotDate.trim();
//     const normalizedSlotTime = slotTime.trim().toLowerCase();

//     // Remove slot if exists
//     if (Array.isArray(slots_booked[normalizedSlotDate])) {
//       slots_booked[normalizedSlotDate] = slots_booked[normalizedSlotDate].filter(
//         t => t.trim().toLowerCase() !== normalizedSlotTime
//       );

//       // Delete date key if no more slots booked that day
//       if (slots_booked[normalizedSlotDate].length === 0) {
//         delete slots_booked[normalizedSlotDate];
//       }
//     }

//     // Debug: log slots after removal
//     console.log("After cancellation →", JSON.stringify(slots_booked, null, 2));

//     // Save updated doctor data
//     await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true });

//     // Mark appointment as cancelled instead of deleting
//     appointment.cancelled = true;
//     await appointment.save();

//     res.json({ success: true, message: "Appointment cancelled & slot released" });

//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// }*//}

//API to cancel Appointment
const cancelAppointment = async (req,res) => {
  try {
    const {userId,appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    //verify appointment user 
    if (appointmentData.userId !== userId) {
      return res.json({success:false, message: 'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

    // Releasing doctor slot

    const {docId,slotDate,slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate]= slots_booked[slotDate].filter(e => e!== slotTime)
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true, message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
}


const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make make payment of Razorpay
 const paymentRazorpay = async (req, res) => {

  try {
    const {appointmentId} = req.body;
  const appointmentData = await appointmentModel.findById(appointmentId)

  if(!appointmentData || appointmentData.cancelled) {
    return res.json({success:false, message:"Appointment not found"})
  }

  //Creating options for Razorpay payments
  const options = {
    amount: appointmentData.amount * 100, // Amount in paise
    currency: process.env.CURRENCY,
    receipt: appointmentId,
  };

  //Creation of an order
  const order = await razorpayInstance.orders.create(options);
  res.json({success:true, order});

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
 }

 //API tp verify payment of razorpay
 const verifyRazorpay = async (req, res) => {
  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    console.log(orderInfo)
    if(orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
      return res.json({success:true, message:"Payment Successful"})
    }
    else{
      return res.json({success:false, message:"Payment Failed"})
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
 }





export {registerUser,loginUser,getProfile,updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}
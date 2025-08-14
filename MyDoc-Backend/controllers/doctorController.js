import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select(["-password", "-email"])
      .lean();
    const appointments = await appointmentModel.find({});
    const slotsMap = {};
    appointments.forEach((app) => {
      const docId = app.docId.toString();
      if (!slotsMap[docId]) slotsMap[docId] = {};
      if (!slotsMap[docId][app.slotDate]) slotsMap[docId][app.slotDate] = [];
      slotsMap[docId][app.slotDate].push(app.slotTime);
    });

    // Attach slots_booked dynamically to each doctor object
    const doctorsWithSlots = doctors.map((doc) => ({
      ...doc,
      slots_booked: slotsMap[doc._id.toString()] || {},
    }));
    res.json({ success: true, doctors: doctorsWithSlots });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctror login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor };

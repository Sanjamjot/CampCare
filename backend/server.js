import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/appointments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  issue: String,
  problemType: String, // Added problem type
  doctor: String, // Selected doctor (if any)
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Doctor-Department Mapping
const doctors = [
  { name: "Dr. Mahesh Kumar Sharma", departments: ["Fever & Cough", "Respiratory"] },
  { name: "Dr. Ritu Bassi", departments: ["Women Health", "Skin"] },
  { name: "Dr. Jeevan Jot Singh", departments: ["Orthopedic", "Fever & Cough"] },
  { name: "Dr. Gaganpreet Singh", departments: ["Skin", "Respiratory"] },
  { name: "Dr. Simran Sharma", departments: ["Women Health", "Orthopedic"] },
];

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "doctorsaab220804@gmail.com",
    pass: "iiki afku eiwu xdph", // Use your Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Route to handle appointment booking
app.post("/book-appointment", async (req, res) => {
  const { name, email, date, time, issue, problemType } = req.body; // Include problemType in request body

  try {
    // Find matching doctor(s)
    const matchedDoctors = doctors.filter((doctor) =>
      doctor.departments.includes(problemType)
    );
    const doctorNames = matchedDoctors.map((doctor) => doctor.name).join(", ");

    // Save appointment to MongoDB
    const newAppointment = new Appointment({
      name,
      email,
      date,
      time,
      issue,
      problemType,
      doctor: doctorNames,
    });
    await newAppointment.save();

    // Send email notification
    const mailOptions = {
      from: "doctorsaab220804@gmail.com",
      to: `${email}, bindrasanjamjot@gmail.com`,
      subject: "New Appointment Request",
      text: `Appointment Details:
      Name: ${name}
      Email: ${email}
      Date: ${date}
      Time: ${time}
      Issue: ${issue}
      Problem Type: ${problemType}
      Assigned Doctor(s): ${doctorNames}`,
    };
    await transporter.sendMail(mailOptions);
 

  
    res.status(200).json({
      message: "Appointment booked successfully!",
      assignedDoctors: doctorNames,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Error booking appointment. Please try again." });
  }
});

// Route to fetch all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments." });
  }
});

// Route to delete an appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Error deleting appointment." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

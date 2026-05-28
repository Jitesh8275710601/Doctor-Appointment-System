import Appointment from "../models/Appointment.js";

export const bookAppointment = async (req, res) => {
  const appointment = await Appointment.create(req.body);

  res.status(201).json(appointment);
};

export const getAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("user")
    .populate("doctor");

  res.json(appointments);
};
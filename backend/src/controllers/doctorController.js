import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();

  res.json(doctors);
};

export const createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);

  res.status(201).json(doctor);
};
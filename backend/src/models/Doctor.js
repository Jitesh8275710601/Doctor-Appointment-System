import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    name: String,
    specialization: String,
    experience: String,
    fees: Number,
    image: String
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
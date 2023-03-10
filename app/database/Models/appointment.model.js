const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeslot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);
const appointmentModel = mongoose.model("appointment", appointmentSchema);
module.exports = appointmentModel;

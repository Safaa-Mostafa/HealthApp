const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    day: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    slot: [
      {
        start: { type: Number, min: 0, max: 23 },
        end: { type: Number, min: 0, max: 23 },
        numberofBookings: Number,
      },
    ],
  },
  { timestamps: true }
);

const slot = mongoose.model("slot", slotSchema);
module.exports = slot;

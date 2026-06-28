import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    venue: {type: String, required: true},
    date: {type: Date, required: true},
    capacity: {type: Number, required: true},
    ticketsSold: {type: Number, default: 0},
  },
  { timestamps: true }
);

export default mongoose.model("Event",eventSchema)
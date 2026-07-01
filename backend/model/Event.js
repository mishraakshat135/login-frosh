import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String},
    venue: {type: String, required: true},
    date: {type: Date, required: true},
    time:{type: String, required:true},
    capacity: {type: Number},
    ticketsSold: {type: Number, default: 0},
    banner:{type: String, default: ""}
  },
  { timestamps: true }
);

export default mongoose.model("Event",eventSchema)
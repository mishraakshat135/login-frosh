import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    eventId: {type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
    ticketId: {type: String, unique: true, required: true},
    checkedIn: {type: Boolean, default: false},
  },
  { timestamps: true }
)

export default mongoose.model("Ticket", ticketSchema)
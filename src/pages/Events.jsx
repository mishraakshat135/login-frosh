import { useEffect, useState } from "react";
import axios from "axios"
import api from "../services/api.js"

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const bookTicket = async(eventId)=>{
    try{
        const user = JSON.parse(localStorage.getItem("user"))
        const res = await api.post("/api/tickets/book", {userId: user._id, eventId})
        alert("Ticket booked")
    }
    catch(error)
    {
        alert(error.response.data.message)
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events")

      setEvents(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" p-10">
      <h1 className="text-3xl font-bold mb-6">
        Events
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {events.map((event) => (
          <div key={event._id} className="border rounded-xl p-5 shadow">
            <h2 className="text-xl font-bold">
              {event.title}
            </h2>
            <p>{event.description}</p>
            <p>{event.venue}</p>
            <button onClick={() => bookTicket(event._id)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Book Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
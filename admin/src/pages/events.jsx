import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Events() {

    const [events, setEvents] = useState([])
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events')
            setEvents(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchEvents();
    }, [])

    const deleteEvent = async (id) => {
        const confirmDelete = window.confirm(
            "Do u want to delete this event?"
        )
        if (!confirmDelete)
            return

        try {
            await api.delete(`/events/${id}`)
            fetchEvents()

        }
        catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="md:p-8">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">

                    Events Management

                </h1>

                <button
                    onClick={() => navigate("/events/add")}
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >

                    Add Event

                </button>

            </div>

            <input
                type="text"
                placeholder="Search Event"
                className="border p-2 w-80 rounded mb-6"
            />

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="p-3">Event</th>

                        <th>Date</th>

                        <th>Venue</th>

                        <th >Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        events.map((event) => {

                            return (

                                <tr key={event._id} className="text-center border-b">

                                    <td className="p-4">

                                        {event.title}

                                    </td>

                                    <td>

                                        {new Date(event.date).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                           
                                        })} {event.time}

                                    </td>

                                    <td>

                                        {event.venue}

                                    </td>

                                    <td>

                                        <button

                                            onClick={() => navigate(`/events/edit/${event._id}`)}

                                            className="bg-yellow-500 px-2 py-0.5 m-1.5  md:px-3 md:py-1 rounded mr-2">

                                            Edit

                                        </button>

                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            className="bg-red-600 text-white px-1.5 py-0.5 m-1.5 md:px-3 md:py-1 rounded">

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            )

                        })

                    }

                </tbody>

            </table>

        </div>

    )

}

export default Events;
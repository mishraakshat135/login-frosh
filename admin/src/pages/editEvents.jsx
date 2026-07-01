import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function EditEvent() {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    fetchEvent();
}, []);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
        category: "",
        banner: "",
        capacity: ""
    });

    const fetchEvent = async () => {
        try {
            const res = await api.get(`/events/${id}`)
            const event = res.data

            setFormData({
                title: event.title,
                description: event.description,
                venue: event.venue,
                date: event.date.split("T")[0],
                time: event.time,
                category: event.category,
                banner: event.banner,
                capacity: event.capacity
            })

        }
        catch (error) {
            console.log(error);
            alert("Unable to fetch event")

        }
    }

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/events/${id}`, formData)
            alert("Event Updated Successfully")
            navigate("/events")
        }
        catch (error) {
            console.log(error)
            alert("update unsuccessful")
        }
    }
   

    return (

        <div className="flex flex-col justify-center items-center p-7 md:p-8">

            <h1 className="text-2xl md:text-3xl font-bold mb-8">

                Edit Event {formData.title}

            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80 md:w-96"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Event Name"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="banner"
                    placeholder="Banner URL"
                    value={formData.banner}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded"
                >
                    Update Event
                </button>

            </form>

        </div>

    )

}

export default EditEvent;
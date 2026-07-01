import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddEvent() {

    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/events", formData);

            alert("Event Created Successfully");

            navigate("/events");

        } catch (error) {

            console.log(error.response?.data);

            alert(error.response?.data?.message || "Error Creating Event");

        }

    };

    return (

        <div className="py-10 flex flex-col justify-center items-center  md:p-8">

            <h1 className="text-3xl font-bold mb-8">
                Add Event
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80 md:w-96"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Event Name"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="time"
                    placeholder="Time (6:00 PM)"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="banner"
                    placeholder="Banner URL"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <button
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Create Event
                </button>

            </form>

        </div>

    );

}

export default AddEvent;
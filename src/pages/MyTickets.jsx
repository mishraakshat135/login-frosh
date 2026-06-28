import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import api from "../services/api.js"

export default function MyTickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await api.get(`/api/tickets/user/${user._id}`);
            setTickets(res.data.tickets);
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-8">
                My Tickets
            </h1>

            {tickets.map((ticket) => (
                <div key={ticket._id} className="border rounded-xl p-6 mb-6 shadow">
                    <h2 className="text-2xl font-bold">
                        {ticket.eventId.title}
                    </h2>

                    <p>
                        {ticket.eventId.description}
                    </p>

                    <p className="mt-2">
                        Venue:{" "}
                        {ticket.eventId.venue}
                    </p>

                    <p className="mt-2 font-semibold">
                        Ticket ID:{" "}
                        {ticket.ticketId}
                    </p>

                    <div className="mt-5 flex justify-center">
                        <QRCodeCanvas value={ticket.ticketId} size={220}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../services/api";

function ScannerPage() {

    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [paused, setPaused] = useState(false);

    const verifyTicket = async (ticketId) => {

        if (paused || loading) return;

        setLoading(true);

        try {

            const res = await api.post("/tickets/verify", {
                ticketId
            });

            setTicket(res.data.ticket);
            setMessage(res.data.message);
            setStatus("success");
            setPaused(true);

        }

        catch (error) {

            setTicket(null);

            setStatus("error");

            if (error.response) {

                setMessage(error.response.data.message);

            } else {

                setMessage("Server Error");

            }

        }

        setLoading(false);

    };

    const allowEntry = async () => {

        try {

            await api.post("/tickets/checkin", {
                ticketId: ticket.ticketId
            });

            alert("Entry Allowed");

            resetScanner();

        }

        catch (error) {

            alert(error.response.data.message);

        }

    };

    const resetScanner = () => {

        setTicket(null);
        setMessage("");
        setStatus("");
        setPaused(false);

    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">

                Event QR Scanner

            </h1>

            <div className="flex flex-col md:flex-row  gap-8">

                {/* Scanner */}

                <div className="bg-white rounded-lg shadow p-5">

                    <Scanner

                        constraints={{
                            facingMode: "environment"
                        }}

                        onScan={(result) => {

                            if (!result || paused) return;

                            verifyTicket(result[0].rawValue);

                        }}

                        onError={(error) => {

                            console.log(error);

                        }}

                    />

                </div>

                {/* Details */}

                <div className="bg-white rounded-lg shadow p-6">

                    <h2 className="text-2xl font-bold mb-5">

                        Ticket Information

                    </h2>

                    {

                        message && (

                            <div
                                className={`mb-5 p-3 rounded font-semibold ${
                                    status === "success"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >

                                {message}

                            </div>

                        )

                    }

                    {

                        ticket ? (

                            <>

                                <p><strong>Name:</strong> {ticket.userId.name}</p>

                                <p><strong>Email:</strong> {ticket.userId.email}</p>

                                <p><strong>Event:</strong> {ticket.eventId.title}</p>

                                <p><strong>Venue:</strong> {ticket.eventId.venue}</p>

                                <p><strong>Date:</strong> {new Date(ticket.eventId.date).toLocaleDateString()}</p>

                                <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>

                                <p className="mt-3">

                                    <strong>Status:</strong>

                                    <span className="ml-2 text-green-600">

                                        VALID

                                    </span>

                                </p>

                                <div className="flex gap-4 mt-8">

                                    <button

                                        onClick={allowEntry}

                                        className="bg-green-600 text-white px-6 py-3 rounded"

                                    >

                                        Allow Entry

                                    </button>

                                    <button

                                        onClick={resetScanner}

                                        className="bg-gray-600 text-white px-6 py-3 rounded"

                                    >

                                        Scan Next

                                    </button>

                                </div>

                            </>

                        ) : (

                            <div className="text-gray-500 mt-8">

                                Waiting for QR Scan...

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default ScannerPage;
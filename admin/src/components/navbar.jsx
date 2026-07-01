import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

            <Link
                to="/"
                className="text-2xl font-bold"
            >
                FROSH ADMIN
            </Link>

            <div className=" flex gap-8">

               

                <Link to="/events">Events</Link>
                <Link to="/events/add">Add Events</Link>
                <Link to="/scanner">Scanner</Link>

            </div>

        </nav>

    );

}

export default Navbar;
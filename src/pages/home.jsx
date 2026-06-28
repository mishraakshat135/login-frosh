import { Link } from "react-router-dom";

export default function Home() {

  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user.username}
      </h1>
      <div className="flex gap-4 mt-6">
        <Link to="/events" className="bg-blue-600 text-white px-4 py-2 rounded">
          View Events
        </Link>
        <Link to="/mytickets" className="bg-red-600 text-white px-4 py-2 rounded">
          My Tickets
        </Link>
      </div>
    </div>
  );
}
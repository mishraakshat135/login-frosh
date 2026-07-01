// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Sidebar() {

//     const [open, setOpen] = useState(true);

//     return (

//         <div
//             className={`bg-gray-900 text-white h-screen transition-all duration-300
//             ${open ? "w-64" : "w-20"}`}
//         >

//             {/* Header */}

//             <div className="flex items-center justify-between p-5 border-b border-gray-700">

//                 {open && (
//                     <h1 className="text-xl font-bold">
//                         FROSH ADMIN
//                     </h1>
//                 )}

//                 <button
//                     onClick={() => setOpen(!open)}
//                     className="text-2xl"
//                 >
//                     ☰
//                 </button>

//             </div>

//             {/* Menu */}

//             <div className="flex flex-col mt-5">

//                 <Link
//                     to="/"
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700"
//                 >
//                     <span>🏠</span>
//                     {open && <span>Dashboard</span>}
//                 </Link>

//                 <Link
//                     to="/events"
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700"
//                 >
//                     <span>🎫</span>
//                     {open && <span>Events</span>}
//                 </Link>

//                 <Link
//                     to="/scanner"
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700"
//                 >
//                     <span>📷</span>
//                     {open && <span>Scanner</span>}
//                 </Link>

//                 <Link
//                     to="/students"
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700"
//                 >
//                     <span>👥</span>
//                     {open && <span>Students</span>}
//                 </Link>

//                 <Link
//                     to="/analytics"
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-gray-700"
//                 >
//                     <span>📊</span>
//                     {open && <span>Analytics</span>}
//                 </Link>

//             </div>

//             {/* Bottom */}

//             <div className="absolute bottom-0 w-full">

//                 <button
//                     className="flex items-center gap-4 px-5 py-4 hover:bg-red-700 w-full"
//                 >
//                     <span>🚪</span>

//                     {open && <span>Logout</span>}

//                 </button>

//             </div>

//         </div>

//     );

// }

// export default Sidebar;
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";


function AdminLayout() {

    return (

        <>

            <Navbar />

            <div className="p-6">

                <Outlet />

            </div>

        </>

    );

}

export default AdminLayout;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Events from "./pages/events";
import AddEvent from "./pages/addEvents";
import EditEvent from "./pages/editEvents";
import Scanner from "./pages/scanner";


import AdminLayout from "./layouts/AdminLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

            

                <Route element={<AdminLayout />}>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/events" element={<Events />} />

                    <Route path="/events/add" element={<AddEvent />} />

                    <Route path="/events/edit/:id" element={<EditEvent />} />

                    <Route path="/scanner" element={<Scanner />} />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;
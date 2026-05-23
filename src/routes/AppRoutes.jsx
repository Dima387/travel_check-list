import {Routes,Route} from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import Map from "../pages/Map"
import Wishlist from "../pages/Wishlist"
import Profile from "../pages/Profile"
import Checklist from "../pages/Checklist"
import Statistics from "../pages/Statistic"
import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"

export default function AppRoutes(){

return(
    <Routes>

        <Route path="/" element={<Home/>}/>

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

        <Route path="/map" element={<Map/>}/>

        <Route path="/wishlist" element={<Wishlist/>}/>

        <Route path="/profile" element={<Profile/>}/>

        <Route path="/checklists" element={<Checklist/>}/>

        <Route path="/statistics" element={<Statistics/>}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/register" element={<Register/>}/>

        <Route path="*" element={<NotFound/>} />

    </Routes>
)
}
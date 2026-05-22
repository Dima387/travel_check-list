import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header(){

return(

    <header className="bg-slate-950 h-16 flex justify-between items-center px-8">
        <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="TravelMap Logo" className="h-14 w-auto object-contain" />
        </Link>
        <input placeholder="Search" className="bg-slate-800 rounded-lg px-4 py-2"/>
    </header>

)

}
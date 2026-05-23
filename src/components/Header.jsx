import { Link } from "react-router-dom"
import logo from "../../public/img/logo.png"

export default function Header(){

return(

    <header className="bg-slate-950 h-16 flex justify-between items-center px-8">
        <Link to="/" className="flex items-center">
            <img src={logo} alt="TravelMap" className="w-10 h-10 object-contain"/>
            <span className="text-2xl font-bold text-cyan-400">TravelMap</span>
        </Link>
        <input placeholder="Search" className=" bg-slate-800 rounded-lg px-4 py-2"/>
    </header>

)

}
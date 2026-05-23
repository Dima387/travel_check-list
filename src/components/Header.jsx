import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import {useNavigate} from "react-router-dom"

export default function Header(){

    const {logout}=useAuth()
    const nav=useNavigate()

    const handleLogout=()=>{
        logout()
        nav("/")
    }

    return(

        <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800 shadow-[0_1px_30px_-20px_rgba(0,0,0,0.8)] h-20 flex items-center px-8">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/img/logo.png" alt="TravelMap logo" className="w-11 h-11 object-contain rounded-full border border-cyan-500/40 bg-slate-900 p-1"/>
                    <div>
                        <p className="text-cyan-400 text-lg font-bold">TravelMap</p>
                        <p className="text-slate-400 text-sm">Your travel dashboard</p>
                    </div>
                </Link>
            </div>

            <div className="flex-1 mx-10">
                <div className="relative max-w-xl mx-auto">
                    <img src="/img/search.png" alt="search icon" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70" />
                    <input
                        type="search"
                        placeholder="Search places..."
                        className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-12 py-3 text-slate-100 outline-none ring-1 ring-slate-900 focus:ring-cyan-500/40"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 border border-slate-800 shadow-sm">
                    <img src="/img/notification.png" alt="Notifications" className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400"></span>
                </button>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-900/80 border border-slate-800 px-4 py-2">
                    <img src="/img/user.png" alt="User avatar" className="h-11 w-11 rounded-full bg-slate-800 p-1" />
                    <div className="text-right">
                        <p className="text-sm text-slate-400">Good evening</p>
                        <p className="text-white font-semibold">Traveler</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-2xl border border-cyan-500/40 bg-slate-900/90 px-4 py-2 text-sm text-cyan-300 hover:bg-slate-800"
                >
                    <img src="/img/exit.png" alt="Logout" className="inline h-4 w-4 align-text-bottom mr-2" />
                    Logout
                </button>
            </div>
        </header>

    )

}
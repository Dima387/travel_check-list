import {NavLink} from "react-router-dom"
import useAuth from "../hooks/UseAuth"
import {useNavigate} from "react-router-dom"

export default function Sidebar() {

    const {logout}=useAuth()
    const nav=useNavigate()

    const menu=[
        { title: "Dashboard", path: "/dashboard", icon: "/img/home.png" },
        { title: "Map", path: "/map", icon: "/img/map.png" },
        { title: "Wishlist", path: "/wishlist", icon: "/img/favourite.png" },
        { title: "Checklist", path: "/checklists", icon: "/img/clipboard.png" },
        { title: "Statistics", path: "/statistics", icon: "/img/statistics.png" },
        { title: "Profile", path: "/profile", icon: "/img/user.png" }
    ]

    const handleLogout = () => {
        logout()
        nav("/")
    }

    return(

        <aside className="w-72 min-h-screen bg-[#03111f] border-r border-slate-800 text-slate-200 flex flex-col justify-between">
            <div>
                <div className="px-6 py-8">
                    <div className="rounded-3xl bg-slate-900/80 p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)]">
                        <p className="text-slate-400 uppercase tracking-[0.24em] text-xs mb-3">TravelMap</p>
                        <h2 className="text-2xl font-semibold text-white">Travel Dashboard</h2>
                    </div>
                </div>

                <nav className="px-4 space-y-2">
                    {menu.map(({title,path,icon})=>(
                        <NavLink
                            key={path}
                            to={path}
                            className={({isActive})=>
                                `flex items-center gap-4 rounded-3xl px-5 py-4 text-sm font-medium transition ${isActive ? "bg-cyan-500/15 text-cyan-300" : "text-slate-300 hover:bg-slate-800/70"}`
                            }
                        >
                            <img src={icon} alt={`${title} icon`} className="h-5 w-5 object-contain" />
                            <span>{title}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* <div className="px-6 pb-6 pt-4">
                <button
                    onClick={handleLogout}
                    className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 flex items-center gap-3 text-left text-slate-200 hover:bg-slate-800"
                >
                    <img src="/img/exit.png" alt="Logout icon" className="h-4 w-4" />
                    Logout
                </button>
            </div> */}
        </aside>

    )

}
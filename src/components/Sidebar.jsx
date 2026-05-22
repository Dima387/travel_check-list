import {NavLink} from "react-router-dom"

export default function Sidebar() {

const menu=[
["Dashboard","/dashboard"],
["Map","/map"],
["Wishlist","/wishlist"],
["Checklist","/checklists"],
["Statistics","/statistics"],
["Profile","/profile"]
]

return(

    <div className="w-64 bg-slate-950 min-h-screen p-5">
        {menu.map(([title,path])=>(
            <NavLink key={path} to={path} className={({isActive})=>`block p-4 rounded-xl ${isActive ? "bg-cyan-500" : ""}`}>
                {title}
            </NavLink>
        ))}
    </div>

)

}
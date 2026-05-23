import {useState} from "react"
import {useNavigate, Link} from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function Login(){

    const {login}=useAuth()

    const nav=useNavigate()

    const[email, setEmail]=useState("")

    const[password, setPassword]=useState("")

    const submit=(e)=>{
        e.preventDefault()
        const user=JSON.parse(
            localStorage.getItem("registeredUser")
        )
        if (!user) {
            alert("Спочатку зареєструйся")
            return
        }
        if(email===user.email && password===user.password){
            login(user)
            nav("/dashboard")
        } else {
            alert("Невірний email або пароль")
        }
    }

    return(

        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <form onSubmit={submit} className="w-[400px] bg-slate-900 p-10 rounded-2xl space-y-5">
                <h1 className="text-3xl text-white text-center">Login</h1>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl bg-slate-800 text-white"/>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full p-3 rounded-xl bg-slate-800 text-white"/>
                <button type="submit" className="w-full bg-cyan-500 p-3 rounded-xl">Login</button>
                <p className="text-center text-sm text-slate-400 mt-3">No account? <Link to="/register" className="text-cyan-400 hover:underline">Register</Link></p>
            </form>
        </div>

    )

}
import MainLayout from "../layouts/MainLayout"
import useWishlist from "../hooks/useWishlist"
import {useState} from "react"

export default function Wishlist(){

    const{wishlist, setWishlist}=useWishlist()
    const[country, setCountry]=useState("")

    const addPlace=(e)=>{
        e.preventDefault()
        if(!country)return
        const newPlace={id:Date.now(), country, status:"wishlist"}
        setWishlist([...wishlist, newPlace])
        setCountry("")
    }

    const removePlace=(id)=>{
        setWishlist(wishlist.filter((place)=>place.id!==id))
    }

    const toggleVisited=(id)=>{
        setWishlist(wishlist.map((place)=>
            place.id===id
                ? {...place, status: place.status === "visited" ? "wishlist" : "visited"}
                : place
        ))
    }

    return(

        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-white mb-2">Wishlist</h1>
                        <p className="text-slate-400 max-w-2xl">Keep track of the countries you want to visit and mark them as visited once your trip is complete.</p>
                    </div>

                    <form onSubmit={addPlace} className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
                        <input
                            placeholder="Country"
                            value={country}
                            onChange={(e)=>setCountry(e.target.value)}
                            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                        <button className="h-12 rounded-2xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                            Add
                        </button>
                    </form>
                </div>

                {wishlist.length===0 ? (
                    <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-12 text-center text-slate-400 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
                        <p className="text-xl font-medium text-slate-100 mb-2">No destinations added yet</p>
                        <p>Use the field above to add a country to your wishlist.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {wishlist.map((place)=>(
                            <div key={place.id} className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white">{place.country}</h2>
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] ${place.status === "visited" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>
                                            {place.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={()=>toggleVisited(place.id)}
                                            className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-500/10 px-4 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                                        >
                                            {place.status === "visited" ? "Mark unvisited" : "Mark visited"}
                                        </button>
                                        <button
                                            onClick={()=>removePlace(place.id)}
                                            className="inline-flex h-11 items-center justify-center rounded-2xl bg-red-500/10 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
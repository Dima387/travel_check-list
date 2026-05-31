import MainLayout from "../layouts/MainLayout"
import useWishlist from "../hooks/useWishlist"
import {useState} from "react"
import 'flag-icons/css/flag-icons.min.css'
import { COUNTRIES } from "../data/wishlistData"

export default function Wishlist(){

    const{wishlist, setWishlist}=useWishlist()
    const[country, setCountry]=useState("")
    const[showDropdown, setShowDropdown]=useState(false)
    const[openEmojiPicker, setOpenEmojiPicker]=useState(null)

    const EMOJI_OPTIONS = [
        "😊", "😎", "😍", "🥳", "🌍", "🌎", "🌏", "✈️", "🛫", "🛬", "🛳️", "⛴️", "🚢", "🚆", "🚄", "🚀", "🏖️", "🏝️", "🏞️", "🏜️", "🏔️", "🌋", "🏕️", "🗺️", "🧭", "🦜", "🦢", "🐬", "🐠", "🍹", "🍜", "☕", "🛶", "🏨", "🧳", "🎒", "📸", "🎟️", "🪂", "🛰️", "🧘", "🧗", "🧩", "🎶", "🍃", "🌿", "🌅", "🌌", "🧿", "💫", "✨", "🌠", "🏜", "🏰", "🌉", "🕌", "🗽", "⛱️", "🏝"
    ]

    const filteredCountries = country.trim() 
        ? COUNTRIES.filter(c => c.name.toLowerCase().includes(country.toLowerCase()))
        : COUNTRIES

    const toggleEmojiForPlace = (placeId, emoji) => {
        setWishlist(wishlist.map((place) => {
            if(place.id !== placeId) return place
            const current = place.emojis || []
            const has = current.includes(emoji)
            const next = has ? current.filter((item) => item !== emoji) : current.length < 5 ? [...current, emoji] : current
            return {...place, emojis: next}
        }))
    }

    const selectEmojiPanel = (placeId) => {
        setOpenEmojiPicker(openEmojiPicker === placeId ? null : placeId)
    }

    const addPlace=(e)=>{
        e.preventDefault()
        if(!country)return
        const countryObj = COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase())
        if(!countryObj)return
        const newPlace={id:Date.now(), country: countryObj.name, code: countryObj.code, status:"wishlist", emojis: []}
        setWishlist([...wishlist, newPlace])
        setCountry("")
        setShowDropdown(false)
    }
    
    const selectCountry=(countryName)=>{
        setCountry(countryName)
        setShowDropdown(false)
    }

    const FEELING_IMAGES = [
        { label: "Golden sunrise", src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" },
        { label: "Coastal calm", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
        { label: "City lights", src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80" },
        { label: "Mountain awakening", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
        { label: "Quiet wander", src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80" }
    ]

    const getFeelingImage = (countryName) => {
        if(!countryName) return FEELING_IMAGES[0]
        const index = countryName.split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % FEELING_IMAGES.length
        return FEELING_IMAGES[index]
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
                        <h1 className="text-4xl font-semibold text-white mb-2">Travel Wishlist</h1>
                        <p className="text-slate-400 max-w-2xl">Collect the countries that make your heart race, then celebrate each one as you turn dreams into memories.</p>
                    </div>

                    <form onSubmit={addPlace} className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                value={country}
                                onChange={(e)=>{setCountry(e.target.value); setShowDropdown(true)}}
                                onFocus={()=>setShowDropdown(true)}
                                onBlur={()=>setTimeout(()=>setShowDropdown(false), 150)}
                                placeholder="Search countries..."
                                className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                            />
                            {showDropdown && filteredCountries.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-lg z-50">
                                    {filteredCountries.map((c) => (
                                        <button
                                            key={c.name}
                                            type="button"
                                            onClick={()=>selectCountry(c.name)}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-800 transition text-slate-100 flex items-center gap-2"
                                        >
                                            <span className={`fi fi-${c.code} inline-block w-5 h-4`}></span>
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="h-12 rounded-2xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                            Add dream
                        </button>
                    </form>
                </div>

                {wishlist.length===0 ? (
                    <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-12 text-center text-slate-400 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]">
                        <p className="text-xl font-medium text-slate-100 mb-2">Your travel story starts here</p>
                        <p>Type a country above to add it to your wishlist and let your wanderlust grow.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {wishlist.map((place) => {
                            const image = getFeelingImage(place.country)
                            return (
                                <div key={place.id} className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.label}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
                                        <div className="absolute left-4 top-4 inline-flex rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 shadow-sm">
                                            {image.label}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`fi fi-${place.code || COUNTRIES.find(c => c.name === place.country)?.code || "xx"} inline-block w-6 h-4`}></span>
                                                    <h2 className="text-2xl font-semibold text-white">{place.country}</h2>
                                                    <div className="relative inline-flex">
                                                        {openEmojiPicker === place.id ? (
                                                            <div className="z-50 inline-flex max-w-[460px] items-center gap-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-3 py-2 shadow-xl">
                                                                <div className="flex gap-2 overflow-x-auto px-1 py-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                                                                    {EMOJI_OPTIONS.map((emoji) => (
                                                                        <button
                                                                            key={emoji}
                                                                            type="button"
                                                                            onClick={()=>toggleEmojiForPlace(place.id, emoji)}
                                                                            className={`min-w-[46px] rounded-full border px-3 py-2 text-lg transition ${place.emojis?.includes(emoji) ? "border-cyan-400 bg-cyan-500/10 text-cyan-200" : "border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-600 hover:bg-slate-800"}`}
                                                                        >
                                                                            {emoji}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={()=>selectEmojiPanel(place.id)}
                                                                    className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-3 text-sm text-slate-200 transition hover:border-cyan-500 hover:text-cyan-300"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={()=>selectEmojiPanel(place.id)}
                                                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-lg text-slate-200 transition hover:border-cyan-500 hover:text-cyan-300"
                                                            >
                                                                😊
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                {place.emojis?.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {place.emojis.map((emoji, index) => (
                                                            <span key={index} className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-100">
                                                                {emoji}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] mt-2 ${place.status === "visited" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>
                                                    {place.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    onClick={()=>toggleVisited(place.id)}
                                                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-500/10 px-4 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                                                >
                                                    {place.status === "visited" ? "Keep dreaming" : "Mark as visited"}
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
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
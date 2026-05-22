export default function Header(){

return(

    <header className="h-16 bg-slate-900 flex items-center justify-between px-10">
        <div>TravelMap</div>
        <nav className="flex gap-6">
            <a href="/">Home</a>
            <a href="/map">Map</a>
        </nav>
    </header>

)

}
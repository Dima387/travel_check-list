import UseMapEvents from "react-leaflet/hooks/useMapEvents"
import useState from "react-usestateref"

export default function MapClickHandler({onClick}) {
    const [locations, setLocations] = useState([])
    useMapEvents({
        click(e) {
            const newLocation = {
                id: Date.now(),
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                status: "visited",
            }
            setLocations((prev) => [...prev, newLocation])
            onClick(e.latlng)
        },
    })
    
    return null
}
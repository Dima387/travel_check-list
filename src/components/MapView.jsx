import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"

export default function MapView() {
    return (
        <MapContainer center={[50, 30]} zoom={4} className="h-[600px] w-full rounded-xl">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
    )
}
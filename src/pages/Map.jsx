import MainLayout from "../layouts/MainLayout"
import MapView from "../components/MapView"

export default function Map(){

return(

    <MainLayout>
        <h1 className="text-4xl mb-8">Travel Map</h1>
       <MapView />
    </MainLayout>

)

}
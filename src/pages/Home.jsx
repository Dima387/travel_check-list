import { Navigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

export default function Home(){

    const registeredUser = localStorage.getItem("registeredUser")

    if (!registeredUser) {
        return <Navigate to="/register" replace />
    }

    return(

        <MainLayout>
            <h1>TravelMap</h1>
        </MainLayout>

    )

}
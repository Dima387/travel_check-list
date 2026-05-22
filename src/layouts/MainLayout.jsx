import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function MainLayout({children}){

return(

    <div>
        <Header/>
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    </div>
)

}
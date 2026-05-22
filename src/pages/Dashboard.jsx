import MainLayout from "../layouts/MainLayout"
import PageTitle from "../components/PageTitle"

export default function Dashboard(){

return(

    <MainLayout>
        <PageTitle title="Dashboard"/>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-xl h-40"/>
                <div className="bg-slate-800 rounded-xl h-40"/>
                <div className="bg-slate-800 rounded-xl h-40"/>
            </div>
    </MainLayout>

)

}
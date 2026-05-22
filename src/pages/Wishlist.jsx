import MainLayout from "../layouts/MainLayout"

export default function Wishlist(){

return(

    <MainLayout>
        <h1 className="text-4xl mb-6">Wishlist</h1>
        <div className="grid grid-cols-2 gap-5">
            <div className="bg-slate-900 h-48 rounded-xl"/>
            <div className="bg-slate-900 h-48 rounded-xl"/>
        </div>
    </MainLayout>

)
}
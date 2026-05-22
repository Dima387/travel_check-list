import MainLayout from "../layouts/MainLayout"

export default function Profile(){

return(

<MainLayout>

<div
className="
flex
gap-8
"
>

<div
className="
w-40
h-40
bg-slate-700
rounded-full
"/>

<div>

<h1>
Username
</h1>

<p>
user@email.com
</p>

</div>

</div>

</MainLayout>

)

}
import {useState, useEffect} from "react"
import MainLayout from "../layouts/MainLayout"

export default function Checklist(){

    const [checklists, setChecklists] = useState(() => {
        const saved = localStorage.getItem("checklists")
        return saved ? JSON.parse(saved) : []
    })
    const [itemTexts, setItemTexts] = useState({})

    useEffect(() => {
        localStorage.setItem("checklists", JSON.stringify(checklists))
    }, [checklists])

    const addChecklist = () => {
        const newChecklist = { id: Date.now(), title: "New Trip", items: [] }
        setChecklists([...checklists, newChecklist])
    }

    const handleItemTextChange = (listId, value) => {
        setItemTexts((prev) => ({ ...prev, [listId]: value }))
    }

    const addItem = (listId) => {
        const text = itemTexts[listId]?.trim()
        if (!text) return

        setChecklists(checklists.map((list) => {
            if (list.id === listId) {
                return {
                    ...list,
                    items: [...list.items, { id: Date.now(), text, completed: false }]
                }
            }
            return list
        }))

        setItemTexts((prev) => ({ ...prev, [listId]: "" }))
    }

    const toggleCompleted = (listId, itemId) => {
        setChecklists(checklists.map((list) => {
            if (list.id !== listId) return list
            return {
                ...list,
                items: list.items.map((item) =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                )
            }
        }))
    }

    const removeItem = (listId, itemId) => {
        setChecklists(checklists.map((list) => {
            if (list.id !== listId) return list
            return {
                ...list,
                items: list.items.filter((item) => item.id !== itemId)
            }
        }))
    }

    return(
        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold text-white">Checklists</h1>
                        <p className="mt-2 max-w-2xl text-slate-400">Create travel checklists, add items for each trip, and keep your preparation organized.</p>
                    </div>
                    <button
                        onClick={addChecklist}
                        className="inline-flex h-12 items-center justify-center rounded-2xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        New Checklist
                    </button>
                </div>

                {checklists.length === 0 ? (
                    <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-10 text-center text-slate-400 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
                        <p className="text-xl font-medium text-slate-100 mb-2">No checklists yet</p>
                        <p>Click the button above to start your first travel checklist.</p>
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {checklists.map((list)=>(
                            <div key={list.id} className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white">{list.title}</h2>
                                        <p className="mt-1 text-sm text-slate-400">{list.items.length} item{list.items.length === 1 ? "" : "s"}</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <input
                                            value={itemTexts[list.id] || ""}
                                            onChange={(e)=>handleItemTextChange(list.id, e.target.value)}
                                            placeholder="Add item"
                                            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                                        />
                                        <button
                                            onClick={()=>addItem(list.id)}
                                            className="inline-flex h-12 items-center justify-center rounded-2xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3">
                                    {list.items.length === 0 ? (
                                        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 text-slate-500">
                                            No items yet. Start adding essentials for this trip.
                                        </div>
                                    ) : (
                                        list.items.map((item)=>(
                                            <div key={item.id} className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 p-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className={`inline-flex h-3.5 w-3.5 rounded-full ${item.completed ? "bg-emerald-400" : "bg-slate-500"}`} />
                                                    <p className={`text-sm ${item.completed ? "text-slate-500 line-through" : "text-slate-100"}`}>{item.text}</p>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        onClick={()=>toggleCompleted(list.id, item.id)}
                                                        className="inline-flex h-11 items-center justify-center rounded-2xl bg-cyan-500/10 px-4 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                                                    >
                                                        {item.completed ? "Mark uncompleted" : "Mark completed"}
                                                    </button>
                                                    <button
                                                        onClick={()=>removeItem(list.id, item.id)}
                                                        className="inline-flex h-11 items-center justify-center rounded-2xl bg-red-500/10 px-4 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    )

}
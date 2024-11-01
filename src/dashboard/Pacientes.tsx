
import { Outlet } from "react-router-dom"


export default function Pacientes() {

    return (
        <main className="min-h-full relative">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
        </main>
    )
}
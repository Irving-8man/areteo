import { isRutaActiva } from "@/utils/IdentificarRutas";
import { Link, Outlet, useLocation } from "react-router-dom";


export default function Analiticas() {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <main className="min-h-full relative">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <ul className="flex flex-row gap-12 items-center justify-start">
                    <li>
                        <Link to="/dashboard/analiticas" className={`${isRutaActiva(pathName, "/dashboard/analiticas") ? 'font-medium underline' : 'text-black'
                            }`}>Analíticas de Instrumento</Link>
                    </li>
                </ul>
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
        </main>
    )
}


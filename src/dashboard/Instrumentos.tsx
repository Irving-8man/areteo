import { isRutaActiva, isRutaExacta } from "@/utils/IdentificarRutas";
import { Link, Outlet, useLocation } from "react-router-dom"

export default function Instrumentos() {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <main className="min-h-full relative">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <ul className="flex flex-row gap-12 items-center justify-start">
                    <li>
                        <Link to="/dashboard/instrumentos" className={`${isRutaExacta(pathName, "/dashboard/instrumentos") ? 'font-medium' : 'text-black'
                            }`}>Lista de Instrumentos</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/instrumentos/instrumentoFijo" className={`${isRutaActiva(pathName, "/dashboard/instrumentos/instrumentoFijo") ? 'font-medium' : 'text-black'
                            }`}>ACIC</Link>
                    </li>
                </ul>
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
        </main>
    )
}
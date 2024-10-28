import { isRutaExacta } from "@/utils/IdentificarRutas";
import { Link, Outlet, useLocation } from "react-router-dom"
import ButtonCsv from "@/ui/ProcesarPacientes/ButtonCsv";
import ButtonExcel from "@/ui/ProcesarPacientes/ButtonExcel";


export default function Pacientes() {
    const location = useLocation();
    const pathName = location.pathname;


    return (
        <main className="min-h-full relative">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">

                <ul className="flex flex-row justify-between px-[10px] items-center">
                    <div>
                        <ul className="flex flex-row gap-12 items-center justify-center">
                            <li>
                                <Link to="/dashboard/pacientes" className={`${isRutaExacta(pathName, "/dashboard/pacientes") ? 'font-medium' : 'text-black'
                                    }`}>Lista Pacientes</Link>
                            </li>
                            <li>
                                <ButtonCsv />
                                <ButtonExcel />
                            </li>

                        </ul>
                    </div>
                </ul>
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
        </main>
    )
}
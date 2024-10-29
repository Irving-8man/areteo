import { Link, Outlet} from "react-router-dom"

export default function Plantillas() {
    return (
        <main className="min-h-full relative">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <ul className="flex flex-row gap-12 items-center justify-start">
                    <li> 
                        <Link to="/dashboard/plantillas">Lista de Plantillas</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/plantillas/crear-plantilla">Crear Plantilla</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/plantillas/cargar-plantilla">Cargar Plantilla</Link>
                    </li>
                </ul>
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
        </main>
    )
}
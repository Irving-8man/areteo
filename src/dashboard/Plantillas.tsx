import { Link ,Outlet} from "react-router-dom"

export default function Plantillas() {
    return (
        <main className="min-h-full border-orange-600 border px-[30px] py-[30px] relative">
            <header className="sticky top-0 border-orange-600 border bg-black text-white z-[2] py-4">
                <ul className="flex flex-row gap-10 px-[10px]">
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
            <div className="border">
                <Outlet />
            </div>
        </main>
    )
}
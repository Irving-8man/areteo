import { Link ,Outlet} from "react-router-dom"
export default function Instrumentos() {
    return (
        <main className="border px-[30px] py-[30px] relative">
            <header className=" border bg-black text-white z-[2] py-4">
                <ul className="flex flex-row gap-10 px-[10px]">
                    <li> 
                        <Link to="/dashboard/instrumentos">Área 1: Organización del Sistema de Salud</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/instrumentos/area-dos">Área 2: Cooperación Comunitaria</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/instrumentos/area-tres">Área 3: Nivel de la práctica</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/instrumentos/area-cuatro">Área 4: Normas de atención de la Diabetes Mellitus</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/instrumentos/area-cinco">Área 5: Apoyo técnico</Link>
                    </li>
                    <li> 
                        <Link to="/dashboard/instrumentos/area-seis">Área 6: Sistema de Información de la Diabetes Mellitus</Link>
                    </li>
                </ul>
            </header>
            <div>
                <Outlet />
            </div>
        </main>
    )
}

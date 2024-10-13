import DialogRegiPaciente from "@/componets/DialogRegiPaciente"
import { usePacienteStore } from "@/store/storePacientes";
import { isRutaExacta } from "@/utils/identificarRutas";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"


export default function Pacientes() {
    const location = useLocation();
    const pathName = location.pathname;
    const { pacientes, cargarPacientes } = usePacienteStore((state) => ({
        pacientes: state.pacientes,
        cargarPacientes: state.cargarPacientes,
    }));

    // Cargar pacientes al iniciar el componente
    useEffect(() => {
        cargarPacientes();
    }, [cargarPacientes]);

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
                                <Link to="/dashboard/pacientes/registrar-paciente" className={`${isRutaExacta(pathName, "/dashboard/pacientes/registrar-paciente") ? 'font-medium' : 'text-black'
                                    }`}>Historial Medico</Link>
                            </li>
                        </ul>
                    </div>
                    <li>
                        <DialogRegiPaciente />
                    </li>
                </ul>
            </header>
            <div className="border px-[30px] py-[30px]">
                <Outlet />
            </div>
            <div>
                <ul>
                    {
                    pacientes.length > 0 ?

                    pacientes.map((paciente) => (
                        <li key={paciente.id}>
                            {paciente.primerNombre} {paciente.apellidoPaterno}
                        </li>
                    ))
                    
                    : <p>No existen</p>
                
                }
                </ul>
            </div>
        </main>
    )
}
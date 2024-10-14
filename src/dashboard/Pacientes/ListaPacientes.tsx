import Search from "@/componets/Search"
import Paginacion from "@/ui/Paginacion"
import PacientesTabla from "@/ui/Table"
import { usePacienteStore } from '@/store/storePacientes';
import { useEffect } from "react";

export default function ListaPacientes() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    return (
        <div>
            <div>
                <Search placeholder="Buscar Paciente..." />
            </div>

            <div>
                <PacientesTabla />
                <div>
                <Paginacion />
                </div>
            </div>
        </div>
    )
}
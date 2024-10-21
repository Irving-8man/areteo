import Search from "@/componets/Search"
import Paginacion from "@/ui/Paginacion"
import TablaPacientes from "@/ui/TablaPacientes"
import { usePacienteStore } from '@/store/storePacientes';
import DialogRegiPaciente from "@/ui/DialogRegiPaciente"
import { useEffect } from "react";

export default function ListaPacientes() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    return (
        <div>
            <div className="flex gap-2">
                <Search placeholder="Buscar Paciente..." />
                <DialogRegiPaciente />
            </div>

            <div>
                <TablaPacientes />
                <div>
                <Paginacion />
                </div>
            </div>
        </div>
    )
}
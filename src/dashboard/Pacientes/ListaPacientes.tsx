import Search from "@/componets/Search"
import Paginacion from "@/ui/Paginacion"
import TablaPacientes from "@/ui/TablaPacientes"
import { usePacienteStore } from '@/store/storePacientes';
import DialogRegiPaciente from "@/ui/DialogRegiPaciente"
import { useEffect } from "react";
import LeyenPacientes from "@/ui/LeyenPacientes";
import { Card } from "@fluentui/react-components";

export default function ListaPacientes() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const todosPacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    return (
        <section>
            <div>
                <LeyenPacientes pacientes={todosPacientes.length} />
                <div className="mt-10">
                    <Card style={{ padding: "25px" }}>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-2xl">Lista de Pacientes</h2>
                            <div className="flex gap-2 w-8/12">
                                <Search placeholder="Buscar Paciente..." />
                                <DialogRegiPaciente />
                            </div>
                        </div>

                        <TablaPacientes />
                        <div>
                            <Paginacion />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
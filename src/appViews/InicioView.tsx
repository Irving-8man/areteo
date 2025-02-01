import { AREASFIJAS } from "@/InstFijoDiabetes/Const";
import { usePacienteStore } from "@/store/storePacientes";
import { Card } from "@fluentui/react-components";
import { useEffect } from "react";


export default function Inicio() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const todosPacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);



    return (
        <main className="min-h-full">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <h1>Bienvenida</h1>
            </header>


            <section className="border min-h-[60vh] px-[30px] py-[30px]">
                <article>
                    <p className="text-8xl">ARETEO</p>
                    <p className="max-w-[70ch] text-lg mt-10">Apoyo para especialistas y personal de la salud en la gestión de pacientes e instrumentos para la evaluación y control.</p>
                </article>

                <article className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card: Total de pacientes */}
                    <Card className="max-w-[360px] max-h-[150px]" style={{ padding: "20px" }}>
                        <header className="text-lg font-medium">
                            <p className="capitalize">Total de pacientes registrados</p>
                        </header>
                        <p className="text-2xl font-bold mt-2">{todosPacientes.length}</p>
                    </Card>

                    {/* Card: Último paciente registrado */}
                    <Card className="max-w-[360px]" style={{ padding: "20px" }}>
                        <header className="text-lg font-medium">
                            <p>Evaluaciones ACIC Disponibles</p>
                        </header>
                        <ul className="text-base">
                            {AREASFIJAS.map((area) => (
                                <li key={area.id}>
                                    <p><span className="font-semibold">Área {area.id}:</span> {area.nombre}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Card: Total de evaluaciones */}
                    <Card className="max-w-[360px] max-h-[200px]" style={{ padding: "20px" }}>
                        <header className="text-lg font-medium">
                            <p>Desarrollo</p>
                        </header>
                        <ul className="text-base">
                            <li >Br. Irving Geyler Cupul Uc</li>
                            <li >Br. Joar Ruiz Peraza</li>
                            <li >Br. Jesus Be hau</li>
                            <li >Br. Didier Tec Ezquivel</li>
                            <li >Br. Juan Carlos Conde </li>
                        </ul>
                    </Card>

                </article>
            </section>
        </main>
    )
}

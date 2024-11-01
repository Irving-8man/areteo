import { getPaciente } from "@/services/PacienteController";
import { Button, Card } from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import TablaRegistros from "@/ui/TablaRegistros";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";
import { AvatarPaciente } from "@/componets/AvatarPaciente";



export default function VisualizarPaciente() {
    const { id } = useParams();
    const [pacienteData, setPacienteData] = useState({
        paciente: {
            id: "N/A",
            primerNombre: "N/A",
            segundoNombre: "N/A",
            apellidoPaterno: "N/A",
            apellidoMaterno: "N/A",
            fechaRegistro: new Date().toISOString(),
            fechaNacimiento: new Date().toISOString(),
            sexo: "N/A",
        },
        existe: false
    });
    const unico = 0;

    const edad =  useRef<{ valor: number; texto: string; }>()

    // Recuperar al paciente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPaciente(String(id));
                if (res) {
                    setPacienteData({ paciente: res[unico], existe: true });
                    edad.current = calcularEdad(res[unico].fechaNacimiento)
                }
            } catch (error) {
                console.error("Error al consultar la base de datos:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <section className="flex justify-between">
                <Link to="/dashboard/pacientes"><Button icon={<ArrowLeft20Filled />}>Volver</Button></Link>
                {pacienteData.existe && (
                    <Link to={`/dashboard/pacientes/${String(id)}/crear-registro`}>
                        <Button appearance="primary" icon={<Add20Filled />}>Crear Registro</Button>
                    </Link>
                )}
            </section>

            <section className="pt-10">
                <article>
                    <Card style={{ padding: "20px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between" }}>
                        <ul className="text-base">
                            <li className="flex gap-4 items-center">
                                <AvatarPaciente edad={calcularEdad(pacienteData.paciente.fechaNacimiento).valor}
                                    label={`${pacienteData.paciente.primerNombre} ${pacienteData.paciente.apellidoPaterno}`}
                                    tamanio="45px"
                                />
                                <h1 className="text-3xl">{pacienteData.paciente.primerNombre} {pacienteData.paciente.segundoNombre} {pacienteData.paciente.apellidoPaterno} {pacienteData.paciente.apellidoMaterno}</h1>
                            </li>

                            <li className="mt-4">
                                <h2 className="font-semibold">Fecha de registro: <span className="font-normal">{format(pacienteData.paciente.fechaRegistro, "long")}</span> </h2>
                            </li>

                            <li className="grid grid-cols-2 gap-10">
                                <h2 className="font-semibold">Fecha nacimiento:  <span className="font-normal">{format(pacienteData.paciente.fechaNacimiento, "long")}</span></h2>
                                <h2 className="font-semibold">Edad: <span className="font-normal">{edad.current?.texto}</span></h2>
                            </li>

                            <li>
                                <h2 className="font-semibold">Sexo: <span className="font-normal">{pacienteData.paciente.sexo}</span></h2>
                            </li>

                        </ul>

                        <ul>

                        </ul>
                    </Card>
                </article>
            </section>
            <section>
                <TablaRegistros id={id} />
            </section>
        </>
    );
}

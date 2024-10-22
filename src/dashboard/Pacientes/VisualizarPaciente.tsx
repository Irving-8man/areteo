import { PacienteRegistrado } from "@/models/types";
import { getPaciente } from "@/services/PacienteController";
import { Button } from "@fluentui/react-components";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import TablaRegistros from "@/ui/TablaRegistros";



export default function VisualizarPaciente() {
    const { id } = useParams()
    const [paciente, setPaciente] = useState<null | PacienteRegistrado>(null)
    const unico = 0

    //Recuperar al paciente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPaciente(String(id))
                if (res) {
                    setPaciente(res[unico])
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
                <Link to={`/dashboard/pacientes/${String(id)}/crear-registro`}>
                    <Button appearance="primary" icon={<Add20Filled />}>Crear Registro</Button>
                </Link>
            </section>
            <section><h1 className="text-3xl"> {paciente?.primerNombre} {paciente?.segundoNombre} {paciente?.apellidoPaterno} {paciente?.apellidoMaterno}</h1></section>
            <section>
                <TablaRegistros id={id} />
            </section>
        </>

    )
}
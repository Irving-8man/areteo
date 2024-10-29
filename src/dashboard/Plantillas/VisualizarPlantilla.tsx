import { PlantillaListDB } from "@/models/types";
import { Button } from "@fluentui/react-components";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { getPlantilla } from "@/services/PlantillasController";


export default function VisualizarPlantilla() {
    const { id } = useParams()
    const [plantilla, setPlantilla] = useState<null | PlantillaListDB>(null)
    const unico = 0

    //Recuperar al paciente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPlantilla(String(id))
                if (res) {
                    setPlantilla(res[unico])
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
                <Link to="/dashboard/plantillas"><Button icon={<ArrowLeft20Filled />}>Volver</Button></Link>
            </section>
            <section><h1 className="text-3xl"> {plantilla?.nombre}</h1></section>
        </>

    )
}
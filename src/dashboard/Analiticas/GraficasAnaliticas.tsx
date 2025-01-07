import { getAreaDatos, RespuesTotalArea } from "@/services/GraficasController";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {  QuetSeleccion } from "@/InstFijoDiabetes/Const";
import { QuestArea } from "@/models/typesFijo";
import { ChartRadarED } from "@/componets/ChartRadar";

export default function GraficasAnaliticas() {
    const { instrumentoId } = useParams();
    const instIdSafe = parseInt(instrumentoId!, 10);
    const AreaPreguntas: QuestArea = QuetSeleccion(instIdSafe);//toda la estructura
    const { quests } = AreaPreguntas; //solo nos importa este con el orden de componente y su pregunta

    const { data: DatosArea, isError:errorDatos, isLoading:loadDatos } = useQuery(
        {
            queryKey: ['DatosArea', instIdSafe],
            queryFn: async () => {
                const result = await getAreaDatos(instIdSafe);
                return result || null;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true
        }
    )

    const { data: RespuesArea, isError:errorTotal, isLoading:loadTotal } = useQuery(
        {
            queryKey: ['RespuesArea', instIdSafe],
            queryFn: async () => {
                const result = await RespuesTotalArea(instIdSafe);
                return result || 0;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true
        }
    )

    // Función que filtra los datos de la respuesta del componente actual
    const obtenerDatosComponente = (componenteId: number) => {
        if (!DatosArea) return null;
        const componenteDatos = DatosArea.find((item) => item.componente === componenteId);
        return componenteDatos ? componenteDatos.datos : null;
    };


    if (loadDatos || loadTotal) {
        return <div>Loading...</div>;
    }

    if (errorDatos || errorTotal) {
        return <div>Error al cargar los datos.</div>;
    }
    return (
        <>
            <section>
                <p>Respuesta obtenidas : {RespuesArea}</p>
            </section>


            <section className="grid grid-cols-3 gap-4">
                {
                    quests.map((pregunta) => {
                        const datosComponente = obtenerDatosComponente(pregunta.orden);
                        return (
                            <div key={pregunta.componente}>
                                <ChartRadarED
                                    data={datosComponente}
                                    componentName={pregunta.componente}
                                    componentOrder={pregunta.orden}
                                />
                            </div>
                        );
                    })
                }
            </section>
        </>
    )
}
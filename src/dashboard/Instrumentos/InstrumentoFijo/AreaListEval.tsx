import { AREASFIJAS, INFORMACIONAREAS } from "@/InstFijoDiabetes/Const";
import { Button, Card } from "@fluentui/react-components";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getRegistrosACIC } from "@/services/InstACICController";
import { ResEvalACICList } from "@/models/typesFijo";
import ListEvalPagAcord from "@/ui/ProcesarEvalACIC/ListEvalPagAcord";
import { FiltEvalPag } from "@/ui/ProcesarEvalACIC/FiltEvalPag";
import ButtonExportExcel from "@/ui/ProcesarArea/ButtonExportExcel";




export default function AreaListEval() {
    const { areaId } = useParams();
    const areaIdSafe = parseInt(areaId!, 10);
    const [evaluacionesFiltradas, setEvaluacionesFiltradas] = useState<ResEvalACICList[]>([]);

    const { data: RegistrosEval, isError, isLoading } = useQuery(
        {
            queryKey: ['Evaluaciones', areaIdSafe],
            queryFn: async () => {
                const result = await getRegistrosACIC(areaIdSafe);
                return result || [];
            },
            refetchOnWindowFocus: false,
        }
    )


    useEffect(() => {
        if (RegistrosEval && evaluacionesFiltradas.length === 0) {
            setEvaluacionesFiltradas([]);
        }
    }, [RegistrosEval, evaluacionesFiltradas.length]);


    /*
    const handleDeleteResEval = (id: string) => {
        console.log('hola desde', id)
    };
*/
    //Fucniones de busqueda por defecto
    const area = useMemo(() => {
        return AREASFIJAS.find(a => a.id === areaIdSafe);
    }, [areaIdSafe]);

    const infoArea = useMemo(() => {
        return INFORMACIONAREAS.find(a => a.id === areaIdSafe);
    }, [areaIdSafe])




    if (!area) {
        return <div>Área no encontrada</div>;
    }

    if (!infoArea) {
        return <div>Información no encontrada</div>;
    }

    if (isLoading) return <p>Cargando evaluaciones...</p>;
    if (isError) return <p>Error al cargar las evaluaciones.</p>;



    return (
        <div>
            <section className="flex justify-start">
                <Link to="/dashboard/instrumentos/instrumentoFijo"><Button icon={<ArrowLeft20Filled />}>ACIC</Button></Link>
            </section>
            <section className="pt-10">
                <Card style={{ padding: "20px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between" }}>
                    <div className="text-base">
                        <h1 className="text-3xl mb-4 font-semibold">Área {area.id} : {area.nombre}</h1>
                        <p className="max-w-[65ch]">{infoArea.descripcion}</p>
                    </div>

                    <ul className="flex flex-col gap-3 justify-center">
                        <li>
                            {area && (
                                <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(areaIdSafe)}/evaluar`}>
                                    <Button appearance="primary" icon={<Add20Filled />}>Evaluar Ahorawww</Button>
                                </Link>
                            )}
                        </li>
                        <li>
                             {RegistrosEval && <ButtonExportExcel evaluaciones={RegistrosEval} />}
                        </li>
                    </ul>
                </Card>
            </section>

            {/**probando */}
            <section>
                <div className="my-20">
                    <h2 className="font-semibold text-xl mb-6"> Lista de Evaluaciones ACIC recabadas del área</h2>
                    {RegistrosEval && <ListEvalPagAcord evaluaciones={RegistrosEval} />}
                </div>


                <div className="mt-10">
                    {RegistrosEval && <FiltEvalPag evaluaciones={RegistrosEval} />}
                </div>
                

            </section>
        </div>
    )
}
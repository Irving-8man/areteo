import { AREASFIJAS, INFORMACIONAREAS } from "@/InstFijoDiabetes/Const";
import { Button, Card, Input } from "@fluentui/react-components";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Add20Filled, ArrowLeft20Filled, Search20Filled } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getRegistrosACIC } from "@/services/InstACICController";
import { ResEvalACICList } from "@/models/typesFijo";
import TablaEvalACIC from "@/ui/TablaEvalACIC";


export default function AreaListEval() {
    const { areaId } = useParams();
    const areaIdSafe = parseInt(areaId!, 10);
    const [filterText, setFilterText] = useState<string>('');

    const { data: RegistrosEval, isError, isLoading } = useQuery(
        {
            queryKey: ['Evaluaciones', areaIdSafe],
            queryFn: async () => {
                const result = await getRegistrosACIC(areaIdSafe);
                return result || [];
            },
            refetchOnWindowFocus: false,
            refetchOnMount: 'always',
            staleTime: 0,
        }
    )

    const evaluacionesFiltra = useMemo(() => {
        if (!RegistrosEval) return [];
        return filterText.trim().length > 0
            ? RegistrosEval.filter((evaluation: ResEvalACICList) => {
                return (
                    evaluation.fechaEvaluacion.toLowerCase().includes(filterText.toLowerCase()) ||
                    evaluation.promedio.toString().includes(filterText) ||
                    evaluation.aplicador.toLowerCase().includes(filterText.toLowerCase()) ||
                    evaluation.respondiente.toLowerCase().includes(filterText.toLowerCase()) ||
                    evaluation.evaluacionDicha.toLowerCase().includes(filterText.toLowerCase())
                );
            })
            : RegistrosEval;
    }, [RegistrosEval, filterText]);

    const handleDeleteResEval = (id: string) => {
        console.log('hola desde', id)
    };

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
                            <Button appearance="outline">Hola</Button>
                        </li>
                    </ul>
                </Card>
            </section>


            <section className="mt-10">
                <div className="flex justify-end gap-2">
                    <Input type="text"
                        placeholder="Filtrar las evaluaciones hechas..."
                        contentBefore={<Search20Filled />}
                        value={filterText}
                        style={{ width: "400px" }}
                        onChange={(e) => setFilterText(e.target.value)} />
                    {area && (
                        <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(areaIdSafe)}/evaluar`}>
                            <Button appearance="primary" icon={<Add20Filled />}>Nueva Evaluación</Button>
                        </Link>
                    )}
                </div>
                <TablaEvalACIC ResEvalsACIC={evaluacionesFiltra} borrarResEval={handleDeleteResEval} />
            </section>
        </div>
    )
}
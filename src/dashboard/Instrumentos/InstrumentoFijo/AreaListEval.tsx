import { AREASFIJAS, INFORMACIONAREAS } from "@/InstFijoDiabetes/Const";
import { Button, Card } from "@fluentui/react-components";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { eliminarRegEvalACICAREA, getRegistrosACIC } from "@/services/InstACICController";
import ListEvalPagAcord from "@/ui/ProcesarEvalACIC/ListEvalPagAcord";
import { FiltEvalPag } from "@/ui/ProcesarEvalACIC/FiltEvalPag";
import DialogDeleteEvalACICAREA from "@/ui/DialogDeleteAllEvalACIC";



export default function AreaListEval() {
    const { areaId } = useParams();
    const areaIdSafe = parseInt(areaId!, 10);
    const queryClient = useQueryClient();

    const { data: RegistrosEval, isError, isLoading } = useQuery(
        {
            queryKey: ['Evaluaciones', areaIdSafe],
            queryFn: async () => {
                const result = await getRegistrosACIC(areaIdSafe);
                return result || [];
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true
        }
    )


    const deleteMutation = useMutation({
        mutationFn: async () => {
            return await eliminarRegEvalACICAREA(areaIdSafe);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Evaluaciones', areaIdSafe] });
            queryClient.refetchQueries({ queryKey: ['Evaluaciones', areaIdSafe] });
        },
        onError: (error) => {
            console.error('Error al borrar las evaluaciones:', error);
        },
    });

    const handleDeleteAllResEval = async () => {
        try {
            await deleteMutation.mutateAsync();
            alert("Evaluaciones borradas")
        } catch (error) {
            console.error('Error al eliminar las evaluaciones:', error);
        }
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
                <Link to="/dashboard/instrumentos/instrumentoFijo" ><Button icon={<ArrowLeft20Filled />}>ACIC</Button></Link>
            </section>
            <section className="pt-10">
                <Card style={{ padding: "25px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between" }}>
                    <div className="text-base">
                        <h1 className="text-3xl mb-4 font-semibold">Área {area.id} : {area.nombre}</h1>
                        <p className="max-w-[65ch]">{infoArea.descripcion}</p>
                    </div>

                    <div>
                        <div className="mb-10 font-semibold text-lg">
                            <p>Total de evaluaciones registradas:</p>
                            <p className="text-red-600">
                                {RegistrosEval ? (<span>{RegistrosEval.length}</span>) : (<span>Recargar ARETEO</span>)}
                            </p>
                        </div>

                        <ul className="flex flex-col gap-3 justify-center">
                            <li>
                                {area && (
                                    <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(areaIdSafe)}/evaluar`}>
                                        <Button appearance="primary" icon={<Add20Filled />}>Evaluar Ahora</Button>
                                    </Link>
                                )}
                            </li>
                            <li>
                                <DialogDeleteEvalACICAREA eliminar={handleDeleteAllResEval} />
                            </li>
                        </ul>
                    </div>

                </Card>
            </section>

            {/**probando */}
            <section>
                <div className="my-20">
                    <div className="mb-6">
                        <h2 className="font-semibold text-xl"> Lista de Evaluaciones ACIC recabadas del área.</h2>
                        <p className="font-thin text-base">Las evaluaciones estan páginadas de 10 en 10 *</p>
                    </div>
                    {RegistrosEval && <ListEvalPagAcord evaluaciones={RegistrosEval} />}
                </div>

                <div className="mt-10">
                    <h2 className="font-semibold text-xl mb-6"> Buscar en las Evaluaciones.</h2>
                    {RegistrosEval && RegistrosEval.length !== 0 ? (<FiltEvalPag evaluaciones={RegistrosEval} />) : (<p className="text-base">No hay evaluaciones disponibles para filtrar.</p>)}
                </div>

            </section>
        </div>
    )
}
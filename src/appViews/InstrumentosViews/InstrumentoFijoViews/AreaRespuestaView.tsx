import { Button, Card } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { format } from "@formkit/tempo";
import { useMemo } from "react";
import { AREASFIJAS } from "@/InstFijoDiabetes/Const";
import { ProcesarRespACIC } from "@/utils/ProcesarRespACIC";
import ButtonDocxResEvalAC from "@/Docx/DatosPaciente/ButtonDocxResEvalAC";
import DialogDeleteEvalACIC from "@/ui/DialogDeleteEvalACIC";
import { SqliteDatabase } from '@/services/repositorios/DatabaseSingle';
import { ACICRepository } from "@/services/repositorios/InstruACICRepository";

export default function AreaRespuesta() {
    const { respID, areaId } = useParams();
    const respIDSafe = respID!
    const areaIdSafe = parseInt(areaId!, 10);
    const navigate = useNavigate();

    const { data: evalResACICData, isError } = useQuery({
        queryKey: ['evalResACIC', respIDSafe],
        queryFn: async () => {
            const db = await SqliteDatabase.getInstance();
            const acicRepo = new ACICRepository(db);
            const res = await acicRepo.getRegEvalACICComp(respIDSafe);
            return res || null;
        },
        refetchOnWindowFocus: false
    })



    //Fucniones de busqueda por defecto
    const area = useMemo(() => {
        return AREASFIJAS.find(a => a.id === areaIdSafe);
    }, [areaIdSafe]);



    if (isError) {
        return <div>Error al cargar los datos.</div>;
    }

    if (!evalResACICData) {
        return <div>Cargando...</div>;
    }

    const { registro , respuestas }= evalResACICData;
    const respuestasProcesadas = ProcesarRespACIC(areaIdSafe, respuestas);

    //Funcion para borra evaluacion
    const handleDeleteEval = async () => {
        if (!registro || !evalResACICData.registro || !registro.id) {
            console.error("Datos de Evaluación no están disponibles para eliminar.");
            return;
        }
        try {
            const db = await SqliteDatabase.getInstance();
            const acicRepo = new ACICRepository(db);
            const res = await acicRepo.eliminarRegEvalACIC(respIDSafe);
            if (res) {
                alert("Registro de Evaluación Eliminado")
                navigate(`/dashboard/instrumentos/instrumentoFijo/area/${String(areaIdSafe)}`);
            }
        } catch (error) {
            console.error("Error al eliminar el registro de evalución:", error);
            alert("Fallo en eliminar Registro de Evaluación Eliminado")
        }
    };


    return (
        <>
            <section className="flex justify-between">
                <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(areaIdSafe)}`}>
                    <Button icon={<ArrowLeft20Filled />}>Área {areaIdSafe}</Button>
                </Link>
            </section>

            <section className="text-base">
                {registro ? (
                    <div>
                        <div className="text-center mb-12 flex justify-center">
                            <h1 className="font-bold text-2xl underline max-w-[37ch]">Respuestas de Evaluación ACIC para Área {area?.id} : {area?.nombre}</h1>
                        </div>

                        <div className="flex justify-center items-center gap-6 my-5">
                            <ButtonDocxResEvalAC evalACIC={registro} respuestas={respuestasProcesadas} />
                            <DialogDeleteEvalACIC eliminar={handleDeleteEval}/>
                        </div>

                        <Card style={{ padding: "25px" }}>
                            <article>
                                <h2 className="font-bold text-xl">Información de la Evaluación</h2>
                                <ul className="mt-2 flex flex-col gap-2 list-disc pl-4">
                                    <li><p><span className="font-semibold text-stone-700">Fecha de Evaluacion:</span>  {format(registro.fechaEvaluacion, { date: "full", time: "short" })}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Persona Evaluada:</span> {registro.respondiente}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Aplicador:</span>  {registro.aplicador}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Puntuación total:</span>  {registro.puntuacionTotal} </p></li>
                                    <li><p><span className="font-semibold text-stone-700">Puntución promedio:</span>   {parseFloat(registro.promedio!.toFixed(2))}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Componentes totales:</span>   {area?.numQ}</p></li>
                                    <li><p><span className="font-semibold text-stone-700"> Según las directrices del ACIC, se indica:</span>  {registro.evaluacionDicha} </p></li>
                                </ul>
                            </article>
                            <article className="mt-5">
                                <h2 className="font-bold text-xl">Respuestas puntuadas por Componente</h2>
                                <ul className="mt-2 flex flex-col gap-7 ">
                                {
                                    respuestasProcesadas.map((valor) => (
                                        <li key={valor.orden}>
                                            <div>
                                                <p><span  className="font-semibold text-stone-700">Componente: </span> {valor.orden}. {valor.componente}</p>
                                                <p><span className="font-semibold text-stone-700">Nivel: </span> {valor.nivel}</p>
                                                <p><span className="font-semibold text-stone-700">Descripción nivel: </span> {valor.descripcion}</p>
                                                <p><span className="font-semibold text-stone-700">Puntuación otorgada:</span> {valor.puntuacion}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                                </ul>

                            </article>
                        </Card>
                    </div>
                ) : (
                    <p>No se encontró información del paciente o del registro médico.</p>
                )}
            </section>

        </>
    )
}
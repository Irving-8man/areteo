import { CRITERIOS, QuetSeleccion, TITULOSEVAL_AREA } from "@/InstFijoDiabetes/Const";
import { QuestArea } from "@/models/typesFijo";
import { Button, Card, Divider, Input, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { z } from 'zod';
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { crearRegiACIC } from "@/services/InstACICController";
import { formSchemaFijo } from "@/schemas/formSchemaFijo";
import ButtonDocxPostRes from "@/Docx/DatosPaciente/ButtonDocxPostRes";


export default function AreaEvaluacion() {
    const { areaId } = useParams();
    const id = parseInt(areaId!);
    const [error, setError] = useState<string | null>(null);
    const AreaPreguntas: QuestArea = QuetSeleccion(id);
    const { quests, desc } = AreaPreguntas;
    const tituloArea = TITULOSEVAL_AREA[id];


    const [respuestas, setRespuestas] = useState<{ [key: number]: string }>(
        quests.reduce((acc, pregunta) => {
            acc[pregunta.orden] = "0"; // Inicializar todas las respuestas como string "0"
            return acc;
        }, {} as { [key: number]: string })
    );

    const [nombreEvaluado, setNombreEvaluado] = useState<string>("");
    const [nombreEvaluador, setNombreEvaluador] = useState<string>("");
    const [aplicadoPorAdmin, setAplicadoPorAdmin] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const nomEvaluadorDef = "admin";

    // Estado para almacenar los resultados del servidor
    const [resultados, setResultados] = useState<{
        targetPromedio: string | null;
        targetTotal: string | null;
        evaluacion: string | null;
        total: number | null;
        promedio: number | null;
        registroId: string | null;
    } | null>(null);
    const [parent] = useAutoAnimate()

    if (!AreaPreguntas) {
        return <div>Área no encontrada</div>;
    }

    const handleChange = (orden: number, value: string) => {
        setRespuestas((prev) => ({
            ...prev,
            [orden]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Verificar que el nombre del evaluador no esté vacío si no es aplicado por el admin
            if (!aplicadoPorAdmin && (!nombreEvaluador || nombreEvaluador.trim() === "")) {
                throw new Error("El nombre del evaluador es obligatorio cuando no es aplicado por el administrador.");
            }

            const data = {
                nombreEvaluado,
                nombreEvaluador: aplicadoPorAdmin ? nomEvaluadorDef : nombreEvaluador,
                aplicadoPorAdmin,
                respuestas
            };


            formSchemaFijo.parse(data);

            // Convertir las respuestas a enteros antes de procesar
            const respuestasPuntos = Object.entries(respuestas).map(([orden, valor]) => ({
                orden: parseInt(orden),
                respuesta: parseInt(valor)
            }));

            const datosEnvio = { id, nombreEvaluado, nombreEvaluador, aplicadoPorAdmin, respuestasPuntos }
            const res = await crearRegiACIC(datosEnvio);
            if (res) {
                setIsSubmitting(false);
                setResultados(res);
                alert("Evaluación registrada, baje un poco para ver sus resultados.")
            } else {
                setIsSubmitting(false);
                setResultados(res);
                alert("A Fallado el guardar sus evaluación, regrese al Área")
            }
        } catch (e) {
            setIsSubmitting(false);
            if (e instanceof z.ZodError) {
                setError(e.errors.map(err => err.message).join(", "));
            }
        }
    };

    return (
        <section>
            <div className="mb-4">
                <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(id)}`}>
                    <Button icon={<ArrowLeft20Filled />}>Área {id}</Button>
                </Link>
            </div>

            <h1 className="font-bold text-2xl mb-1">Evaluación de Área {id} : {tituloArea} </h1>

            <div>
                <p className=" max-w-[80ch] text-lg">{desc}</p>
            </div>

            <section className="mt-6 mb-14">
                <h3 className="font-semibold text-lg">Criterios por promedio en respuestas</h3>
                <ul className="grid grid-cols-3 gap-4 list-disc pl-4 mt-2">
                    {CRITERIOS.map((criterio, idx) => (
                        <li key={idx}>
                            <div>
                                <p className="font-semibold text-base">{criterio.rango}</p>
                                <p className="text-base">{criterio.descripcion}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>


            <div ref={parent}>
                <form onSubmit={handleSubmit} className="min-h-[100vh]">
                    <Card className="mb-20 mt-20" style={{ padding: "20px" }} >
                        <div>
                            <h2 className="font-bold text-xl text-gray-600">Ingresa los siguientes datos:</h2>
                        </div>
                        <div className="flex flex-col">
                            <Label required className="font-semibold" style={{ fontSize: "14px" }}>Nombre de la persona evaluada:</Label>
                            <Input
                                type="text"
                                value={nombreEvaluado}
                                onChange={(e) => setNombreEvaluado(e.target.value)}
                                required
                                disabled={isSubmitting || !!resultados}
                                appearance="outline"
                                className="mb-4 p-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label required={!aplicadoPorAdmin} className="font-semibold" style={{ fontSize: "14px" }}>
                                Nombre del aplicador:
                            </Label>
                            <Input
                                type="text"
                                value={nombreEvaluador}
                                onChange={(e) => setNombreEvaluador(e.target.value)}
                                required={!aplicadoPorAdmin} // El campo es obligatorio solo si *no* es el administrador
                                disabled={isSubmitting || !!resultados || aplicadoPorAdmin} // El campo se desactiva si es el admin
                                appearance="outline"
                                className="mb-4 p-2"
                            />

                        </div>

                        <div className="flex gap-2">
                            <Label className="flex items-center gap-2 font-semibold" style={{ fontSize: "14px" }}>
                                Aplicado por el administrador
                            </Label>
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative">
                                    <input type="checkbox"
                                        checked={aplicadoPorAdmin}
                                        disabled={isSubmitting || !!resultados}
                                        onChange={(e) => setAplicadoPorAdmin(e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-cyan-700 checked:border-cyan-700" id="check" />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Card>

                    <div className="flex flex-col gap-28">
                        {quests.map((pregunta) => (
                            <div key={pregunta.orden}>
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <Divider appearance="default">
                                        <h3 className="font-semibold text-base max-w-[70ch]">
                                            {pregunta.orden}. {pregunta.componente}
                                        </h3>
                                    </Divider>
                                </div>
                                <div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {pregunta.quetUni.map((nivel, index) => (
                                            <div key={index} className="flex flex-col justify-between border p-4">
                                                <div>
                                                    <p className="font-semibold">Nivel {nivel.nivel}</p>
                                                </div>
                                                <div>
                                                    <p className="max-w-[30ch]">{nivel.texto}</p>
                                                </div>
                                                <div>
                                                    <p className="flex justify-center gap-4">
                                                        {nivel.rango.map((valor) => (
                                                            <span key={valor} className="block">{valor}</span>
                                                        ))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <div className="inline">
                                            <Label className="text-blue-600 font-bold text-lg text-center mb-2 flex items-center justify-center">
                                                Puntuación para componente {pregunta.orden}
                                                <span className="ml-2 text-yellow-500">★</span></Label>
                                            <Select
                                                required
                                                onChange={(e) => handleChange(pregunta.orden, e.target.value)}
                                                value={respuestas[pregunta.orden]}
                                                disabled={isSubmitting || !!resultados}
                                            >
                                                {[...Array(12)].map((_, index) => (
                                                    <option key={index} value={index}>
                                                        {index}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {error && <p style={{ color: 'red' }} className="text-base">{error}</p>}

                        <div className="flex flex-col gap-3">
                            <Button type="submit" className="mt-4" style={{ padding: "10px" }} appearance="primary" disabled={isSubmitting || !!resultados}>
                                {isSubmitting ? 'Enviando...' : 'Enviar Respuestas'}
                            </Button>

                            {isSubmitting || !!resultados ? (
                                <Button className="p-6" appearance="outline" style={{ padding: "10px" }} disabled>
                                    Cancelar
                                </Button>
                            ) : (

                                <Button className="p-6" appearance="outline" style={{ padding: "10px" }}>
                                    <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(id)}`}>
                                        Cancelar
                                    </Link>
                                </Button>
                            )}

                        </div>
                    </div>
                </form>
                {/* Muestra el resultado cuando esté disponible */}
                {resultados && (
                    <div className="mt-16 border-2 text-base bg-gray-100 border-gray-300 shadow-sm rounded-md p-6 text-gray-800">
                        <h3 className="font-bold text-lg">Resultados de la Evaluación del ACIC</h3>
                        <ul className="flex flex-col gap-1 mt-4 list-disc pl-2">
                            <li><p className="max-w-[80ch]">{resultados.targetTotal}:  <span className="font-bold">{resultados.total}</span></p></li>
                            <li><p className="max-w-[80ch]">{resultados.targetPromedio}: <span className="font-bold">{parseFloat(resultados.promedio!.toFixed(2))}</span></p></li>
                            <li><p className="max-w-[80ch]"> Según las directrices del ACIC, este resultado indica: <span className="font-bold">{resultados.evaluacion}</span></p></li>
                        </ul>

                        <div className="flex justify-between mt-5">
                            <Link to={`/dashboard/instrumentos/instrumentoFijo/resultados/${String(id)}/${String(resultados.registroId)}`}>
                                <Button appearance="secondary" className="p-6" style={{ padding: "5px", width: "150px" }}>
                                    Revisar evaluación
                                </Button>
                            </Link>

                            <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(id)}`}>
                                <Button appearance="primary" className="p-6" style={{ padding: "5px", width: "150px" }}>
                                    Volver a Área {id}
                                </Button>
                            </Link>
                            <ButtonDocxPostRes evalRegi_id={String(resultados.registroId)} />
                        </div>
                    </div>
                )}
            </div>


        </section>
    );
}

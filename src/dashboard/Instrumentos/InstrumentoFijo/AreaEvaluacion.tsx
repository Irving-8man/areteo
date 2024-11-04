import { QuetSeleccion } from "@/InstFijoDiabetes/Const";
import { QuestArea } from "@/models/typesFijo";
import { Select } from "@fluentui/react-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { z } from 'zod';


// Esquema de validación de Zod aceptando strings
const respuestaSchema = z.object({
    respuestas: z.record(z.string(), z.string().refine(val => {
        const numVal = parseInt(val);
        return numVal >= 0 && numVal <= 11;
    }, {
        message: "La respuesta debe estar entre 0 y 11",
    }))
});

export default function AreaEvaluacion() {
    const { areaId } = useParams();
    const id = parseInt(areaId!);

    const AreaPreguntas: QuestArea = QuetSeleccion(id);
    const { quests } = AreaPreguntas;

    const [respuestas, setRespuestas] = useState<{ [key: number]: string }>(
        quests.reduce((acc, pregunta) => {
            acc[pregunta.orden] = "0"; // Inicializar todas las respuestas como string "0"
            return acc;
        }, {} as { [key: number]: string })
    );

    const [error, setError] = useState<string | null>(null);

    if (!AreaPreguntas) {
        return <div>Área no encontrada</div>;
    }

    const handleChange = (orden: number, value: string) => {
        setRespuestas((prev) => ({
            ...prev,
            [orden]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            respuestaSchema.parse({ respuestas });

            // Convertir las respuestas a enteros antes de procesar
            const respuestasArray = Object.entries(respuestas).map(([orden, valor]) => ({
                orden: parseInt(orden), // Convertir el orden a número
                respuesta: parseInt(valor) // Convertir el valor a número
            }));

            console.log('Respuestas enviadas:', respuestasArray);

            // Aquí puedes enviar las respuestas al servidor o manejarlas como necesites

            setError(null);
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors.map(err => err.message).join(", "));
            }
        }
    };


    return (
        <section>
            <h2 className="font-bold text-2xl">Evaluación de Área {id}</h2>
            <form onSubmit={handleSubmit} className="min-h-[100vh] flex flex-col gap-28 mt-6">
                {quests.map((pregunta) => (
                    <div key={pregunta.orden}>
                        <h3 className="font-semibold text-base mb-6 max-w-[65ch]">
                            {pregunta.orden}-{pregunta.componente}
                        </h3>
                        <div>
                            <div className="grid grid-cols-4 gap-2">
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
                                <div className="w-[300px]">
                                    <p>Puntuación para componente {pregunta.orden}</p>
                                    <Select
                                        required
                                        onChange={(e) => handleChange(pregunta.orden, e.target.value)}
                                        value={respuestas[pregunta.orden]}
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Enviar Respuestas</button>
            </form>
        </section>
    );
}
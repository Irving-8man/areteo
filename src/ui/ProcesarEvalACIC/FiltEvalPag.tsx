import { ResEvalACICList } from '@/models/typesFijo';
import { Input } from '@fluentui/react-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Search20Filled } from "@fluentui/react-icons";
import { ItemEvalACICList } from '@/componets/ItemEvalACICList';

const TIEMPO_CAMBIO = 400

interface FiltroEvaluacionesProps {
    evaluaciones: ResEvalACICList[];
}

export function FiltEvalPag({ evaluaciones }: FiltroEvaluacionesProps) {
    const [filterText, setFilterText] = useState<string>('');
    const [filtradas, setFiltradas] = useState<ResEvalACICList[]>([]);
    const [parent] = useAutoAnimate()

    // Función de filtrado con debounce para evitar múltiples llamadas
    const filtrarConDebounce = useDebouncedCallback((texto: string) => {
        if (texto.trim() === '') {
            setFiltradas([]); // No mostrar nada si el input está vacío
            return;
        }

        const resultadosFiltrados = evaluaciones.filter((evaluation) =>
            evaluation.fechaEvaluacion.toLowerCase().includes(texto.toLowerCase()) ||
            evaluation.promedio.toString().includes(texto) ||
            evaluation.aplicador.toLowerCase().includes(texto.toLowerCase()) ||
            evaluation.respondiente.toLowerCase().includes(texto.toLowerCase()) ||
            evaluation.evaluacionDicha.toLowerCase().includes(texto.toLowerCase())
        );

        setFiltradas(resultadosFiltrados);
    }, TIEMPO_CAMBIO);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const texto = e.target.value;
        setFilterText(texto);
        filtrarConDebounce(texto);
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Ej. Fatima del Rosio..."
                value={filterText}
                onChange={handleChange}
                style={{ width: "400px" }}
                className='mb-5'
                contentBefore={<Search20Filled />}
            />

            {/* Mostrar la tabla solo si hay resultados */}
            <table className="border-2 min-h-[35vh] hidden min-w-full text-gray-900 md:table">
                <thead className='rounded-lg text-left text-sm font-normal'>
                    <tr>
                        <th scope="col" className="px-2 py-5"></th>
                        <th scope="col" className="px-5 py-5 font-medium">Fecha de Evaluación</th>
                        <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                        <th scope="col" className="px-4 py-5 font-medium">Resultado</th>
                        <th scope="col" className="px-3 py-5 font-medium">Evaluado</th>
                        <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
                        <th scope="col" className="px-3 py-5 font-medium">
                            <span>Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody ref={parent}>
                    {filtradas.map((evaluacion, idx) => (
                        <ItemEvalACICList ResEvalACIC={evaluacion} key={idx} num={idx} designado={idx+1}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

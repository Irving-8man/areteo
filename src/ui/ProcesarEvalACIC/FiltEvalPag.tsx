import { ResEvalACICList } from '@/models/typesFijo';
import { Input } from '@fluentui/react-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';


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
                placeholder="Filtrar las evaluaciones hechas..."
                value={filterText}
                onChange={handleChange}
                style={{ width: "400px" }}
            />

            {/* Mostrar la tabla solo si hay resultados */}

            <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }} className='min-h-[40vh]'>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Fecha de Evaluación</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Promedio</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Aplicador</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Respondiente</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Evaluación Dicha</th>
                    </tr>
                </thead>
                <tbody ref={parent}>
                    {filtradas.map((evaluation) => (
                        <tr key={evaluation.id}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{evaluation.fechaEvaluacion}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{evaluation.promedio}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{evaluation.aplicador}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{evaluation.respondiente}</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{evaluation.evaluacionDicha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

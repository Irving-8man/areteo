import { Button } from '@fluentui/react-components';
import { ArrowDownload20Regular } from '@fluentui/react-icons';
import { format } from '@formkit/tempo';
import writeXlsxFile, { Schema } from 'write-excel-file';
import { ResEvalACICList } from '@/models/typesFijo'; // Asegúrate de importar correctamente tu tipo de datos

// Definir el esquema para las evaluaciones
const schema: Schema<ResEvalACICList> = [
    {
        column: 'ID de Evaluación',
        type: String,
        value: (evaluacion) => evaluacion.id, // Usar el id de la evaluación
    },
    {
        column: 'Fecha de Evaluación',
        type: String,
        value: (evaluacion) => format(new Date(evaluacion.fechaEvaluacion), "DD-MM-YYYY"), // Formatear la fecha
    },
    {
        column: 'Puntuación Total',
        type: Number,
        value: (evaluacion) => evaluacion.puntuacionTotal, // Puntuación total de la evaluación
    },
    {
        column: 'Promedio',
        type: Number,
        value: (evaluacion) => evaluacion.promedio, // Promedio calculado
    },
    {
        column: 'Aplicador',
        type: String,
        value: (evaluacion) => evaluacion.aplicador, // Nombre del aplicador
    },
    {
        column: 'Respondiente',
        type: String,
        value: (evaluacion) => evaluacion.respondiente, // Nombre del respondiente
    },
    {
        column: 'Evaluación Dicha',
        type: String,
        value: (evaluacion) => evaluacion.evaluacionDicha, // Descripción de la evaluación
    },
    // Si necesitas más datos, puedes agregar más columnas aquí
];

interface Props {
    evaluaciones: ResEvalACICList[];
}

export default function ButtonExportExcel({ evaluaciones }: Props) {
    const fecha = format(new Date(), "DD-MM-YYYY");

    // Función para crear y descargar el archivo Excel
    const crearExcel = async () => {
        try {
            await writeXlsxFile(evaluaciones, {
                schema,
                fileName: `Evaluaciones_ACIC_${fecha}.xlsx`, // Nombre del archivo con fecha
            });
        } catch (error) {
            console.error("Error al generar el archivo Excel:", error);
        }
    };

    return (
        <Button onClick={crearExcel} icon={<ArrowDownload20Regular />}>
            Descargar Excel
        </Button>
    );
}

import writeXlsxFile, { Schema } from 'write-excel-file';
import { Button } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { format } from '@formkit/tempo';
import { RegistroEvalACIC } from '@/models/typesFijo';

// Definimos el esquema para los datos de la evaluación
const schema: Schema<RegistroEvalACIC> = [
    {
        column: 'Fecha de Evaluación',
        type: String,
        value: (evaluacion) => format(new Date(evaluacion.fechaEvaluacion), "DD-MM-YYYY")
    },
    {
        column: 'Puntuación Total',
        type: Number,
        value: (evaluacion) => evaluacion.puntuacionTotal
    },
    {
        column: 'Promedio',
        type: Number,
        value: (evaluacion) => evaluacion.promedio
    },
    {
        column: 'Aplicador',
        type: String,
        value: (evaluacion) => evaluacion.aplicador
    },
    {
        column: 'Respondiente',
        type: String,
        value: (evaluacion) => evaluacion.respondiente
    },
    {
        column: 'Evaluación Dicha',
        type: String,
        value: (evaluacion) => evaluacion.evaluacionDicha
    },
    {
        column: 'Área Evaluada',
        type: Number,
        value: (evaluacion) => evaluacion.area_id
    }
];

interface ButtonExportExcelProps {
    evaluaciones: RegistroEvalACIC[]; // Recibe las evaluaciones a exportar
}

export default function ButtonExportExcel({ evaluaciones }: ButtonExportExcelProps) {
    const fecha = format(new Date(), "DD-MM-YYYY");

    // Función para crear el archivo Excel
    const crearExcel = async () => {
        try {
            await writeXlsxFile(evaluaciones, {
                schema,
                fileName: `Evaluaciones_${fecha}.xlsx`
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

import { RegistroEvalACIC_Area1, RegistroEvalACIC_Area2, RegistroEvalACIC_Area3, RegistroEvalACIC_Area4, RegistroEvalACIC_Area5, RegistroEvalACIC_Area6 } from '@/models/typesFijo';
import { format } from '@formkit/tempo';
import writeXlsxFile, { Schema } from 'write-excel-file';

// Inferencia de tipo

const schemaArea1: Schema<RegistroEvalACIC_Area1> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
    { column: 'Respuesta 4', type: Number, value: registro => registro.respuesta4 },
    { column: 'Respuesta 5', type: Number, value: registro => registro.respuesta5 },
    { column: 'Respuesta 6', type: Number, value: registro => registro.respuesta6 },
];

const schemaArea2: Schema<RegistroEvalACIC_Area2> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
];


const schemaArea3: Schema<RegistroEvalACIC_Area3> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
    { column: 'Respuesta 4', type: Number, value: registro => registro.respuesta4 },
];


const schemaArea4: Schema<RegistroEvalACIC_Area4> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
    { column: 'Respuesta 4', type: Number, value: registro => registro.respuesta4 },
];


const schemaArea5: Schema<RegistroEvalACIC_Area5> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
    { column: 'Respuesta 4', type: Number, value: registro => registro.respuesta4 },
    { column: 'Respuesta 5', type: Number, value: registro => registro.respuesta5 },
    { column: 'Respuesta 6', type: Number, value: registro => registro.respuesta6 },
];

const schemaArea6: Schema<RegistroEvalACIC_Area6> = [
    { column: 'Fecha de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), "DD-MM-YYYY") },
    { column: 'Hora de Evaluación', type: String, value: registro => format(new Date(registro.fechaEvaluacion), { time: "short" }) },
    { column: 'Puntuación Total', type: Number, value: registro => registro.puntuacionTotal },
    { column: 'Promedio', type: Number, value: registro => registro.promedio },
    { column: 'Evaluado', type: String, value: registro => registro.respondiente },
    { column: 'Aplicador', type: String, value: registro => registro.aplicador },
    { column: 'Evaluación Dicha', type: String, value: registro => registro.evaluacionDicha },
    { column: 'Respuesta 1', type: Number, value: registro => registro.respuesta1 },
    { column: 'Respuesta 2', type: Number, value: registro => registro.respuesta2 },
    { column: 'Respuesta 3', type: Number, value: registro => registro.respuesta3 },
    { column: 'Respuesta 4', type: Number, value: registro => registro.respuesta4 },
    { column: 'Respuesta 5', type: Number, value: registro => registro.respuesta5 },
];



// Funciones para generar Excel por cada área
export async function generarExcelArea1(evaluaciones: RegistroEvalACIC_Area1[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea1,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_1.xlsx`
    });
}

export async function generarExcelArea2(evaluaciones: RegistroEvalACIC_Area2[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea2,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_2.xlsx`
    });
}

// Repetir para las áreas 3 a 6...
export async function generarExcelArea3(evaluaciones: RegistroEvalACIC_Area3[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea3,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_2.xlsx`
    });
}
export async function generarExcelArea4(evaluaciones: RegistroEvalACIC_Area4[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea4,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_2.xlsx`
    });
}
export async function generarExcelArea5(evaluaciones: RegistroEvalACIC_Area5[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea5,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_2.xlsx`
    });
}
export async function generarExcelArea6(evaluaciones: RegistroEvalACIC_Area6[]) {
    await writeXlsxFile(evaluaciones, {
        schema: schemaArea6,
        fileName: `Excel_Lista_de_resultadosEvalACIC_area_2.xlsx`
    });
}

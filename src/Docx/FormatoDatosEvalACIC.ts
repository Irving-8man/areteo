import {
    Document,
    Paragraph,
    TextRun
} from "docx";

import { format } from "@formkit/tempo";
import { RegistroEvalACIRegis, respuestaACIC } from "@/models/typesFijo";
import { AREASFIJAS } from "@/InstFijoDiabetes/Const";

export function generarDocumentoEvalACIC(
    evalACIC: RegistroEvalACIRegis,
    respuestas: respuestaACIC[]
): Document {
    const sections = [];
    const area = AREASFIJAS.find(a => a.id === evalACIC.area_id);

    // Encabezado del documento
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: `Respuestas de Evaluación ACIC para Área ${area?.id} : ${area?.nombre}`,
                    bold: true,
                    size: 48,
                    underline: {},
                }),
            ],
            alignment: "center",
        }),
        new Paragraph({
            children: [
                new TextRun("Fecha de Creación: "),
                new TextRun({
                    text: format(new Date(), { date: "full", time: "short" }),
                    bold: true,
                }),
            ],
            spacing: { before: 400, after: 400 },
        })
    );

    // Información del Paciente
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "Información del la Evaluación",
                    bold: true,
                    size: 32,
                }),
            ],
        }),
        new Paragraph({ children: [new TextRun(`Fecha de Evaluacion: ${format(evalACIC.fechaEvaluacion, { date: "full", time: "short" })}`)] }),
        new Paragraph({ children: [new TextRun(`Persona Evaluada: ${evalACIC.respondiente}`)] }),
        new Paragraph({ children: [new TextRun(`Aplicador: ${evalACIC.aplicador}`)] }),
        new Paragraph({ children: [new TextRun(`Puntuación total: ${evalACIC.puntuacionTotal}`)] }),
        new Paragraph({ children: [new TextRun(`Puntución promedio: ${parseFloat(evalACIC.promedio!.toFixed(2))}`)] }),
        new Paragraph({ children: [new TextRun(`Componentes totales: ${area?.numQ}`)] }),
        new Paragraph({ children: [new TextRun(`Según las directrices del ACIC, se indica: ${evalACIC.evaluacionDicha}`)] })
    );


    // Registro médico
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "Respuestas dadas por componente",
                    bold: true,
                    size: 32,
                }),
            ],
            spacing: { before: 600, after: 400 },
        }),
    );

    //Procesar respuestas
    for (const resData of respuestas) {
        sections.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Componente: ${resData.orden}. ${resData.componente}`,
                        size: 16,
                    }),
                ],
                spacing: { before: 600 },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Nivel: ${resData.nivel}`,
                        size: 16,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Descripción nivel: ${resData.descripcion}`,
                        size: 16,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Puntuación otorgada: ${resData.puntuacion}`,
                        size: 16,
                    })
                ],
                spacing: { after: 400 },
            }),
            
        );
    }


    return new Document({
        sections: [
            {
                children: sections,
            },
        ],
    });
}

import {
    Document,
    Paragraph,
    TextRun,
    Tab
} from "docx";


export const NuevoDocucmento = new Document(
    {
        sections: [
            {
                properties: {},
                children: [
                    // Encabezado
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Expediente Médico",
                                bold: true,
                                size: 48,
                                underline: {},
                            }),
                        ],
                        alignment: "center",
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Fecha: "),
                            new TextRun({
                                text: "21 de Octubre de 2024",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),

                    // Información del Paciente
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Información del Paciente",
                                bold: true,
                                size: 32,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Nombre: "),
                            new TextRun({
                                text: "Juan Pérez",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Edad: "),
                            new TextRun({
                                text: "45 años",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Sexo: "),
                            new TextRun({
                                text: "Masculino",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Número de expediente: "),
                            new TextRun({
                                text: "EXP-12345",
                                bold: true,
                            }),
                        ],
                    }),
                    
                    // Diagnóstico
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Diagnóstico",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        spacing: { before: 600, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Diagnóstico principal: "),
                            new TextRun({
                                text: "Hipertensión arterial",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Síntomas: "),
                            new TextRun({
                                text: "Dolor de cabeza, mareos, presión arterial elevada.",
                                bold: true,
                            }),
                        ],
                    }),

                    // Tratamiento
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Tratamiento Recomendado",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        spacing: { before: 600, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("1. Medicamento: "),
                            new TextRun({
                                text: "Losartán 50mg, 1 vez al día.",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("2. Recomendaciones: "),
                            new TextRun({
                                text: "Mantener una dieta baja en sodio, realizar ejercicio físico regularmente, y realizar controles mensuales de presión arterial.",
                                bold: true,
                            }),
                        ],
                    }),

                    // Pie de Página
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Médico Responsable: Dr. María López",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 600, after: 200 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Firma: _______________________"),
                        ],
                    }),
                ],
            },
        ],
    }
);
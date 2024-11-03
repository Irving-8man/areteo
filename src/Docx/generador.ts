import {
    Document,
    Paragraph,
    TextRun,
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

                    // Ultimo registro medico **agregar
                    

                    // Pie de Página
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Médico Responsable: _________________________",
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
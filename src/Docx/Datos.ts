import {
    Document,
    Paragraph,
    TextRun,
    Tab
} from "docx";


export const DocucmentoNuevo = new Document(
    {
        sections: [
            {
                properties: {},
                children: [
                    // Encabezado
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Registro de Médico",
                                bold: true,
                                size: 48,
                                underline: {},
                            }),
                        ],
                        alignment: "center",
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("ID: "),
                            new TextRun({
                                text: "218329",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Paciente_id: "),
                            new TextRun({
                                text: "12345",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("FechaDiagnostico: "),
                            new TextRun({
                                text: "14 de septiembre del 2024",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Sexo: "),
                            new TextRun({
                                text: "Masculino",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Edad: "),
                            new TextRun({
                                text: "45",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Peso: "),
                            new TextRun({
                                text: "79Kg",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Estatura: "),
                            new TextRun({
                                text: "179Cm",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("PresionArterialPAS_0min: "),
                            new TextRun({
                                text: "XXX/XXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("PresionArterialPAD_0min: "),
                            new TextRun({
                                text: "XXX/XXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("PresionArterialPAS_5min: "),
                            new TextRun({
                                text: "XXX/XXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("PresionArterialPAD_5min: "),
                            new TextRun({
                                text: "XXX/XXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("hba1c: "),
                            new TextRun({
                                text: "XXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("anioDiagnostico "),
                            new TextRun({
                                text: "XXXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("AntecedFamiInfa: "),
                            new TextRun({
                                text: "XXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DescripcionAntecedentes: "),
                            new TextRun({
                                text: "XXXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("hdl: "),
                            new TextRun({
                                text: "xxxxxx",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("tgc: "),
                            new TextRun({
                                text: "XXXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Educacion: "),
                            new TextRun({
                                text: "xxxxxx",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DetalleEducacion: "),
                            new TextRun({
                                text: "XXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("EstadoCivil: "),
                            new TextRun({
                                text: "Soltero",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("UsaTratamientoInyectable: "),
                            new TextRun({
                                text: "No",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("UsaTratamientoOral: "),
                            new TextRun({
                                text: "XXXXX",
                                bold: true,
                            }),
                        ],
                        spacing: { before: 400, after: 400 },
                    }),
                    // Información del Tratamiento inyectable
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Información del Tratamientio inyectable",
                                bold: true,
                                size: 32,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Id: "),
                            new TextRun({
                                text: "12345",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Registro_ID: "),
                            new TextRun({
                                text: "12345",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DesdeCuandoIN: "),
                            new TextRun({
                                text: "XX/XX/XXXX",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DosisIn: "),
                            new TextRun({
                                text: "XXX",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("TipoNombreIN: "),
                            new TextRun({
                                text: "XXX",
                                bold: true,
                            }),
                        ],
                    }),
                    // Tratamiento
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Tratamiento Oral",
                                bold: true,
                                size: 32,
                            }),
                        ],
                        spacing: { before: 600, after: 400 },
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("ID: "),
                            new TextRun({
                                text: "12345",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Registo_id: "),
                            new TextRun({
                                text: "12345",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DesdeCuandoOR: "),
                            new TextRun({
                                text: "XXXX",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("DosisOR: "),
                            new TextRun({
                                text: "XXXXX",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("NombreMedicamentoOR: "),
                            new TextRun({
                                text: "XXXX",
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    }
);
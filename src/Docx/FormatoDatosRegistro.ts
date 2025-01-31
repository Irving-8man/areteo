import {
    Document,
    Paragraph,
    TextRun
} from "docx";
import { PacienteRegistrado, RegistroMedicoDB, TratamientoInyectableDB, TratamientoOralDB } from "@/models/types";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";

export function generarDocumentoRegistroMedico(
    paciente: PacienteRegistrado,
    registroMedico: RegistroMedicoDB,
    tratamientoInyectable: TratamientoInyectableDB | undefined,
    tratamientoOral: TratamientoOralDB | undefined
): Document {
    const sections = [];

    // Encabezado del documento
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "Registro Médico",
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
                    text: format(new Date(),{ date: "full", time: "short" }),
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
                    text: "Información del Paciente",
                    bold: true,
                    size: 32,
                }),
            ],
        }),
        new Paragraph({ children: [new TextRun(`Nombre: ${paciente.primerNombre} ${paciente.segundoNombre || ''} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno || ''}`)] }),
        new Paragraph({ children: [new TextRun(`Fecha de Nacimiento: ${format(paciente.fechaNacimiento, "long")}`)] }),
        new Paragraph({ children: [new TextRun(`Edad: ${calcularEdad(paciente.fechaNacimiento).texto}`)] }),
        new Paragraph({ children: [new TextRun(`Sexo: ${paciente.sexo}`)] }),
        new Paragraph({ children: [new TextRun(`Fecha de Registro: ${format(paciente.fechaRegistro, { date: "full", time: "short" })}`)] })
    );


    // Registro médico
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "Datos del Registro Médico",
                    bold: true,
                    size: 32,
                }),
            ],
            spacing: { before: 600, after: 400 },
        }),
        new Paragraph({ children: [new TextRun(`Fecha de Diagnóstico: ${format(registroMedico.fechaDiagnostico, "full")}`)] }),
        new Paragraph({ children: [new TextRun(`Edad: ${registroMedico.edadDicha}`)] }),
        new Paragraph({ children: [new TextRun(`Peso: ${registroMedico.peso} kg`)] }),
        new Paragraph({ children: [new TextRun(`Estatura: ${registroMedico.estatura} cm`)] }),
        new Paragraph({ children: [new TextRun(`Presión Arterial (0 min): ${registroMedico.presionArterialPAS_0min}/${registroMedico.presionArterialPAD_0min} mmHg`)] }),
        new Paragraph({ children: [new TextRun(`Presión Arterial (5 min): ${registroMedico.presionArterialPAS_5min}/${registroMedico.presionArterialPAD_5min} mmHg`)] }),
        new Paragraph({ children: [new TextRun(`HbA1c: ${registroMedico.hba1c}%`)] }),
        new Paragraph({ children: [new TextRun(`Año de Diagnóstico: ${registroMedico.anioDiagnostico}`)] }),
        new Paragraph({ children: [new TextRun(`Antecedentes Familiares: ${registroMedico.antecedFamiInfa}`)] }),
        new Paragraph({ children: [new TextRun(`Descripcion de Antecedentes: ${registroMedico.descripcionAntecedentes || ''}`)] }),
        new Paragraph({ children: [new TextRun(`HDL: ${registroMedico.hdl} mg/dL`)] }),
        new Paragraph({ children: [new TextRun(`TGC: ${registroMedico.tgc} mg/dL`)] }),
        new Paragraph({ children: [new TextRun(`Educación: ${registroMedico.educacion}`)] }),
        new Paragraph({ children: [new TextRun(`Detalles de educación: ${registroMedico.detalleEducacion || ''}`)] }),
        new Paragraph({ children: [new TextRun(`Estado civil: ${registroMedico.estadoCivil}`)] })
    );

    // Tratamientos: Diferenciación según tipo
    if (tratamientoInyectable && tratamientoOral) {
        sections.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Tratamientos - Inyectable y Oral",
                        bold: true,
                        size: 32,
                    }),
                ],
                spacing: { before: 600, after: 400 },
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        text: "Tratamiento Inyectable",
                        bold: true,
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [new TextRun(`Tipo: ${tratamientoInyectable.tipoNombreIn}`)],
            }),
            new Paragraph({
                children: [new TextRun(`Dosis: ${tratamientoInyectable.dosisIn}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Desde: ${tratamientoInyectable.desdeCuandoIn}`)],
            }),


            new Paragraph({
                children: [
                    new TextRun({
                        text: "Tratamiento Oral",
                        bold: true,
                        size: 24,
                    }),
                ],
            }),

            new Paragraph({
                children: [new TextRun(`Medicamento: ${tratamientoOral.nombreMedicamentoOr}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Dosis: ${tratamientoOral.dosisOr}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Desde: ${tratamientoOral.desdeCuandoOr}`)],
            })

        );

    } else if (tratamientoInyectable) {
        sections.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Tratamiento Inyectable",
                        bold: true,
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [new TextRun(`Tipo: ${tratamientoInyectable.tipoNombreIn}`)],
            }),
            new Paragraph({
                children: [new TextRun(`Dosis: ${tratamientoInyectable.dosisIn}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Desde: ${tratamientoInyectable.desdeCuandoIn}`)],
            }),
        );
    } else if (tratamientoOral) {
        sections.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Tratamiento Oral",
                        bold: true,
                        size: 24,
                    }),
                ],
            }),

            new Paragraph({
                children: [new TextRun(`Medicamento: ${tratamientoOral.nombreMedicamentoOr}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Dosis: ${tratamientoOral.dosisOr}`)],
            }),

            new Paragraph({
                children: [new TextRun(`Desde: ${tratamientoOral.desdeCuandoOr}`)],
            })

        );
    }


    // Firma del médico
    sections.push(
        new Paragraph({
            children: [new TextRun("Médico Responsable: _________________________")],
            spacing: { before: 600, after: 200 },
        }),
        new Paragraph({ children: [new TextRun("Firma: _______________________")] })
    );

    return new Document({
        sections: [
            {
                children: sections,
            },
        ],
    });
}

import {
    Document,
    Paragraph,
    TextRun
} from "docx";
import { PacienteRegistrado } from "@/models/types";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";

export function generarDocumentoPaciente(
    paciente: PacienteRegistrado
): Document {
    const sections = [];

    // Encabezado del documento
    sections.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "Datos de Paciente",
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
                    text: format(new Date(),"full"),
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
        new Paragraph({ children: [new TextRun(`Fecha de Nacimiento: ${format(paciente.fechaNacimiento,"long")}`)] }),
        new Paragraph({ children: [new TextRun(`Edad: ${calcularEdad(paciente.fechaNacimiento).texto}`)] }),
        new Paragraph({ children: [new TextRun(`Sexo: ${paciente.sexo}`)] }),
        new Paragraph({ children: [new TextRun(`Fecha de Registro: ${format(paciente.fechaRegistro,"full")}`)] })
    );

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

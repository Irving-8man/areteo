import { useEffect } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { usePacienteStore } from "@/store/storePacientes";
import { PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";

export default function ButtonWord() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const pacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    // Función para generar el documento .docx
    const crearDocx = () => {
        const doc = new Document({
            sections: [
                {
                    children: pacientes.map((paciente: PacienteRegistrado) => {
                        return new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Nombre: ${paciente.primerNombre || ''} ${paciente.segundoNombre || ''} ${paciente.apellidoPaterno || ''} ${paciente.apellidoMaterno || ''}`,
                                    bold: true,
                                }),
                                new TextRun({
                                    text: `\n, Fecha de Nacimiento: ${paciente.fechaNacimiento ? paciente.fechaNacimiento.split("T")[0] : 'N/A'}`,
                                }),
                                new TextRun({
                                    text: `\n, Sexo: ${paciente.sexo || 'N/A'}`,
                                })
                            ],
                        });
                    }),
                },
            ],
        });

        // Exportar el documento como .docx
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "Lista de Pacientes.docx");
        });
    };

    return (
        <Button onClick={crearDocx}>
            Guardar DOCX
        </Button>
    );
}

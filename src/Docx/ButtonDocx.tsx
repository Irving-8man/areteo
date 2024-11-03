import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { NuevoDocucmento } from "./generador";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';


export function ButtonDocx() {

    const generate = async () => {
        try {
            const documentCreator = NuevoDocucmento;

            // Genera el documento como un Blob
            const blob = await Packer.toBlob(documentCreator);

            // Convierte el Blob a ArrayBuffer para usarlo con Tauri
            const arrayBuffer = await blob.arrayBuffer();

            // Abre el diálogo para seleccionar la ubicación del archivo
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/Expediente.docx`,
                filters: [{
                    name: 'Word Document',
                    extensions: ['docx']
                }]
            });

            if (selectedPath) {
                // Guarda el archivo en el directorio seleccionado
                await writeBinaryFile(selectedPath, new Uint8Array(arrayBuffer));
                alert('Documento creado y guardado con éxito en: ' + selectedPath);
            }
        } catch (error) {
            console.error("Error al generar el archivo DOCX:", error);
        }
    };

    return (
        <div>
            <p>
                <Button onClick={generate}>Descargar dialog</Button>
            </p>
        </div>
    );
}

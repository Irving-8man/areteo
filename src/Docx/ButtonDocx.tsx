import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { NuevoDocucmento } from "./generador";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';


export function ButtonDocx() {

    const generate = async () => {
        try {
            const documentCreator = NuevoDocucmento;
            const blob = await Packer.toBlob(documentCreator)
            const arrayBuffer = await blob.arrayBuffer();
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/Expediente.docx`,
                filters: [{
                    name: 'Word Document',
                    extensions: ['docx']
                }]
            });

            if (selectedPath) {
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

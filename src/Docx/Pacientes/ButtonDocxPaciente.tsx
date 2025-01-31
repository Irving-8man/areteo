import { Packer } from "docx";
import { Button } from "@fluentui/react-components";
import { PacienteRegistrado } from "@/models/types";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocumentoPaciente } from "./FormatoDatosPaciente";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { format } from "@formkit/tempo";


interface DocxButtonProps {
    paciente: PacienteRegistrado;
}

const ButtonDocxPaciente: React.FC<DocxButtonProps> = ({ paciente }) => {

    const generarDocumento = async () => {
        const doc = generarDocumentoPaciente(paciente);

        const blob = await Packer.toBlob(doc);

        const selectedPath = await dialog.save({
            defaultPath: `${BaseDirectory.Desktop}/DatosPaciente_${paciente.primerNombre}${paciente.apellidoPaterno}_${format(new Date(), "DD-MM-YYYY")}.docx`,
            filters: [{ name: "Word Document", extensions: ["docx"] }],
        });

        if (selectedPath) {
            await writeBinaryFile(selectedPath, await blob.arrayBuffer());
            alert("Documento guardado con éxito en: " + selectedPath);
        }

    };

    return <Button onClick={generarDocumento} icon={<ArrowDownload20Regular />}>Datos personales</Button>;
};

export default ButtonDocxPaciente;

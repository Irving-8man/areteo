
import { Button } from "@fluentui/react-components";
import { PacienteRegistrado, RegistroMedicoDB, TratamientoInyectableDB, TratamientoOralDB, } from "@/models/types";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocumentoRegistroMedico } from "../FormatoDatosRegistro";
import { Packer } from "docx";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { format } from "@formkit/tempo";

interface DocxButtonProps {
    paciente: PacienteRegistrado;
    registro: RegistroMedicoDB;
    tratInye: TratamientoInyectableDB | undefined;
    trataOral: TratamientoOralDB | undefined;
}

const ButtonDocxRegistroMedico: React.FC<DocxButtonProps> = ({ paciente, registro, tratInye, trataOral }) => {

    const generarDocumento = async () => {
        let doc;
        if (registro && paciente) {
            doc = generarDocumentoRegistroMedico(paciente, registro, tratInye, trataOral);
            const blob = await Packer.toBlob(doc);
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/RegistroMedico_${paciente.primerNombre}${paciente.apellidoPaterno}_${format(new Date(), "DD-MM-YYYY")}.docx`,
                filters: [{ name: "Word Document", extensions: ["docx"] }],
            });

            if (selectedPath) {
                await writeBinaryFile(selectedPath, await blob.arrayBuffer());
                alert("Documento guardado con éxito en: " + selectedPath);
            }
        }
    };

    return <Button onClick={generarDocumento} appearance="primary" icon={<ArrowDownload20Regular />}>Descargar Registro</Button>;
};

export default ButtonDocxRegistroMedico;


import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { format } from "@formkit/tempo";
import { RegistroEvalACIRegis, respuestaACIC } from "@/models/typesFijo";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocumentoEvalACIC } from "./FormatoDatosEvalACIC";


interface DocxButtonProps {
    evalACIC: RegistroEvalACIRegis;
    respuestas: respuestaACIC[];
}

const ButtonDocxResEvalAC: React.FC<DocxButtonProps> = ({ evalACIC, respuestas }) => {


    const generarDocumento = async () => {
        if (evalACIC && respuestas) {
            const doc = generarDocumentoEvalACIC(evalACIC, respuestas);
            const blob = await Packer.toBlob(doc);
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/RespEvalACIC__${format(evalACIC.fechaEvaluacion, "DD-MM-YYYY")}__area-${String(evalACIC.area_id)}.docx`,
                filters: [{ name: "Word Document", extensions: ["docx"] }],
            });

            if (selectedPath) {
                await writeBinaryFile(selectedPath, await blob.arrayBuffer());
                alert("Documento guardado con éxito en: " + selectedPath);
            }

        }
    };

    return <Button onClick={generarDocumento} appearance="primary" icon={<ArrowDownload20Regular />}>Descargar Evaluación</Button>;
};

export default ButtonDocxResEvalAC;

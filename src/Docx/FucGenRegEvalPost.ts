import { Packer } from "docx";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { format } from "@formkit/tempo";
import { generarDocumentoEvalACIC } from "./FormatoDatosEvalACIC";
import { ProcesarRespACIC } from "@/utils/ProcesarRespACIC";
import { SqliteDatabase } from '@/services/repositorios/DatabaseSingle';
import { ACICRepository } from "@/services/repositorios/InstruACICRepository";


export async function generarDocxRegEvalPost( evalRegi_id: string) {
    const db = await SqliteDatabase.getInstance();
    const acicRepo = new ACICRepository(db);
    const evalACIC = await acicRepo.getRegEvalACICComp(evalRegi_id);

    if (!evalACIC) {
        throw new Error('Failed to fetch total number of pacientes.');
    }
    const { registro, respuestas } = evalACIC;
    const respuestasProces = ProcesarRespACIC(registro.area_id, respuestas);

    if (evalACIC && respuestas) {
        const doc = generarDocumentoEvalACIC(registro, respuestasProces);
        const blob = await Packer.toBlob(doc);
        const selectedPath = await dialog.save({
            defaultPath: `${BaseDirectory.Desktop}/RespEvalACIC__${format(registro.fechaEvaluacion, "DD-MM-YYYY")}__area-${String(registro.area_id)}.docx`,
            filters: [{ name: "Word Document", extensions: ["docx"] }],
        });

        if (selectedPath) {
            await writeBinaryFile(selectedPath, await blob.arrayBuffer());
            alert("Documento guardado con éxito en: " + selectedPath);
        }

    }
}
import { Packer } from "docx";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { format } from "@formkit/tempo";
import { getPaciente } from "@/services/PacienteController";
import { PacienteRegistrado, RegistroMedicoDB, } from "@/models/types";
import { getRegistroMedico, getTratamientoInyectable, getTratamientoOral } from "@/services/RegistrosMedicoController";
import { generarDocumentoRegistroMedico } from "./FormatoDatosRegistro";


export async function generarDocxRegistroMedico(paciente_id:string,registro_id:string){
    const unico = 0;
    const registro = await getRegistroMedico(registro_id);
    const pacienteDB = await getPaciente(paciente_id);
    let inyectable = null;
    let oral = null;
    let doc;

    if (registro[unico] && pacienteDB[unico]) {
        const registroMedico: RegistroMedicoDB = registro[unico];
        const paciente:PacienteRegistrado = pacienteDB[unico];

        // Convertimos "true"/"false" a booleano si es necesario
        const usaTratamientoInyectable = registroMedico.usaTratamientoInyectable === "true";
        const usaTratamientoOral = registroMedico.usaTratamientoOral === "true";


        if (usaTratamientoInyectable && usaTratamientoOral) {
            inyectable = await getTratamientoInyectable(registro_id);
            oral = await getTratamientoOral(registro_id);
            doc = generarDocumentoRegistroMedico(paciente,registroMedico, inyectable[unico], oral[unico]);
            
        } else if (usaTratamientoInyectable) {
            inyectable = await getTratamientoInyectable(registro_id);
            doc = generarDocumentoRegistroMedico(paciente,registroMedico, inyectable[unico], null);

        } else if (usaTratamientoOral) {
            oral = await getTratamientoOral(registro_id);
            doc = generarDocumentoRegistroMedico(paciente,registroMedico, null, oral[unico]);

        } else {
            doc = generarDocumentoRegistroMedico(paciente,registroMedico, null, null);
        }
    
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
}
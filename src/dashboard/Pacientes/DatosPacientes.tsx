import ButtonExportCSVDialog from "@/ui/ProcesarPacientes/ButtonExporCSVDialog";
import ButtonExportExcel from "@/ui/ProcesarPacientes/ButtonExportExcel";



export default function DatosPacientes() {
    return(
        <>
            <ButtonExportExcel />
            <ButtonExportCSVDialog />
        </>
    )
}


import ButtonExportCSVDialog from "@/ui/ProcesarPacientes/ButtonExporCSVDialog";
import ButtonExportExcel from "@/ui/ProcesarPacientes/ButtonExportExcel";
import { Card } from "@fluentui/react-components";



export default function DatosPacientes() {
    return (
        <section>
            <p className="text-xl">Exportar <span className="font-semibold">solo los datos personales</span> de todos los pacientes</p>
            <article className="columns-3 mt-10">
                <div>
                    <Card style={{minHeight:"150px"}} className="flex flex-col justify-center">
                        <p className="text-base">Descargar datos en archivo XLXS</p>
                        <ButtonExportExcel />
                    </Card>
                </div>
                <div>
                    <Card style={{minHeight:"150px"}} className="flex flex-col justify-center">
                        <p className="text-base">Descargar datos archivo CSV, con separador ";"</p>
                        <ButtonExportCSVDialog />
                    </Card>
                </div>
            </article>
        </section>
    )
}


import { Button } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { RegistroEvalACIC_Area1, RegistroEvalACIC_Area2, RegistroEvalACIC_Area3, RegistroEvalACIC_Area4, RegistroEvalACIC_Area5, RegistroEvalACIC_Area6 } from '@/models/typesFijo';
import { getRegEvalACICAREA } from '@/services/InstACICController';
import { generarExcelArea1, generarExcelArea2 } from '@/InstFijoDiabetes/ExcelFijos';






export default function ButtonExportExcelAreasE({ area_id }: { area_id: number }) {
    const crearExcel = async () => {
        try {
            const evaluaciones_area = await getRegEvalACICAREA(area_id);
            if (evaluaciones_area) {
                switch (area_id) {
                    case 1:
                        await generarExcelArea1(evaluaciones_area as unknown as RegistroEvalACIC_Area1[]);
                        break;
                    case 2:
                        await generarExcelArea2(evaluaciones_area as unknown as RegistroEvalACIC_Area2[]);
                        break;
                    case 3:
                        await generarExcelArea2(evaluaciones_area as unknown as RegistroEvalACIC_Area3[]);
                        break;
                    case 4:
                        await generarExcelArea2(evaluaciones_area as unknown as RegistroEvalACIC_Area4[]);
                        break;
                    case 5:
                        await generarExcelArea2(evaluaciones_area as unknown as RegistroEvalACIC_Area5[]);
                        break;
                    case 6:
                        await generarExcelArea2(evaluaciones_area as unknown as RegistroEvalACIC_Area6[]);
                        break;
                    default:
                        console.error("Área no reconocida");
                        return;
                }
            }
        } catch (error) {
            console.error("Error al generar el archivo Excel:", error);
        }
    };

    return (
        <Button onClick={crearExcel} icon={<ArrowDownload20Regular />}>
            Evaluaciones Excel
        </Button>
    );
}

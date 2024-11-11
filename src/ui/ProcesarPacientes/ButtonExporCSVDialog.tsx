import { useEffect, useState } from 'react';
import { jsonToCSV } from 'react-papaparse';
import { usePacienteStore } from '@/store/storePacientes';
import { PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";
import { calcularEdad } from '@/utils/CalcularEdad';
import { format } from '@formkit/tempo';
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { dialog } from '@tauri-apps/api';
import { ArrowDownload20Regular } from "@fluentui/react-icons";

type CSVData = {
    FechaRegistro: string,
    PrimerNombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    FechaNacimiento: string,
    Edad: number,
    EdadDescrita: string,
    Sexo: string
};

export default function ButtonExportCSVDialog() {
    const [data, setData] = useState<CSVData[]>([]); 
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const pacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    useEffect(() => {
        if (pacientes && pacientes.length > 0) {
            const formattedData: CSVData[] = pacientes.map((paciente: PacienteRegistrado) => ({
                FechaRegistro: format(paciente.fechaRegistro,"DD-MM-YYYY") || '',
                PrimerNombre: paciente.primerNombre || '', 
                SegundoNombre: paciente.segundoNombre || '',
                ApellidoPaterno: paciente.apellidoPaterno || '',
                ApellidoMaterno: paciente.apellidoMaterno || '',
                FechaNacimiento: format(paciente.fechaNacimiento,"DD-MM-YYYY") || '',
                Edad: calcularEdad(paciente.fechaNacimiento).valor,
                EdadDescrita: calcularEdad(paciente.fechaNacimiento).texto,
                Sexo: paciente.sexo || ''
            }));
            setData(formattedData);
        }
    }, [pacientes]);

    const fecha = format(new Date(),"DD-MM-YYYY");

    const saveCSVFile = async () => {
        const csvContent = jsonToCSV(data);

        try {
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/CSV_Lista_de_Pacientes_${fecha}.csv`,
                filters: [{
                    name: 'CSV Files',
                    extensions: ['csv']
                }]
            });

            if (selectedPath) {
                await writeTextFile(selectedPath, csvContent);
                alert('CSV guardado con éxito en: ' + selectedPath);
            }
        } catch (err) {
            console.error('Error al guardar el archivo CSV:', err);
        }
    };

    return (
        <Button onClick={saveCSVFile} icon={<ArrowDownload20Regular />}>
            Descargar CSV
        </Button>
    );
}

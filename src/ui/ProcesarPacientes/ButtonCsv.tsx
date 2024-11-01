import { useEffect, useState } from 'react';
import { useCSVDownloader } from 'react-papaparse';
import { usePacienteStore } from '@/store/storePacientes';
import { PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";
import { calcularEdad } from '@/utils/CalcularEdad';

// Definición de tipo para el formato del CSV
type CSVData = [
    string, // primerNombre
    string, // segundoNombre
    string, // apellidoPaterno
    string, // apellidoMaterno
    string, // fechaNacimiento
    number, // edad
    string  // sexo
];

export default function ButtonCsv() {
    const { CSVDownloader, Type } = useCSVDownloader();
    const [data, setData] = useState<CSVData[]>([]); 
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const pacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    useEffect(() => {
        if (pacientes && pacientes.length > 0) {
            const formattedData: CSVData[] = pacientes.map((paciente: PacienteRegistrado) => [
                paciente.primerNombre || '', 
                paciente.segundoNombre || '',
                paciente.apellidoPaterno || '',
                paciente.apellidoMaterno || '',
                paciente.fechaNacimiento ? paciente.fechaNacimiento.split('T')[0] : '', // Mantener solo la fecha
                calcularEdad(paciente.fechaNacimiento).valor,
                paciente.sexo || '',
            ]);
            setData(formattedData);
        }
    }, [pacientes]);

    // Incluir encabezado en los datos del CSV
    const encabezado: string[] = [
        'Primer Nombre',
        'Segundo Nombre',
        'Apellido Paterno',
        'Apellido Materno',
        'Fecha de Nacimiento',
        'Sexo'
    ];

    return (
        <CSVDownloader
            type={Type.Button}
            filename={'Lista de Pacientes'}
            bom={true}
            config={{
                delimiter: ';',
                header: true, 
            }}
            data={[encabezado, ...data]} 
        >
            <Button>
                Guardar CSV
            </Button>
        </CSVDownloader>
    );
}
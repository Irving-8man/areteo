import { useEffect, useState } from 'react';
import { useCSVDownloader } from 'react-papaparse';
import { usePacienteStore } from '@/store/storePacientes';
import { PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";
import { calcularEdad } from '@/utils/CalcularEdad';
import { format } from '@formkit/tempo';

// Definición de tipo para el formato del CSV
type CSVData = [
    string, //Fecha de registro
    string, // primerNombre
    string, // segundoNombre
    string, // apellidoPaterno
    string, // apellidoMaterno
    string, // fechaNacimiento
    number, // edad
    string, //edad descrita
    string  // sexo
];

export default function ButtonExportCSV() {
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
                format(paciente.fechaRegistro,"DD-MM-YYYY") || '',
                paciente.primerNombre || '', 
                paciente.segundoNombre || '',
                paciente.apellidoPaterno || '',
                paciente.apellidoMaterno || '',
                format(paciente.fechaNacimiento,"DD-MM-YYYY") || '', // Mantener solo la fecha
                calcularEdad(paciente.fechaNacimiento).valor,
                calcularEdad(paciente.fechaNacimiento).texto,
                paciente.sexo || '',
            ]);
            setData(formattedData);
        }
    }, [pacientes]);

    // Incluir encabezado en los datos del CSV
    const encabezado: string[] = [
        'Fecha de Registro',
        'Primer Nombre',
        'Segundo Nombre',
        'Apellido Paterno',
        'Apellido Materno',
        'Fecha de Nacimiento',
        'Edad',
        'Edad Descrita',
        'Sexo'
    ];


    const fecha = format(new Date(),"DD-MM-YYYY")



    return (
        <CSVDownloader
            type={Type.Link}
            filename={`CSV_Lista_de_Pacientes_${fecha}`}
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
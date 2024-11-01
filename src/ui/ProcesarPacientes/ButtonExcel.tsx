import { useEffect } from 'react';
import writeXlsxFile, { Schema } from 'write-excel-file';
import { usePacienteStore } from '@/store/storePacientes';
import { PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";

//Instalacion: npm install write-excel-file --save
//Pagina: https://www.npmjs.com/package/write-excel-file?activeTab=readme

//Asignacion de valores
const schema: Schema<PacienteRegistrado> = [
    {
        column: 'Primer Nombre',
        type: String,
        value: paciente => paciente.primerNombre
    },
    {
        column: 'Segundo Nombre',
        type: String,
        value: paciente => paciente.segundoNombre
    },
    {
        column: 'Apellido Paterno',
        type: String,
        value: paciente => paciente.apellidoPaterno
    },
    {
        column: 'Apellido Materno',
        type: String,
        value: paciente => paciente.apellidoMaterno
    },
    {
        column: 'Fecha de Nacimiento',
        type: Date,
        format: 'yyyy-mm-dd',
        value: paciente => paciente.fechaNacimiento ? new Date(paciente.fechaNacimiento) : null
    },
    {
        column: 'Sexo',
        type: String,
        value: paciente => paciente.sexo
    }
];

export default function ButtonExcel() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const pacientes = usePacienteStore((state) => state.pacientes);

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    const crearExcel = async () => {
        try {
            await writeXlsxFile(pacientes, {
                schema,
                fileName: 'Lista de Pacientes.xlsx'
            });
        } catch (error) {
            console.error("Error al generar el archivo Excel:", error);
        }
    };

    return (
        <Button onClick={crearExcel}>
            Guardar Excel
        </Button>
    );
}

import { useEffect } from 'react';
import writeXlsxFile, { Schema } from 'write-excel-file';
import { usePacienteStore } from '@/store/storePacientes';
import {  PacienteRegistrado } from "@/models/types";
import { Button } from "@fluentui/react-components";
import { format } from '@formkit/tempo';

import { calcularEdad } from '@/utils/CalcularEdad';

const schema: Schema<PacienteRegistrado> = [
    {
        column: 'Fecha de Registro',
        type: String,
        value: paciente => format(new Date(paciente.fechaRegistro), "DD-MM-YYYY")
    },
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
        type:String,
        value: paciente => format(new Date(paciente.fechaNacimiento), "DD-MM-YYYY")
    },
    {
        column: 'Edad',
        type: Number,
        value: paciente => calcularEdad(paciente.fechaNacimiento).valor
    },
    {
        column: 'Edad Descrita',
        type: String,
        value: paciente => calcularEdad(paciente.fechaNacimiento).texto
    },
    {
        column: 'Sexo',
        type: String,
        value: paciente => paciente.sexo
    }
];

export default function ButtonExportExcel() {
    const cargarTodosPacientes = usePacienteStore((state) => state.cargarTodosPacientes);
    const pacientes = usePacienteStore((state) => state.pacientes);
    const fecha = format(new Date(),"DD-MM-YYYY")

    useEffect(() => {
        cargarTodosPacientes();
    }, [cargarTodosPacientes]);

    const crearExcel = async () => {
        try {
            await writeXlsxFile(pacientes, {
                schema,
                fileName: `Excel_Lista_de_Pacientes_${fecha}.xlsx`
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

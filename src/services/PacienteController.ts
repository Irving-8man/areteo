import { getDbInstance } from "./DatabaseSingleton";
import { Paciente, PacienteRegistrado } from '../models/types';
import { generarID } from "@/utils/GenerarID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()

//Recuperar administrador
export async function getPacientesRegistrados() {
    try {
        const db = await getDb;
        const pacientes: PacienteRegistrado[] = await db.select("SELECT * FROM Paciente");
        if (pacientes.length > 0) {
            return pacientes;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return [];
    }
}

// Registrar administrador
export async function registrarPaciente(data: Paciente):Promise<PacienteRegistrado | null> {
    try {
        const db = await getDb;
        const nuevoID = generarID();
        const horaRegistro = new Date();

        // Convertir la fecha de nacimiento a formato ISO
        const fechaNacimientoISO = new Date(data.fechaNacimiento).toISOString();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fechaNacimiento, ...otrosDatos } = data; // Desestructurar para excluir la fecha de nacimiento

        const nuevoPaciente: PacienteRegistrado = {
            id: nuevoID,
            ...otrosDatos, // Agregar todos los demás atributos de data
            fechaNacimiento: fechaNacimientoISO, // Agregar fecha de nacimiento tratada
            fechaRegistro: horaRegistro.toISOString() // Guardar la fecha de registro en formato ISO
        };


        const registrado = await db.execute(
            "INSERT INTO Paciente (id, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                nuevoPaciente.id,
                nuevoPaciente.primerNombre,
                nuevoPaciente.segundoNombre || null,
                nuevoPaciente.apellidoPaterno,
                nuevoPaciente.apellidoMaterno || null,
                nuevoPaciente.fechaNacimiento,
                nuevoPaciente.fechaRegistro,
            ]
        );
    

        if (registrado) {
            return nuevoPaciente;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error en registrarAdmin:", error);
        return null;
    }
}

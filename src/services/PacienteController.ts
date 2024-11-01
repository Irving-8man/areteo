import { getDbInstance } from "./DatabaseSingleton";
import { Paciente, PacienteRegistrado } from '../models/types';
import { generarID } from "@/utils/GenerarID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()
const PACIENTES_POR_PAGINA = 10


export async function getAllPacientesRegistrados() {
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


export async function numeroPacientes() {

    try {
        const db = await getDb;
        const sqlQuery = `
        SELECT COUNT(*)
        FROM Paciente
      `;

        // Ejecutar la consulta
        const count = await db.select(sqlQuery);
        return Number(count[0]['COUNT(*)']) | 0
    } catch (error) {
        console.error('Database Error:', error);
        return 0;
    }
}


export async function getPaciente(id: string) {
    try {
        const db = await getDb;
        const paciente = await db.select("SELECT * FROM Paciente WHERE id= $1", [id]);
        if (paciente) {
            return paciente;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return null;
    }
}


export async function registrarPaciente(data: Paciente): Promise<PacienteRegistrado | null> {
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
            fechaRegistro: horaRegistro.toISOString(), // Guardar la fecha de registro en formato ISO
        };


        const registrado = await db.execute(
            "INSERT INTO Paciente (id, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, fechaRegistro, sexo) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)",
            [
                nuevoPaciente.id,
                nuevoPaciente.primerNombre,
                nuevoPaciente.segundoNombre || null,
                nuevoPaciente.apellidoPaterno,
                nuevoPaciente.apellidoMaterno || null,
                nuevoPaciente.fechaNacimiento,
                nuevoPaciente.fechaRegistro,
                nuevoPaciente.sexo
            ]
        );


        if (registrado) {
            return nuevoPaciente;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error en registrar paciente:", error);
        return null;
    }
}

export async function getPacientesFiltradoPaginado(query: string, currentPage: number) {
    const offset = (currentPage - 1) * PACIENTES_POR_PAGINA; // Define el offset
    const normalizedQuery = query.toLowerCase(); // Normaliza la consulta

    try {
        const db = await getDb;

        // Usamos tu consulta y agregamos LIMIT y OFFSET
        const sqlQuery = `
            SELECT * 
            FROM Paciente 
            WHERE 
                LOWER(primerNombre) LIKE "%${normalizedQuery}%" OR
                LOWER(segundoNombre) LIKE "%${normalizedQuery}%" OR
                LOWER(apellidoPaterno) LIKE "%${normalizedQuery}%" OR
                LOWER(apellidoMaterno) LIKE "%${normalizedQuery}%"
            ORDER BY fechaRegistro ASC
            LIMIT $1 OFFSET $2
        `;

        // Ejecutar la consulta
        const resultados: PacienteRegistrado[] = await db.select(sqlQuery, [PACIENTES_POR_PAGINA, offset]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}


export async function paginasPacientes(query: string) {
    const normalizedQuery = query.toLowerCase();

    try {
        const db = await getDb;
        const sqlQuery = `
        SELECT COUNT(*)
        FROM Paciente
        WHERE
          lower(primerNombre) LIKE "%${normalizedQuery}%" OR
          lower(segundoNombre) LIKE "%${normalizedQuery}%" OR
          lower(apellidoPaterno) LIKE "%${normalizedQuery}%" OR
          lower(apellidoMaterno) LIKE "%${normalizedQuery}%"
      `;

        // Ejecutar la consulta
        const count = await db.select(sqlQuery);
        const totalPag = Math.ceil(Number(count[0]['COUNT(*)']) / PACIENTES_POR_PAGINA);
        return totalPag
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of pacientes.');
    }
}


export async function eliminarPaciente(id: string) {

    try {
        const db = await getDb;
        const sqlQuery = `
        DELETE FROM Paciente
        WHERE id = $1
      `;
        const resultado = await db.select(sqlQuery, [id]);
        return resultado
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of pacientes.');
    }
}




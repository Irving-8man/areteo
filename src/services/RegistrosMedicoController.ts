import { getDbInstance } from "./DatabaseSingleton";
import { RegistroMedicoDB } from '../models/types';
//import { generarID } from "@/utils/GenerarID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()


export async function getRegistrosPaciente(id: string) {

    try {
        const db = await getDb;
        const sqlQuery = `
            SELECT * 
            FROM RegistroMedico
            WHERE paciente_id = $1
            ORDER BY fechaDiagnostico ASC;
        `;

        // Ejecutar la consulta
        const resultados: RegistroMedicoDB[] = await db.select(sqlQuery, [id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

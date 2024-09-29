import { getDbInstance } from "./DatabaseSingleton";
import { Admin } from '../models/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()


//Recuperar administrador
export async function getAdmin() {
    const db = await getDb;
    try {
        const admin: Admin[] = await db.select("SELECT * FROM Administrador WHERE nombre = 'admin'");
        if (admin.length > 0) {
            return admin[0]; // Retorna el primer (y único) registro
        } else {
            console.log("No hay administrador registrado.");
            return null;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return null;
    }
}

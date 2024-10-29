import { Plantilla, PlantillaListDB } from "@/models/types";
import { getDbInstance } from "./DatabaseSingleton";
import { generarID } from "@/utils/GenerarID";
//import { generarID } from "@/utils/GenerarID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()
const INSTRU_POR_PAGINA = 5

export async function getAllPlantillas() {
    try {
        const db = await getDb;
        const plantillas: PlantillaListDB[] = await db.select("SELECT * FROM Plantilla");
        if (plantillas.length > 0) {
            return plantillas;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return [];
    }
}


export async function getPlantilla(id:string){
    try {
        const db = await getDb;
        const plantilla = await db.select("SELECT * FROM Plantilla WHERE id= $1",[id]);
        if (plantilla) {
            return plantilla;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return null;
    }
}




export async function getPlantillasFiltPag(query: string, currentPage: number) {
    const offset = (currentPage - 1) * INSTRU_POR_PAGINA; // Define el offset
    const normalizedQuery = query.toLowerCase(); // Normaliza la consulta

    try {
        const db = await getDb;
        const sqlQuery = `
            SELECT * 
            FROM Plantilla
            WHERE 
                LOWER(nombre) LIKE "%${normalizedQuery}%" OR
                LOWER(descripcion) LIKE "%${normalizedQuery}%" OR
                LOWER(autor) LIKE "%${normalizedQuery}%" OR
                LOWER(adaptacionPor) LIKE "%${normalizedQuery}%"
            ORDER BY fechaModific ASC
            LIMIT $1 OFFSET $2
        `;

        // Ejecutar la consulta
        const resultados: PlantillaListDB[] = await db.select(sqlQuery,[INSTRU_POR_PAGINA, offset]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}


export async function paginasPlantilla(query: string) {
    const normalizedQuery = query.toLowerCase();

    try {
        const db = await getDb;
        const sqlQuery = `
        SELECT COUNT(*)
        FROM Plantilla
        WHERE
            LOWER(nombre) LIKE "%${normalizedQuery}%" OR
            LOWER(descripcion) LIKE "%${normalizedQuery}%" OR
            LOWER(autor) LIKE "%${normalizedQuery}%" OR
            LOWER(adaptacionPor) LIKE "%${normalizedQuery}%"
        `;

        // Ejecutar la consulta
        const count = await db.select(sqlQuery);
        const totalPag = Math.ceil(Number(count[0]['COUNT(*)']) / INSTRU_POR_PAGINA);
        return totalPag
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of plantillas.');
    }
}


export async function crearPlantilla(data: Plantilla): Promise<PlantillaListDB | null> {
    try {
        const db = await getDb;
        const nuevoID = generarID();
        const fechaCreacion = new Date().toISOString();

        const nuevaPlantilla: PlantillaListDB = {
            id: nuevoID,
            ...data, 
            fechaCreacion: fechaCreacion,
            fechaModific: fechaCreacion,
        };
        
        const registrado = await db.execute(
            "INSERT INTO Plantilla (id, nombre, descripcion, autor, adaptacionPor, fechaCreacion, fechaModific) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
                nuevaPlantilla.id,
                nuevaPlantilla.nombre,
                nuevaPlantilla.descripcion,
                nuevaPlantilla.autor,
                nuevaPlantilla.adaptacionPor,
                nuevaPlantilla.fechaCreacion,
                nuevaPlantilla.fechaModific
            ]
        );

        if (registrado) {
            return nuevaPlantilla;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error en registrar plantilla:", error);
        return null;
    }
}



export async function eliminarPlantilla(id: string) {

    try {
        const db = await getDb;
        const sqlQuery = `
        DELETE FROM Plantilla
        WHERE id = $1
    `;
        const resultado = await db.select(sqlQuery, [id]);
        return resultado
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of plantilla.');
    }
}




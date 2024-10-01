import Database from "tauri-plugin-sql-api";
import { join, appDataDir } from "@tauri-apps/api/path";
import { Admin } from "@/models/types";

// Ruta de la base de datos en el directorio de datos de la aplicación
const dbPath = await join(await appDataDir(), "db.sqlite");


export async function getAdmin() {
  
  // Carga la base de datos
  const db = await Database.load('sqlite:' + dbPath);

  console.log(dbPath)
  
  try {
    // Consulta para obtener el administrador
    const admin: Admin[] = await db.select("SELECT * FROM Administrador WHERE nombre = 'admin'");
    
    admin.length > 0 ? admin : null;
  
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    return null;
  }
}

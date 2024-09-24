import Database from "tauri-plugin-sql-api";
import { join, appDataDir } from "@tauri-apps/api/path";


export async function getAdmin() {
  // Recupera la ruta de la base de datos en el directorio de datos de la aplicación
  const dbPath = await join(await appDataDir(), "db.sqlite");
  
  // Carga la base de datos
  const db = await Database.load('sqlite:' + dbPath);
  

  console.log(dbPath)
  
  try {
    // Consulta para obtener el administrador
    const admin = await db.select("SELECT * FROM Administrador WHERE nombre = 'admin'");
    
    // Retorna el administrador si existe
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

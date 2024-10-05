import { getDbInstance } from "./DatabaseSingleton";
import { Admin, AdminRegistrado } from '../models/types';
import { generarID } from "@/utils/generateID";
import { hashPass, verificarContrasenia } from "@/utils/credenciales";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()


//Recuperar administrador
export async function getAdmin() {
    try {
        const db = await getDb;
        const admin: AdminRegistrado[] = await db.select("SELECT * FROM Administrador");
        if (admin.length > 0) {
            return admin[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return null;
    }
}

// Registrar administrador
export async function registrarAdmin(data: Admin): Promise<boolean> {
    try {
        const db = await getDb;
        const nuevoID = generarID();
        const contraseniaHashed = await hashPass(data.contrasenia);

        const nuevoAdmin: AdminRegistrado = {
            id: nuevoID,
            nombre: data.nombre,
            contrasenia: contraseniaHashed
        }
        const registrado = await db.execute(
            "INSERT into Administrador (id, nombre, contrasenia) VALUES (?, ?, ?)",
            [nuevoAdmin.id, nuevoAdmin.nombre, nuevoAdmin.contrasenia],
        );

        if (registrado) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error en registrarAdmin:", error);
        return false;
    }
}


//Verificar administrador
export async function verificarAdmin(data: Admin): Promise<AdminRegistrado | null> {
    const adminUnico = 1;
    try {
        const db = await getDb;
        const adminArray: AdminRegistrado[] = await db.select("SELECT * FROM Administrador");

        if (adminArray.length == adminUnico) {
            const admin = adminArray[0];
            
            //Comprueba el nombre
            if(admin.nombre === data.nombre){
                //Valida la contraseña
                const isContrasenia =  await verificarContrasenia(data.contrasenia,admin.contrasenia);

                if(isContrasenia){
                    return admin;
                }else{
                    return null;
                }
            }else{
                return null
            }
        } else {
            console.log("Administrador no registrado");
            return null;
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        return null;
    }
}
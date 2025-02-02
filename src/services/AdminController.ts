import { getDbInstance } from "./DatabaseSingleton";
import { Admin, AdminLogin, AdminRegistrado } from '../models/types';
import { generarID } from "@/utils/GenerarID";
import { hashPass, verificarContrasenia } from "@/utils/ProcesCredenciales";
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
            nombreComple: data.nombreComple,
            nombreUsuario: data.nombreUsuario,
            contrasenia: contraseniaHashed
        }
        const registrado = await db.execute(
            "INSERT into Administrador (id, nombreComple, nombreUsuario, contrasenia) VALUES ($1, $2, $3, $4)",
            [nuevoAdmin.id, nuevoAdmin.nombreComple, nuevoAdmin.nombreUsuario, nuevoAdmin.contrasenia],
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
export async function verificarAdmin(data: AdminLogin): Promise<AdminRegistrado | null> {
    const adminUnico = 1;
    try {
        const db = await getDb;
        const adminArray: AdminRegistrado[] = await db.select("SELECT * FROM Administrador");

        if (adminArray.length === adminUnico) {
            const admin = adminArray[0];
            
            //Comprueba el nombre
            if(admin.nombreUsuario === data.nombreUsuario){
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



export async function actualizarAdminNombres(nuevoUsuario: string, nuevoNomCom: string, id: string ) {
    try {
        const db = await getDb;

        const actualizado = await db.execute(
            "UPDATE Administrador SET nombreUsuario = $1, nombreComple = $2 WHERE id = $3",
            [nuevoUsuario,nuevoNomCom , id] 
        );

        return actualizado
    } catch (error) {
        console.error("Error al actualizar el administrador:", error);
    }
}



export async function actualizarContra(contra: string, id: string ) {
    try {
        const db = await getDb;
        const actualizado = await db.execute(
            "UPDATE Administrador SET contrasenia = $1 WHERE id = $2",
            [contra, id] 
        );
        return actualizado
    } catch (error) {
        console.error("Error al actualizar el administrador:", error);
    }
}
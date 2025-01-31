import { InterDatabase } from "@/models/interfaceModul";
import { Admin, AdminLogin, AdminRegistrado } from "@/models/types";
import { generarID } from "@/utils/GenerarID";
import { hashPass, verificarContrasenia } from "@/utils/ProcesCredenciales";

export class AdminRepository {
    private db: InterDatabase;

    constructor(db: InterDatabase) {
        this.db = db;
    }

    public async getAdmin(): Promise<AdminRegistrado | null> {
        const adminIdx = 0
        try {
            const admins: AdminRegistrado[] = await this.db.select("SELECT * FROM Administrador");
            return admins.length > 0 ? admins[adminIdx] : null;
        } catch (error) {
            console.error("Error al obtener administrador:", error);
            return null;
        }
    }


    public async registrarAdmin(data: Admin): Promise<boolean> {
        try {
            const nuevoID = generarID();
            const contraseniaHashed = await hashPass(data.contrasenia);

            const registrado = await this.db.execute(
                "INSERT INTO Administrador (id, nombreComple, nombreUsuario, contrasenia) VALUES ($1, $2, $3, $4)",
                [nuevoID, data.nombreComple, data.nombreUsuario, contraseniaHashed]
            );
            return registrado;
        } catch (error) {
            console.error("Error en registrarAdmin:", error);
            return false;
        }
    }


    public async verificarAdmin(data: AdminLogin): Promise<AdminRegistrado | null> {
        const adminRegistrado = 1;
        const adminIdx = 0;

        try {
            const admins: AdminRegistrado[] = await this.db.select("SELECT * FROM Administrador");

            if (admins.length !== adminRegistrado) return null;

            const admin = admins[adminIdx];
            if (admin.nombreUsuario === data.nombreUsuario) {
                const esValida = await verificarContrasenia(data.contrasenia, admin.contrasenia);
                return esValida ? admin : null;
            }
            return null;
        } catch (error) {
            console.error("Error al verificar administrador:", error);
            return null;
        }
    }




    public async actualizarAdminNombres(id: string, nuevoUsuario: string, nuevoNomCom: string): Promise<boolean> {
        try {
            const actualizado = await this.db.execute(
                "UPDATE Administrador SET nombreUsuario = $1, nombreComple = $2 WHERE id = $3",
                [nuevoUsuario, nuevoNomCom, id]
            );
            return actualizado;
        } catch (error) {
            console.error("Error al actualizar nombres del administrador:", error);
            return false;
        }
    }

    public async actualizarContra(id: string, nuevaContra: string): Promise<boolean> {
        try {
            const contraHash = await hashPass(nuevaContra);
            const actualizado = await this.db.execute(
                "UPDATE Administrador SET contrasenia = $1 WHERE id = $2",
                [contraHash, id]
            );
            return actualizado;
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            return false;
        }
    }
}

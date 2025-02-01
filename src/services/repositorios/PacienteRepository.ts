import { Count, InterDatabase } from "@/models/interfaceModul";
import { Paciente, PacienteActualizar, PacienteRegistrado } from "@/models/types";
import { generarID } from "@/utils/GenerarID";

const PACIENTES_POR_PAGINA = 10;

export class PacienteRepository {
    private db: InterDatabase;

    constructor(db: InterDatabase) {
        this.db = db;
    }

    public async getAllPacientesRegistrados(): Promise<PacienteRegistrado[]> {
        try {
            const pacientes: PacienteRegistrado[] = await this.db.select("SELECT * FROM Paciente");
            return pacientes.length > 0 ? pacientes : [];
        } catch (error) {
            console.error("Error al consultar la base de datos:", error);
            return [];
        }
    }

    public async getPaciente(id: string): Promise<PacienteRegistrado[]> {
        try {
            const paciente: PacienteRegistrado[] = await this.db.select("SELECT * FROM Paciente WHERE id = $1", [id]);
            return paciente
        } catch (error) {
            console.error("Error al consultar la base de datos:", error);
            return [];
        }
    }

    public async getPacienteReciente():Promise<PacienteRegistrado[]> {
        try {
            const sqlQuery = `
                    SELECT * 
                    FROM Paciente 
                    ORDER BY fechaRegistro ASC 
                    LIMIT 1;
            `;
            // Ejecutar la consulta
            const resultados:PacienteRegistrado[] = await this.db.select(sqlQuery);
            return resultados;
        } catch (error) {
            console.error('Database Error:', error);
            return [];
        }
    }


    public async registrarPaciente(data: Paciente): Promise<PacienteRegistrado | null> {
        try {
            const nuevoID = generarID();
            const horaRegistro = new Date();
            const fechaNacimientoISO = new Date(data.fechaNacimiento).toISOString();

            const nuevoPaciente: PacienteRegistrado = {
                id: nuevoID,
                ...data,
                fechaNacimiento: fechaNacimientoISO,
                fechaRegistro: horaRegistro.toISOString(),
            };

            const registrado = await this.db.execute(
                "INSERT INTO Paciente (id, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, fechaRegistro, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [
                    nuevoPaciente.id,
                    nuevoPaciente.primerNombre,
                    nuevoPaciente.segundoNombre || null,
                    nuevoPaciente.apellidoPaterno,
                    nuevoPaciente.apellidoMaterno || null,
                    nuevoPaciente.fechaNacimiento,
                    nuevoPaciente.fechaRegistro,
                    nuevoPaciente.sexo,
                ]
            );

            return registrado ? nuevoPaciente : null;
        } catch (error) {
            console.error("Error en registrar paciente:", error);
            return null;
        }
    }

    public async actualizarPaciente(data: PacienteActualizar): Promise<boolean> {
        try {
            const fechaNacimientoISO = new Date(data.fechaNacimiento).toISOString();

            const actualizado = await this.db.execute(
                "UPDATE Paciente SET primerNombre = $1, segundoNombre = $2, apellidoPaterno = $3, apellidoMaterno = $4, fechaNacimiento = $5, sexo = $6 WHERE id = $7",
                [
                    data.primerNombre,
                    data.segundoNombre || null,
                    data.apellidoPaterno,
                    data.apellidoMaterno || null,
                    fechaNacimientoISO,
                    data.sexo,
                    data.id,
                ]
            );

            return actualizado;
        } catch (error) {
            console.error("Error al actualizar paciente:", error);
            return false;
        }
    }

    public async getPacientesFiltradoPaginado(query: string, currentPage: number): Promise<PacienteRegistrado[]> {
        const offset = (currentPage - 1) * PACIENTES_POR_PAGINA;
        const normalizedQuery = query.toLowerCase();

        try {
            const sqlQuery = `
                SELECT * 
                FROM Paciente 
                WHERE 
                    LOWER(primerNombre) LIKE "%${normalizedQuery}%" OR
                    LOWER(segundoNombre) LIKE "%${normalizedQuery}%" OR
                    LOWER(apellidoPaterno) LIKE "%${normalizedQuery}%" OR
                    LOWER(apellidoMaterno) LIKE "%${normalizedQuery}%"
                ORDER BY fechaRegistro DESC
                LIMIT $1 OFFSET $2
            `;
            const resultados: PacienteRegistrado[] = await this.db.select(sqlQuery, [PACIENTES_POR_PAGINA, offset]);
            return resultados;
        } catch (error) {
            console.error("Database Error:", error);
            return [];
        }
    }

    public async paginasPacientes(query: string): Promise<number> {
        const normalizedQuery = query.toLowerCase();

        try {
            const sqlQuery = `
            SELECT COUNT(*)
            FROM Paciente
            WHERE
              lower(primerNombre) LIKE "%${normalizedQuery}%" OR
              lower(segundoNombre) LIKE "%${normalizedQuery}%" OR
              lower(apellidoPaterno) LIKE "%${normalizedQuery}%" OR
              lower(apellidoMaterno) LIKE "%${normalizedQuery}%"
          `;


            const count: Count[] = await this.db.select(sqlQuery);
            const totalPag = Math.ceil(Number(count[0]['COUNT(*)']) / PACIENTES_POR_PAGINA);
            return totalPag
        } catch (error) {
            console.error("Database Error:", error);
            throw new Error("Failed to fetch total number of pacientes.");
        }
    }

    public async eliminarPaciente(id: string): Promise<boolean> {
        try {
            const resultado = await this.db.execute("DELETE FROM Paciente WHERE id = $1", [id]);
            return resultado;
        } catch (error) {
            console.error("Database Error:", error);
            throw new Error("Fallo en borrar paciente.");
        }
    }
}

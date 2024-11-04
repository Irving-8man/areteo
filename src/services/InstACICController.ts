import CalcularResultadosTest from "@/utils/ProcesarRespuesta";
import { getDbInstance } from "./DatabaseSingleton";
import { generarID } from "@/utils/GenerarID";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crearRegiACIC(data: any) {
    const regACID = generarID();
    const aplicoAdmin = data.aplicadoPorAdmin;
    const fechaRegistro = new Date().toISOString();
    const respuestasDadas = data.respuestasPuntos
    const resultadosTest = CalcularResultadosTest(data.id, respuestasDadas)
    const nombreAplicador = aplicoAdmin ? "Administrador" : data.nombreEvaluador;

    try {
        const db = await getDb;
        const sqlQueryRegistro = `
            INSERT INTO RegistroEvalACIC (
                id,
                area_id,
                fechaEvaluacion,
                puntuacionTotal,
                promedio,
                aplicador,
                respondiente
            ) VALUES ($1, $2, $3, $4, $5, $6, $7);
        `

        const res = await db.execute(sqlQueryRegistro,
            [
                regACID,
                data.id,
                fechaRegistro,
                resultadosTest.total,
                resultadosTest.promedio,
                nombreAplicador,
                data.nombreEvaluado
            ]
        );

        if (!res) return null; //Si falla registrar

        // si no falla comencemos a guardar regsitros
        if (res) {
            for (const resDada of respuestasDadas) {
                const sqlQueryRes = `
                    INSERT INTO ResEvalACIC (
                        id,
                        registroEvalACIC_id,
                        orden,
                        puntuacion
                    ) VALUES ($1, $2, $3, $4);
                `;

                const resResp = await db.execute(sqlQueryRes, [
                    generarID(),
                    regACID,
                    resDada.orden,
                    resDada.respuesta
                ]);

                if (!resResp) {
                    await db.execute(`DELETE FROM RegistroEvalACIC WHERE id = $1`, [regACID]);
                    return null;
                }
            }
        }
        
        return { ...resultadosTest, registroId: regACID };
    } catch (error) {
        console.error('Database Error:', error);
        return null;
    }
}

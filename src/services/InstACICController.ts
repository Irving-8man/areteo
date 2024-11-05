import CalcularResultadosTest from "@/utils/ProcesarRespEvaluar";
import { getDbInstance } from "./DatabaseSingleton";
import { generarID } from "@/utils/GenerarID";
import { ResEvalACICList } from "@/models/typesFijo";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance();
const unico = 0;

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
                respondiente,
                evaluacionDicha
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `

        const res = await db.execute(sqlQueryRegistro,
            [
                regACID,
                data.id,
                fechaRegistro,
                resultadosTest.total,
                resultadosTest.promedio,
                nombreAplicador,
                data.nombreEvaluado,
                resultadosTest.evaluacion
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


export async function getRegistrosACIC(areaNum: number) {


    try {
        const db = await getDb;
        const sqlQuery = `
                SELECT 
                *
                FROM RegistroEvalACIC
                WHERE area_id = $1
                ORDER BY fechaEvaluacion ASC;
            `;
        // Ejecutar la consulta
        const resultados: ResEvalACICList[] = await db.select(sqlQuery, [areaNum]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return null;
    }

}


export async function getRegEvalACICComp(idRegistro: string) {

    try {
        const db = await getDb;
        const sqlQueryRegistro = `
            SELECT *
            FROM RegistroEvalACIC
            WHERE id = $1
        `;
        const registro = await db.select(sqlQueryRegistro, [idRegistro]);

        if (registro.length === 0) {
            return null;
        }

        const registroDatos = registro[unico];
        const sqlQueryRespuestas = `
            SELECT orden,puntuacion
            FROM ResEvalACIC
            WHERE registroEvalACIC_id = $1
        `;
        const respuestas = await db.select(sqlQueryRespuestas, [idRegistro]);

        return {
            registro: registroDatos,
            respuestas: respuestas
        };
    } catch (error) {
        console.error('Error al obtener el registro y las respuestas:', error);
        return null;
    }
}
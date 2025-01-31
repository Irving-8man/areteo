import { InterDatabase } from "@/models/interfaceModul";
import { generarID } from "@/utils/GenerarID";
import CalcularResultadosTest from "@/utils/ProcesarRespEvaluar";
import { RegistroEvalACIRegis, ResEvalACICList, RespuestasEvalACIC } from "@/models/typesFijo";


export class ACICRepository {

    private db: InterDatabase;

    constructor(db: InterDatabase) {
        this.db = db;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async crearRegiACIC(data: any) {
        const regACID = generarID();
        const fechaRegistro = new Date().toISOString();
        const respuestasDadas = data.respuestasPuntos
        const resultadosTest = CalcularResultadosTest(data.id, respuestasDadas)
        const nombreAplicador = data.nombreEvaluador;

        try {
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

            const res = await this.db.execute(sqlQueryRegistro,
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

                    const resResp = await this.db.execute(sqlQueryRes, [
                        generarID(),
                        regACID,
                        resDada.orden,
                        resDada.respuesta
                    ]);

                    if (!resResp) {
                        await this.db.execute(`DELETE FROM RegistroEvalACIC WHERE id = $1`, [regACID]);
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


    async getRegistrosACIC(areaNum: number) {
        try {
            const sqlQuery = `
                    SELECT 
                    *
                    FROM RegistroEvalACIC
                    WHERE area_id = $1
                    ORDER BY fechaEvaluacion DESC;
                `;
            // Ejecutar la consulta
            const resultados: ResEvalACICList[] = await this.db.select(sqlQuery, [areaNum]);
            return resultados;
        } catch (error) {
            console.error('Database Error:', error);
            return null;
        }

    }


    async getRegEvalACICComp(idRegistro: string) {
        const unico = 0;
        try {
            const sqlQueryRegistro = `
                SELECT *
                FROM RegistroEvalACIC
                WHERE id = $1
            `;
            const registro:RegistroEvalACIRegis[] = await this.db.select(sqlQueryRegistro, [idRegistro]);

            if (registro.length === 0) {
                return null;
            }

            const registroDatos = registro[unico];
            const sqlQueryRespuestas = `
                SELECT orden,puntuacion
                FROM ResEvalACIC
                WHERE registroEvalACIC_id = $1
            `;
            const respuestas: RespuestasEvalACIC[] = await this.db.select(sqlQueryRespuestas, [idRegistro]);

            return {
                registro: registroDatos,
                respuestas: respuestas
            };
        } catch (error) {
            console.error('Error al obtener el registro y las respuestas:', error);
            return null;
        }
    }



    async eliminarRegEvalACIC(id: string) {

        try {
            const sqlQuery = `
            DELETE FROM RegistroEvalACIC
            WHERE id = $1
        `;
            const resultado = await this.db.execute(sqlQuery, [id]);
            return resultado
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Fallo al eliminar registro de evalaución ACIC.');
        }
    }


    async eliminarRegEvalACICAREA(area_id: number) {

        try {

            const sqlQuery = `
            DELETE FROM RegistroEvalACIC
            WHERE area_id = $1
        `;
            const resultado = await this.db.execute(sqlQuery, [area_id]);
            return resultado
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Fallo al eliminar registro de evalaución ACIC del area.');
        }
    }


    //para excels//para excels
    async getRegEvalACICAREA(areas_id: number) {
        try {
            const sqlQueryRegistro = `
                SELECT 
                    *
                FROM RegistroEvalACIC
                WHERE area_id = $1
                ORDER BY fechaEvaluacion DESC;
            `;
            const registros: RegistroEvalACIRegis[] = await this.db.select(sqlQueryRegistro, [areas_id]);

            if (registros.length === 0) {
                return [];
            }

            // Para cada registro de evaluación, obtenemos sus respuestas y formateamos el objeto
            const registrosConPuntuaciones: RegistroEvalACIRegis[] = [];

            for (const registro of registros) {
                const sqlQueryRespuestas = `
                    SELECT *
                    FROM ResEvalACIC
                    WHERE registroEvalACIC_id = $1
                    ORDER BY orden ASC
                `;
                const respuestas: RespuestasEvalACIC[] = await this.db.select(sqlQueryRespuestas, [registro.id]);

                // Formateamos las respuestas como atributos de puntuaciones
                const listaPuntuaciones: Record<string, number> = {};
                respuestas.forEach((respuesta, index) => {
                    listaPuntuaciones[`respuesta${index + 1}`] = respuesta.puntuacion;
                });

                // Creamos el registro completo con las puntuaciones añadidas
                const registroFormateado = {
                    ...registro,
                    ...listaPuntuaciones,
                };

                registrosConPuntuaciones.push(registroFormateado);
            }

            return registrosConPuntuaciones;

        } catch (error) {
            console.error('Error al obtener el registros con sus respuestas', error);
            return [];
        }
    }
}
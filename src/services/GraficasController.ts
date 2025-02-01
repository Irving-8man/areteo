import { getDbInstance } from "./DatabaseSingleton";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance();
export async function getAreaDatos(area_id: number) {

    try {
        const db = await getDb;
        // Consulta para obtener todas las respuestas por área e instrumento
        const sqlQuery = `
            SELECT res.orden, res.puntuacion FROM RegistroEvalACIC r JOIN ResEvalACIC res ON r.id = res.registroEvalACIC_id
            WHERE r.area_id = $1
            ORDER BY res.orden;
        `;

        const resultados = await db.select(sqlQuery, [area_id]);
        if (resultados.length === 0) {
            return null;
        }
        const frecuenciaPorComponente: { [componente: number]: { [puntuacion: number]: number } } = {};

        // Recorrer los resultados y contar la frecuencia de puntuaciones
        resultados.forEach((row: { orden: number, puntuacion: number }) => {
            const { orden, puntuacion } = row;
            if (!frecuenciaPorComponente[orden]) {
                frecuenciaPorComponente[orden] = {};
                for (let i = 0; i <= 11; i++) {
                    frecuenciaPorComponente[orden][i] = 0;
                }
            }
            frecuenciaPorComponente[orden][puntuacion]++;
        });

        const datosPorComponente = Object.entries(frecuenciaPorComponente).map(([componente, frecuencias]) => {
            return {
                componente: Number(componente),
                datos: Object.entries(frecuencias).map(([punt, count]) => ({
                    punt,
                    frec: count
                }))
            };
        });

        console.log(datosPorComponente)
        return datosPorComponente
    } catch (error) {
        console.error('Error al obtener el registro y las respuestas:', error);
        return null;
    }
}


export async function RespuesTotalArea(area_id: number) {

    try {
        const db = await getDb;
        const sqlQuery = `
        SELECT COUNT(*)
        FROM RegistroEvalACIC
        WHERE area_id = $1
        `;

        // Ejecutar la consulta
        const count = await db.select(sqlQuery, [area_id]);
        const total = Number(count[0]['COUNT(*)']);
        return total
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Fallo al pedir el total de registro por area.');
    }
}
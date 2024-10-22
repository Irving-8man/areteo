import { getDbInstance } from "./DatabaseSingleton";
import { RegistroMedicoDB } from '../models/types';
import { generarID } from "@/utils/GenerarID";
//import { generarID } from "@/utils/GenerarID";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()


export async function getRegistrosPaciente(id: string) {

    try {
        const db = await getDb;
        const sqlQuery = `
            SELECT * 
            FROM RegistroMedico
            WHERE paciente_id = $1
            ORDER BY fechaDiagnostico ASC;
        `;

        // Ejecutar la consulta
        const resultados: RegistroMedicoDB[] = await db.select(sqlQuery, [id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crearRegistrosPaciente(data: any) {
    const idRegistro = generarID();
    const usadoInye = data.usaTratamientoInyectable === 1;
    const usadoOral = data.usaTratamientoOral === 1;

    try {
        const db = await getDb;
        const sqlQueryRegistro = `
            INSERT INTO RegistroMedico (
                id, 
                paciente_id, 
                fechaDiagnostico,
                sexo, 
                edad, 
                peso, 
                estatura, 
                presionArterialPAS_0min, 
                presionArterialPAD_0min, 
                presionArterialPAS_5min, 
                presionArterialPAD_5min,

                hba1c,
                anioDiagnostico,
                antecedFamiInfa,
                descripcionAntecedentes,
                hdl,
                tgc,
                educacion,
                detalleEducacion,
                estadoCivil
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,  $12, $13, $14, $15, $16, $17, $18, $19, $20);
        `;

        // Crear registro
        const res = await db.execute(sqlQueryRegistro, [
            idRegistro,
            data.paciente_id,
            data.fechaDiagnostico,
            data.sexo,
            data.edad,
            data.peso,
            data.estatura,
            data.presionArterialPAS_0min,
            data.presionArterialPAD_0min,
            data.presionArterialPAS_5min,
            data.presionArterialPAD_5min,

            data.hba1c,
            data.anioDiagnostico,
            data.antecedFamiInfa,
            data.descripcionAntecedentes || null,
            data.hdl,
            data.tgc,
            data.educacion,
            data.detalleEducacion,
            data.estadoCivil
        ]);

        //Validar resgistro medico agregado
        if (res) {
            return true;
        } else {
            return false;
        }


    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Fallo al guardar registro.');
    }
}


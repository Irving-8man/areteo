import { getDbInstance } from "./DatabaseSingleton";
import { RegistroMedicoList } from '../models/types';
import { generarID } from "@/utils/GenerarID";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDb: any = getDbInstance()

export async function getRegistrosPaciente(paciente_id: string) {

    try {
        const db = await getDb;
        const sqlQuery = `
            SELECT id,fechaDiagnostico,edadDicha,peso,antecedFamiInfa,usaTratamientoInyectable,usaTratamientoOral
            FROM RegistroMedico
            WHERE paciente_id = $1
            ORDER BY fechaDiagnostico DESC;
        `;
        // Ejecutar la consulta
        const resultados: RegistroMedicoList[] = await db.select(sqlQuery, [paciente_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function getRegistroMedicRecie(paciente_id:string) {
    try {
        const db = await getDb;
        const sqlQuery = `
                SELECT * 
                FROM RegistroMedico 
                WHERE paciente_id = $1 
                ORDER BY fechaDiagnostico ASC 
                LIMIT 1;
        `;
        // Ejecutar la consulta
        const resultados = await db.select(sqlQuery, [paciente_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}


export async function getRegistroMedico(registro_id:string) {
    try {
        const db = await getDb;
        const sqlQuery = `
                SELECT * 
                FROM RegistroMedico 
                WHERE id = $1 
            ;
        `;
        // Ejecutar la consulta
        const resultados = await db.select(sqlQuery, [registro_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}


export async function borrarRegistroMedico(registro_id:string) {
    try {
        const db = await getDb;
        const sqlQuery = `
                DELETE FROM RegistroMedico 
                WHERE id = $1
            ;
        `;
        // Ejecutar la consulta
        const resultados = await db.execute(sqlQuery, [registro_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Fallo en borrar registro médico.');
    }
}




export async function getTratamientoOral(registro_id:string) {
    try {
        const db = await getDb;
        const sqlQuery = `
                SELECT * 
                FROM TratamientoOral 
                WHERE registro_id = $1 
                LIMIT 1;
        `;
        // Ejecutar la consulta
        const resultados = await db.select(sqlQuery, [registro_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function getTratamientoInyectable(registro_id:string) {
    try {
        const db = await getDb;
        const sqlQuery = `
                SELECT * 
                FROM TratamientoInyectable
                WHERE registro_id = $1 
                LIMIT 1;
        `;
        // Ejecutar la consulta
        const resultados = await db.select(sqlQuery, [registro_id]);
        return resultados;
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}






// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crearRegistrosPaciente(data: any) {
    const registro_id = generarID();
    const usaInye = data.usaTratamientoInyectable === 1;
    const usaOral = data.usaTratamientoOral === 1;
    data.antecedFamiInfa == "No" ? data.descripcionAntecedentes = null : data.descripcionAntecedentes;
    data.educacion !== "Otro" ? data.detalleEducacion = null : data.detalleEducacion;

    try {
        const db = await getDb;
        const sqlQueryRegistro = `
            INSERT INTO RegistroMedico (
                id, 
                paciente_id, 
                fechaDiagnostico,
                sexo, 
                edad,
                edadDicha, 
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
                estadoCivil,
                usaTratamientoInyectable,
                usaTratamientoOral
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,  $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23);
        `;

        // Crear registro
        const res = await db.execute(sqlQueryRegistro, [
            registro_id,
            data.paciente_id,
            data.fechaDiagnostico,
            data.sexo,
            data.edad,
            data.edadDicha,
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
            data.detalleEducacion || null,
            data.estadoCivil,
            usaInye,
            usaOral
        ]);

        if (!res) return false; //Si falla registrar

        // Si el paciente usa tratamiento inyectable
        if (usaInye) {
            const sqlQueryInyectable = `
                INSERT INTO TratamientoInyectable (
                    id,
                    registro_id,
                    desdeCuandoIn,
                    dosisIn,
                    tipoNombreIn
                ) VALUES ($1, $2, $3, $4, $5);
            `;
            const resInyectable = await db.execute(sqlQueryInyectable, [
                generarID(),
                registro_id,
                data.desdeCuandoIn,
                data.dosisIn,
                data.tipoNombreIn
            ]);

            if (!resInyectable) {
                await db.execute(`DELETE FROM RegistroMedico WHERE id = $1`, [registro_id]);
                return false;
            }
        }

        // Si el paciente usa tratamiento oral
        if (usaOral) {
            const sqlQueryOral = `
                INSERT INTO TratamientoOral (
                    id,
                    registro_id,
                    desdeCuandoOr,
                    dosisOr,
                    nombreMedicamentoOr
                ) VALUES ($1, $2, $3, $4, $5);
            `;

            const resOral = await db.execute(sqlQueryOral, [
                generarID(),
                registro_id,
                data.desdeCuandoOr,
                data.dosisOr,
                data.nombreMedicamentoOr
            ]);

            if (!resOral) {
                await db.execute(`DELETE FROM RegistroMedico WHERE id = $1`, [registro_id]);
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Fallo al guardar registro.');
    }
}


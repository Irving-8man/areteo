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
    let resIn, resOr;

    try {
        const db = await getDb;
        const sqlQueryRegistro = `
            INSERT INTO RegistroMedico (
                id, 
                paciente_id, 
                fechaDiagnostico, 
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
                estadoCivil, 
                usaTratamientoInyectable, 
                usaTratamientoOral
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);
        `;

        // Crear registro
        const res = await db.execut(sqlQueryRegistro, [
            idRegistro,
            data.paciente_id,
            data.fechaDiagnostico,
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
            data.descripcionAntecedentes || null,  // Es opcional
            data.hdl,
            data.tgc,
            data.educacion,
            data.detalleEducacion || null,  // Es opcional
            data.estadoCivil,
            data.usaTratamientoInyectable,
            data.usaTratamientoOral]);

        //Validar resgistro medico agregado
        if (res) {

            //verificar inyectable
            if (data.usaTratamientoInyectable == 1) {
                const sqlTratInyectable = `
                    INSERT INTO TratamientoInyectable (
                        id,
                        registro_id,
                        desdeCuando,
                        dosis,
                        tipoNombre
                    ) VALUES ($1, $2, $3, $4, $5);
                `;

                // inyectable
                resIn = await db.execut(sqlTratInyectable, [generarID(), idRegistro, data.desdeCuandoIn, data.dosisIn, data.tipoNombreIn]);
            }

            // Si hay oral
            if (data.usaTratamientoOral) {
                const sqlTratOral = `
                    INSERT INTO TratamientoOral (
                        id,
                        registro_id,
                        desdeCuando,
                        dosis,
                        nombreMedicamento
                    ) VALUES ($1, $2, $3, $4, $5);
                `;

                await db.execut(sqlTratOral, [
                    generarID(),   
                    idRegistro,          
                    data.desdeCuandoOr,
                    data.dosisOr,
                    data.nombreMedicamentoOr
                ]);
            }

            if (resIn && resOr && res) {
                return true
            }else{
                return false;
            }
        } else {
            return false;
        }


    } catch (error) {
        console.error('Database Error:', error);
        return false;
    }
}


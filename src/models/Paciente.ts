import { Resultado } from "./Instrumento/Resultado";
import { Tratamiento } from "./Tratamiento";

export interface Paciente{
    id: string;
    fechaRegistro: Date;
    edad: number;
    sexo: string;
    peso: number;
    estatura: number;
    hba1c: number;
    fechaDiagnostico: Date;
    hdl: number;
    tgc: number;
    educacion: string;
    estadoCivil: string;
    presionArterial: string;
    tratamientos: Tratamiento[];
    resultadosInstrumentos: Resultado[];
}
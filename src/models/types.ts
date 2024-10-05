export interface Admin {
    nombre:string;
    contrasenia:string;
}

export interface AdminRegistrado extends Admin{
    id:string;
}


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
}


export interface Tratamiento{
    id: string;
    pacienteId: number;
    tipo: number;
    fechaInicio: Date;
    dosis: string;
    nombre: string;
}
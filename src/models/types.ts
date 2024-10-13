//Administrador
export interface Admin {
    nombre:string;
    contrasenia:string;
}

export interface AdminRegistrado extends Admin{
    id:string;
}


//Paciente
export interface Paciente{
    primerNombre: string;
    segundoNombre?: string;  // Opcional
    apellidoPaterno: string;
    apellidoMaterno?: string; // Opcional
    fechaNacimiento:string;
}


export interface PacienteRegistrado extends Paciente{
    id: string;
    fechaRegistro:string;
}








export interface RegistroMedico{
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
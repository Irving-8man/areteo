//Administrador
export interface Admin {
    nombreComple:string;
    nombreUsuario:string;
    contrasenia: string;
}

export interface AdminRegistrado extends Admin {
    id: string;
}

//Admin login
export interface AdminLogin {
    nombreUsuario:string;
    contrasenia: string;
}


//Paciente
export interface Paciente {
    primerNombre: string;
    segundoNombre?: string | null;  // Opcional
    apellidoPaterno: string;
    apellidoMaterno?: string | null; // Opcional
    fechaNacimiento: string;
    sexo: string;
}

export interface PacienteRegistrado extends Paciente {
    id: string;
    fechaRegistro: string;
}

export interface PacienteActualizar extends Paciente{
    id: string;
}


//Registro medico
export interface RegistroMedico {
    paciente_id: string;
    fechaDiagnostico: string;  // ISO string (YYYY-MM-DD)
    sexo:string;
    edad: number;
    peso: number;
    estatura: number;
    presionArterialPAS_0min: number;  // Presión sistólica a 0 minutos
    presionArterialPAD_0min: number;  // Presión diastólica a 0 minutos
    presionArterialPAS_5min: number;  // Presión sistólica a 5 minutos
    presionArterialPAD_5min: number;  // Presión diastólica a 5 minutos
    hba1c: number;
    anioDiagnostico: string;
    antecedFamiInfa: string;
    descripcionAntecedentes?: string | null;  // Puede ser null si no se proporcionan detalles
    hdl: number;
    tgc: number;
    educacion: string;
    detalleEducacion?: string | null;  // Puede ser null
    estadoCivil: string;
    usaTratamientoInyectable: string;
    usaTratamientoOral: string;
}

export interface RegistroMedicoDB extends RegistroMedico {
    id: string;
    edadDicha:string;
}


//Para mostrar en el listado por pacientes
export interface RegistroMedicoList{
    id: string;
    fechaDiagnostico: string;
    edadDicha:string;
    peso: number;
    antecedFamiInfa: string;
    usaTratamientoInyectable: string;
    usaTratamientoOral: string;
}



export interface TratamientoInyectable{
    desdeCuandoIn: string;
    dosisIn: string;
    tipoNombreIn: string;
}


export interface TratamientoOral {
    desdeCuandoOr: string;
    dosisOr: string;
    nombreMedicamentoOr: string;
}

export interface TratamientoInyectableDB extends TratamientoInyectable{
    id: string;
    registro_id: string;
}

export interface TratamientoOralDB extends TratamientoOral{
    id: string;
    registro_id: string;
}


//Registro medico completo




export interface FormRegistro extends RegistroMedico,TratamientoInyectable,TratamientoOral{

}



//Plantillas
export interface Plantilla {
    nombre:string;
    descripcion:string;
    autor:string;
    adaptacionPor:string;
}

export interface PlantillaListDB extends Plantilla{
    id:string;
    fechaCreacion:string;
    fechaModific:string;
}
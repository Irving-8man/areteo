export interface AreaFija {
    id: number;
    nombre: string;
    numQ: number;
}

export interface InfoArea {
    id: number;
    nombre: string;
    descripcion: string;
}


//Evaluaciones
export interface RegistroEvalACIC {
    area_id: number;
    fechaEvaluacion: string
    puntuacionTotal: number;
    promedio: number;
    aplicador: string;
    respondiente: string;
    evaluacionDicha: string;
}

export interface RegistroEvalACIRegis extends RegistroEvalACIC {
    id: string;
}

//procesar excels
//area 1
export interface RegistroEvalACIC_Area1 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
    respuesta4: number;
    respuesta5: number;
    respuesta6: number;
}

//area 2
export interface RegistroEvalACIC_Area2 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
}


export interface RegistroEvalACIC_Area3 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
    respuesta4: number;
}

export interface RegistroEvalACIC_Area4 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
    respuesta4: number;
}

export interface RegistroEvalACIC_Area5 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
    respuesta4: number;
    respuesta5: number;
    respuesta6: number;
}

export interface RegistroEvalACIC_Area6 extends RegistroEvalACIC {
    respuesta1: number;
    respuesta2: number;
    respuesta3: number;
    respuesta4: number;
    respuesta5: number;
}









export interface ResEvalACICList extends RegistroEvalACIRegis {

}


//para el word
export interface respuestaACIC {
    orden: number;
    puntuacion: number,
    componente: string; // Añadiendo el componente aquí
    nivel: string;
    descripcion: string;
}

//respuestas de evaluacion
export interface RespuestasEvalACIC{
    id:string;
    registroEvalACIC_id: string;
    orden:number;
    puntuacion:number;
}



//pregunta atomica con el rango
export interface QUnidaArea {
    nivel: string;
    texto: string;
    rango: [number, number, number];
}

//Esta pregunta atomica tiene su orden y componente pregunta
export interface QUniOrden {
    orden: number;
    componente: string;
    quetUni: QUnidaArea[]
}

//Esta es la area con las quest con el numero de preguntas
export interface QuestArea {
    desc: string;
    num: number;
    quests: QUniOrden[];
    msgResult: [string, string]
}




//Graficas
export interface AreaFija{
    id: number;
    nombre:string;
}

export interface InfoArea{
    id: number;
    nombre:string;
    descripcion:string;
}




//pregunta atomica con el rango
export interface QUnidaArea{
    nivel:string;
    texto: string; 
    rango: [number,number,number];
}

//Esta pregunta atomica tiene su orden y componente pregunta
export interface QUniOrden{
    orden: number;
    componente:string;
    quetUni: QUnidaArea[]
}

//Esta es la area con las quest con el numero de preguntas
export interface QuestArea {
    desc:string;
    num: number;
    quests: QUniOrden[];
    msgResult:[string,string]
}
import { QuestArea, QUnidaArea } from "@/models/typesFijo";

//Respuesta area 2
export const Q1Area2: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay ó no están organizados sistemáticamente.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...está limitada a una lista de recursos comunitarios en una forma que es accesible.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...es realizada a través de una persona que es responsable de asegurarse que los equipos de salud y las personas con diabetes usen al máximo los recursos comunitarios.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...es realizada a través de la coordinación activa entre el sistema de salud, los organismos de servicio comunitarios y las personas con diabetes.", rango: [9, 10, 11] }
];


export const Q2Area2: QUnidaArea[] = [
    { nivel: "D", texto: "...no existen.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...están todavía considerándose pero no están implementadas.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...se forma para desarrollar programas y políticas de apoyo.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se buscan activamente para desarrollar programas y políticas de apoyo para todo el sistema.", rango: [9, 10, 11] }
];

export const Q3Area2: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay coordinación de guías/normas clínicas ni planes de salud, las medidas ni los recursos para la atención a la diabetes en la práctica médica.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...considera en algún grado la coordinación de guías/normas clínicas, medidas estandarizadas, o los recursos para el cuidado en la práctica médica, pero todavía no se han ejecutado los planes.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...coordina el uso de guías/normas médicas, las medidas o los recursos para el cuidado en la práctica médica en una o dos enfermedades crónicas concomitantes con la diabetes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...coordina el uso de guías/normas médicas, las medidas estandarizadas ó recursos en la práctica medica para la mayoría de las enfermedades crónicas.", rango: [9, 10, 11] }
];



//estas son las ques area
export const QuestArea2:QuestArea = {
    desc:"Cooperación entre el sistema de salud y organismos comunitarios (o prestadores de servicios) y recursos comunitarios que desempeñan un papel importante en el manejo de la diabetes.",
    num: 3,
    quests: [
        {
            orden: 1,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q1Area2
        }, {
            orden: 2,
            componente:"Cooperación/coordinación con organismos comunitarios tales como La Asociación de Diabetes, casas farmacéuticas, organizaciones religiosas, etc.",
            quetUni: Q2Area2
        }, {
            orden: 3,
            componente:"Planes Regionales y/o Locales de Salud",
            quetUni: Q3Area2
        }
    ],
    msgResult:["Puntuación total de la cooperación comunitaria"," Puntuación Promedio (puntuación de la cooperación comunitaria /"]
}
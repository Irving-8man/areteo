import { QuestArea, QUnidaArea } from "@/models/typesFijo";

//Area 3
export const Q1Area3: QUnidaArea[] = [
    { nivel: "D", texto: "...no se han hecho.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se espera hacerlas.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...son completadas estandarizadamente.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se evalúan y documentan regularmente en forma estandarizada relacionadas a un plan de tratamiento disponible para el equipo de salud y para las personas con diabetes.", rango: [9, 10, 11] }
];

export const Q2Area3: QUnidaArea[] = [
    { nivel: "D", texto: "...es limitado a la distribución de información (folletos, trifoliares).", rango: [0, 1, 2] },
    { nivel: "C", texto: "...está disponible a través de referencia a clases de auto cuidado o a educadores especialistas en diabetes.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...lo proporcionan educadores clínicos entrenados y que están designados para apoyar el auto cuidado, coordinados con clínicas que ven a los pacientes referidos.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se ofrece a través de educadores clínicos, entrenados en apoyar pacientes con enfermedades crónicas y enseñarles técnicas para resolver problemas.", rango: [9, 10, 11] }
];


export const Q3Area3: QUnidaArea[] = [
    { nivel: "D", texto: "...no es hecho sistemáticamente.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se proporciona a pacientes y familiares a través de referencias médicas.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...es promulgado a través de grupos de apoyo, o apoyo individual y programas para educadores.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...es una parte integral de la atención de la diabetes que incluye la evaluación sistemática y rutinaria incluyendo grupos de apoyo, apoyo individual, y/o programas de consejera.", rango: [9, 10, 11] }
];


export const Q4Area3: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay o no están disponibles.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...están limitados a la distribución de folletos, plegables, trifoliares y otros tipos de nota escrita.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...están disponibles solamente a través de referencias de centros especializados.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...están disponibles y forman una parte integral de la atención de la diabetes.", rango: [9, 10, 11] }
];


//estas son las ques area
export const QuestArea3:QuestArea = {
    num: 4,
    quests: [
        {
            orden: 1,
            componente: "Evaluación y documentación de las necesidades y actividades del auto cuidado de la diabetes",
            quetUni: Q1Area3
        }, {
            orden: 2,
            componente: "Apoyo al auto cuidado de la diabetes",
            quetUni: Q2Area3
        }, {
            orden: 3,
            componente: "Apoyar las inquietudes de los pacientes y familiares",
            quetUni: Q3Area3
        }, {
            orden: 4,
            componente: "Cambios del comportamiento y apoyo de grupo",
            quetUni: Q4Area3
        },
    ]
}
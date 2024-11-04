import { QuestArea, QUnidaArea } from "@/models/typesFijo";


//Respuestas area 1
export const Q1Area1: QUnidaArea[] = [
    { nivel: "D", texto: "...no existe o hay poco interés.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...están reflejados en la visión del sistema de salud y en los planes de la organización, pero no hay recursos disponibles.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...están reflejados en la dirección de alto nivel y hay fondos y recursos humanos dedicados para la iniciativa.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...forma parte de la estrategia a largo plazo, recibe recursos necesarios, y hay recursos humanos específicos que son responsables de la iniciativa.", rango: [9, 10, 11] }
];

export const Q2Area1: QUnidaArea[]  = [
    { nivel: "D", texto: "...no existen o son limitadas.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...existen pero no son revisadas regularmente.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...existen y son revisadas regularmente.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...son cuantificables, se revisan sistemáticamente y están incorporadas en los planes para el mejoramiento.", rango: [9, 10, 11] }
];


export const Q3Area1: QUnidaArea[]  = [
    { nivel: "D", texto: "...son informales y no están organizadas; no tienen un apoyo permanente.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...utilizan enfoques informales para resolver problemas que surjan.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...utilizan estrategias de mejoramiento para resolver los problemas imprevistos.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...incluye estrategias previamente validadas que se utilizan activamente para alcanzar las metas institucionales.", rango: [9, 10, 11] }
];


export const Q4Area1: QUnidaArea[]  = [
    { nivel: "D", texto: "...no se usan para influir en las metas de mejoramiento clínico.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se usan para influir en la utilización y costos del cuidado de la diabetes.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...se usan para apoyar las metas de los pacientes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se usan para motivar y facultar a los trabajadores de la salud para que apoyen las metas de la atención de la diabetes.", rango: [9, 10, 11] }
];


export const Q5Area1: QUnidaArea[]  = [
    { nivel: "D", texto: "...no promueven la atención de la diabetes.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...no le dan prioridad a la atención de la diabetes.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...promueven los esfuerzos para mejorar el cuidado de la diabetes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...abiertamente participan en los esfuerzos de mejoramiento de la atención de la diabetes.", rango: [9, 10, 11] }
];


export const Q6Area1: QUnidaArea[]  = [
    { nivel: "D", texto: "...no promueven el auto cuidado del paciente o los cambios del sistema de salud.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...ni promueven ni NO promueven el auto cuidado del paciente o los cambios del sistema de salud.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...promueven el auto cuidado del paciente o los cambios del sistema de salud.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...hay asignación específica para la promoción y cuidado de la diabetes.", rango: [9, 10, 11] }
];


//estas son las ques area
export const QuestArea1:QuestArea = {
    num: 6,
    quests: [
        {
            orden: 1,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q1Area1
        }, {
            orden: 2,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q2Area1
        }, {
            orden: 3,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q3Area1
        }, {
            orden: 4,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q4Area1
        }, {
            orden: 5,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q5Area1
        }, {
            orden: 6,
            componente: "Disponibilidad de recursos comunitarios para las personas con diabetes",
            quetUni: Q6Area1
        }
    ]
}